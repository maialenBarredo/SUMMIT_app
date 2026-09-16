# Apuntes de JavaScript

## 1. Objetivo del código

JavaScript se encarga de convertir los datos de los puertos en tarjetas visuales y de controlar su interacción.

Las tareas principales son:

- Cargar los puertos desde `data/puertosPV.json`.
- Utilizar datos de respaldo si el archivo no se puede cargar.
- Crear el HTML de cada tarjeta.
- Preparar la información de la cara frontal.
- Preparar la información de la cara trasera.
- Activar el giro con clic.
- Activar el giro con teclado.
- Mantener el estado accesible de la tarjeta.
- Filtrar las tarjetas por nivel.

---

## 2. Datos de respaldo

El archivo comienza con una lista llamada `puertoFallback`.

```javascript
const puertoFallback = [
    {
        nombre: "Monte Oiz (desde Iurreta)",
        nivel: 1,
        km: 14.9,
        m_desnivel: 891,
        logo: "monte-oiz"
    }
];
```

Estos datos se utilizan si falla la petición al archivo JSON.

El respaldo evita que la sección de medallas quede completamente vacía si:

- El archivo no existe.
- Hay un error de red.
- La página se abre en un contexto que impide realizar `fetch`.
- El JSON tiene un problema de formato.

---

## 3. Lista global de puertos

```javascript
let todosLosPuertos = [];
```

Esta variable guarda todos los puertos cargados.

Se necesita conservar la lista completa porque los filtros trabajan sobre ella.

Si se guardara únicamente el resultado filtrado, al cambiar de nivel se podrían perder los elementos que ya no están visibles.

---

## 4. Selección del logo

La función `getPuertoLogo(nombre)` intenta encontrar una imagen conocida a partir del nombre del puerto.

```javascript
function getPuertoLogo(nombre) {
    const texto = nombre.toLowerCase();

    if (texto.includes("oiz")) return "monte-oiz";
    if (texto.includes("urkiola")) return "urkiola";
    return "puerto-bloqueado";
}
```

### Funcionamiento

1. Convierte el nombre a minúsculas.
2. Comprueba si contiene `oiz`.
3. Comprueba si contiene `urkiola`.
4. Si no coincide con ningún caso, devuelve `puerto-bloqueado`.

La tarjeta puede proporcionar su propio logo mediante `puerto.logo`. Si no lo hace, se utiliza esta función.

---

## 5. Entrada de `renderParches`

La función que genera las tarjetas es:

```javascript
function renderParches(data) {
    const contenedor = document.getElementById("parchesContainer");

    if (!contenedor) return;

    ...
}
```

Recibe `data`, que es una lista de puertos.

Primero busca el contenedor de la página. Si no existe, termina la función para evitar un error de JavaScript.

---

## 6. Valores de cada puerto

Dentro de `data.map`, se preparan los datos que utilizará la plantilla HTML:

```javascript
const nombre = puerto.nombre || "Puerto";
const nivel = puerto.nivel || 1;
const km = puerto.km || 0;
const desnivel = puerto.m_desnivel || 0;
const logo = puerto.logo || getPuertoLogo(nombre);
```

Cada expresión tiene un valor alternativo:

- Si no existe `nombre`, se muestra `Puerto`.
- Si no existe `nivel`, se utiliza el nivel `1`.
- Si no existe `km`, se utiliza `0`.
- Si no existe `m_desnivel`, se utiliza `0`.
- Si no existe `logo`, se busca uno por el nombre.

Esto permite que una tarjeta se pueda generar aunque falte algún dato secundario.

---

## 7. Fecha y tiempo

Los nuevos campos se preparan así:

```javascript
const fecha = puerto.fecha_conseguido || puerto.fecha || "Sin registrar";
const tiempo = puerto.tiempo || puerto.tiempo_subida || "Sin registrar";
```

El código admite dos nombres para cada dato.

### Fecha

Primero busca:

```javascript
puerto.fecha_conseguido
```

Si no existe, busca:

```javascript
puerto.fecha
```

Si no existe ninguno, muestra:

```text
Sin registrar
```

### Tiempo

Primero busca:

```javascript
puerto.tiempo
```

Si no existe, busca:

```javascript
puerto.tiempo_subida
```

Si no existe ninguno, muestra:

```text
Sin registrar
```

La interfaz está preparada aunque el JSON actual todavía no incluya esos campos.

---

## 8. Plantilla HTML creada desde JavaScript

