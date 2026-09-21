# Apuntes de JavaScript

## 1. Objetivo del código actual

El JavaScript del proyecto actual se encarga de dos tareas principales:

- cargar la información desde `data/puertosPV.json`
- renderizar el contenido dinámico en la interfaz

Además, también controla:

- la interacción del menú hamburguesa
- el efecto de giro de las tarjetas
- el comportamiento de los filtros por nivel

## 2. Carga de datos

La pantalla de puertos usa `fetch` para obtener la lista de puertos:

```javascript
async function cargarPuertos() {
    const respuesta = await fetch("../../data/puertosPV.json");
    if (!respuesta.ok) {
        throw new Error("No se pudo cargar la lista de puertos");
    }

    todosLosPuertos = await respuesta.json();
    renderPuertos(todosLosPuertos);
}
```

Esto permite que el contenido sea dinámico y que no esté fijo en el HTML. Cuando la carga funciona, el valor `todosLosPuertos` se usa para renderizar la galería.

## 3. Renderizado de puertos

La función `renderPuertos` toma los datos y los inserta en el DOM:

```javascript
function renderPuertos(data) {
    const contenedor = document.getElementById("puertosContainer");
    if (!contenedor) return;

    contenedor.innerHTML = data.map((puerto) => {
        const nombre = puerto.nombre || "Puerto sin nombre";
        const nivel = puerto.nivel || 1;
        const logo = puerto.logo || getPuertoLogo(nombre);

        return `
            <article class="puerto-item">
                <div class="puerto-item-image">
                    <img src="../../images/chapas/${logo}.png" alt="Chapa de ${nombre}">
                </div>
                <div class="puerto-item-content">
                    <span class="puerto-item-level">Nivel ${nivel}</span>
                    <h2>${nombre}</h2>
                    <dl class="puerto-item-details">
                        <div>
                            <dt>Distancia</dt>
                            <dd>${puerto.km || 0} km</dd>
                        </div>
                        <div>
                            <dt>Desnivel</dt>
                            <dd>${puerto.m_desnivel || 0} m</dd>
                        </div>
                    </dl>
                </div>
            </article>
        `;
    }).join("");
}
```

La clave aquí es que se genera el HTML desde datos y no está escrito a mano en el archivo HTML.

## 4. Logo por defecto

Cuando un puerto no llega con un `logo` concreto, el código intenta deducirlo a partir del nombre:

```javascript
function getPuertoLogo(nombre) {
    const texto = nombre.toLowerCase();

    if (texto.includes("oiz")) return "monte-oiz";
    if (texto.includes("urkiola")) return "urkiola";
    if (texto.includes("zaldiaran")) return "zaldiaran";
    return "puerto-bloqueado";
}
```

Esto evita que la galería quede rotando con imágenes faltantes.

## 5. Menú hamburguesa

La hamburguesa está conectada a la sidebar con lógica simple y eficaz:

```javascript
const menuButton = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

if (menuButton && sidebar) {
    const aplicarEstadoMenu = (abierto) => {
        document.body.classList.toggle("sidebar-collapsed", !abierto);
        menuButton.setAttribute("aria-expanded", String(abierto));
        sidebar.setAttribute("aria-hidden", String(!abierto));
    };

    menuButton.addEventListener("click", () => {
        const abierto = menuButton.getAttribute("aria-expanded") === "true";
        aplicarEstadoMenu(!abierto);
    });
}
```

La lógica usa el atributo `aria-expanded` para mantener el estado accesible y mostrar si el menú está abierto o cerrado.

## 6. Interacción de flip en la pantalla de inicio

La página de inicio también tiene tarjetas de parches con efecto de volteo. La lógica hace lo siguiente:

- busca todas las `.puerto`
- añade eventos de clic y teclado
- alterna la clase `is-flipped`
- actualiza `aria-pressed`

```javascript
const alternarGiro = () => {
    const girada = tarjeta.classList.toggle("is-flipped");
    tarjeta.setAttribute("aria-pressed", String(girada));
};
```

Esto permite que la experiencia sea usable tanto con ratón como con teclado.

## 7. Filtros por nivel

El flujo de filtro se basa en conservar la lista completa de puertos y luego mostrar solo los que coinciden con el nivel seleccionado:

```javascript
function filtrarParches(nivel) {
    const lista = nivel === "todos"
        ? todosLosPuertos
        : todosLosPuertos.filter((puerto) => Number(puerto.nivel) === Number(nivel));

    renderParches(lista);
}
```

Esto hace que la lógica sea más clara, porque la colección completa siempre está disponible y solo se reducen los elementos visibles.

## 8. Resumen

El JavaScript actual es compacto y está bien dividido en responsabilidades:

- carga de datos
- renderizado
- generación de logos por defecto
- gestión del menú
- interacción visual de tarjetas
- filtros por nivel

Eso permite que la app pueda crecer sin perder claridad ni organización.
    if (!todosLosPuertos.length) return;

    const lista = nivel === "todos"
        ? todosLosPuertos
        : todosLosPuertos.filter(
            (puerto) => Number(puerto.nivel) === Number(nivel)
        );

    renderParches(lista);
}
```

Cuando cambia el filtro:

1. Se crea una lista nueva.
2. Se llama otra vez a `renderParches`.
3. Se reemplaza el contenido del contenedor.
4. Se crean eventos nuevos para las nuevas tarjetas.

Por eso el efecto flip funciona correctamente tanto en `Todos` como en cada nivel.

---

## 17. Activar el botón seleccionado

La función `activarBotonNivel` añade o quita la clase visual del filtro activo.

Esto no forma parte directamente del giro, pero sí del flujo completo de la colección.

El estado visual del filtro y el contenido de las tarjetas se actualizan juntos:

```javascript
activarBotonNivel(nivel);
filtrarParches(nivel);
```

---

## 18. Carga de datos

La función `cargarPuertos` intenta cargar el JSON:

```javascript
async function cargarPuertos() {
    try {
        const respuesta = await fetch("../data/puertosPV.json");
        const data = await respuesta.json();
        todosLosPuertos = data;
        bindFiltros();
        filtrarParches("todos");
    } catch (error) {
        todosLosPuertos = puertoFallback;
        bindFiltros();
        filtrarParches("todos");
    }
}
```

### Bloque `try`

Intenta:

- Solicitar el archivo JSON.
- Convertir la respuesta a datos JavaScript.
- Guardar los datos.
- Activar los filtros.
- Mostrar todos los puertos.

### Bloque `catch`

Si algo falla:

- Utiliza `puertoFallback`.
- Activa los filtros igualmente.
- Renderiza las tarjetas de respaldo.

---

## 19. Inicio de la aplicación

Al final del archivo se ejecuta:

```javascript
cargarPuertos();
```

Esto inicia el flujo cuando se carga `app.js`.

El recorrido completo es:

```text
cargarPuertos()
      ↓
fetch del JSON
      ↓
todosLosPuertos
      ↓
filtrarParches("todos")
      ↓
renderParches(lista)
      ↓
creación del HTML
      ↓
asignación de eventos
```

---

## 20. Ejemplo de datos completos

El JSON puede incluir estos campos:

```json
{
    "nombre": "Monte Oiz (desde Iurreta)",
    "nivel": 1,
    "km": 14.9,
    "m_desnivel": 891,
    "fecha_conseguido": "12/06/2026",
    "tiempo": "01:04:32"
}
```

JavaScript utilizará los datos así:

```javascript
const fecha = puerto.fecha_conseguido;
const tiempo = puerto.tiempo;
```

Y los insertará en la cara trasera de la tarjeta.

---

## 21. Comprobación de sintaxis

Se validó el archivo con:

```bash
node --check src/app.js
```

Este comando analiza la sintaxis sin ejecutar la aplicación.

El resultado fue correcto, por lo que no hay errores de sintaxis en el JavaScript editado.

También se comprobaron los diagnósticos del editor y no se encontraron errores en `src/app.js`.

---

## 22. Resumen JavaScript

Las partes principales añadidas son:

- Lectura de fecha y tiempo con valores alternativos.
- Generación de una cara frontal y una cara trasera.
- Función común `alternarGiro`.
- Evento `click`.
- Evento `keydown`.
- Soporte para `Enter` y barra espaciadora.
- Actualización de `aria-pressed`.
- Actualización de `aria-hidden`.
- Reasignación de eventos después de cada filtro.
- Compatibilidad con los datos de respaldo.
- Preparación para añadir fechas y tiempos reales al JSON.