Cada objeto se transforma en un bloque de texto mediante una plantilla con backticks:

```javascript
return `
    <article class="puerto" data-nivel="${nivel}" tabindex="0"
        role="button" aria-pressed="false"
        aria-label="Ver información de ${nombre}">
        ...
    </article>
`;
```

Las expresiones `${...}` insertan datos reales dentro del HTML.

Por ejemplo:

```javascript
${nombre}
```

se reemplaza por:

```text
Monte Oiz (desde Iurreta)
```

---

## 9. Creación de las dos caras

La plantilla genera dos bloques principales:

```html
<div class="puertoCara puertoFrontal">
    ...
</div>

<div class="puertoCara puertoTrasero" aria-hidden="true">
    ...
</div>
```

La cara frontal incluye el logo y los datos básicos.

La cara trasera incluye:

- El nombre del puerto.
- La fecha.
- El tiempo.
- La distancia.
- El desnivel.
- Una indicación para volver a la cara frontal.

---

## 10. Pintar todas las tarjetas

Después de transformar todos los puertos, el resultado se inserta en el contenedor:

```javascript
contenedor.innerHTML = data.map((puerto) => {
    ...
}).join("");
```

### `map`

Recorre cada puerto y genera una tarjeta.

### `join("")`

Une todos los fragmentos HTML en una única cadena sin separadores.

### `innerHTML`

Reemplaza el contenido del contenedor por las tarjetas recién generadas.

Esto ocurre tanto al cargar la página como al cambiar el filtro de nivel.

---

## 11. Buscar las tarjetas recién creadas

Después de pintar el HTML, JavaScript busca todas las tarjetas:

```javascript
contenedor.querySelectorAll(".puerto").forEach((tarjeta) => {
    ...
});
```

Es importante hacerlo después de asignar `innerHTML` porque antes de ese momento las tarjetas todavía no existen en el DOM.

Cada nueva tarjeta recibe sus propios eventos.

---

## 12. Función para alternar el giro

Dentro del bucle se define:

```javascript
const alternarGiro = () => {
    const girada = tarjeta.classList.toggle("is-flipped");
    tarjeta.setAttribute("aria-pressed", String(girada));
    tarjeta.querySelector(".puertoTrasero")
        .setAttribute("aria-hidden", String(!girada));
};
```

Esta función centraliza todo lo que debe ocurrir al cambiar de cara.

### Añadir o quitar la clase

```javascript
tarjeta.classList.toggle("is-flipped");
```

Si la clase no existe, se añade.

Si ya existe, se elimina.

El CSS detecta esta clase y aplica la rotación.

### Guardar el estado

```javascript
const girada = ...;
```

`girada` será `true` cuando la clase se haya añadido y `false` cuando se haya eliminado.

### Actualizar `aria-pressed`

```javascript
tarjeta.setAttribute("aria-pressed", String(girada));
```

Los atributos HTML reciben texto, por eso se convierte el booleano a cadena.

### Actualizar `aria-hidden`

```javascript
.setAttribute("aria-hidden", String(!girada));
```

La cara trasera está oculta cuando la tarjeta no está girada y visible cuando sí lo está.

---

## 13. Evento de clic

El clic se conecta así:

```javascript
tarjeta.addEventListener("click", alternarGiro);
```

Cuando el usuario hace clic sobre una tarjeta, se ejecuta `alternarGiro`.

No hace falta duplicar la lógica porque la misma función también será utilizada por los eventos de teclado.

---

## 14. Evento de teclado

La tarjeta también responde a `Enter` y a la barra espaciadora:

```javascript
tarjeta.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        alternarGiro();
    }
});
```

### `event.key`

Indica qué tecla se ha pulsado.

### `event.preventDefault()`

Evita que la barra espaciadora desplace la página.

### `alternarGiro()`

Reutiliza exactamente la misma acción del clic.

Así se garantiza que ambos métodos se comporten igual.

---

## 15. Por qué se utiliza `tabindex="0"`

Un `article` no es un control interactivo por defecto.

Al añadir `tabindex="0"`:

1. La tarjeta entra en el orden normal de navegación.
2. El usuario puede llegar a ella pulsando `Tab`.
3. Cuando tiene el foco, puede activarla con el teclado.

Esto evita que la interacción dependa exclusivamente del ratón.

---

## 16. Filtrado por nivel

La función `filtrarParches(nivel)` sigue utilizando la lista completa:

```javascript
function filtrarParches(nivel) {
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
