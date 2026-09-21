# Tarjetas de medallas con efecto flip

## 1. Qué hace este efecto

Las tarjetas del catálogo de puertos tienen un efecto visual de giro para mostrar más información sin saturar la vista inicial.

La cara frontal conserva la identidad básica del puerto:

- nombre
- nivel
- distancia
- desnivel
- chapa o imagen identificativa

La cara trasera puede mostrar detalle extra del logro, como el estado del puerto o más contextos de la ascensión.

## 2. Estructura de la tarjeta

La tarjeta se genera con una estructura básica como esta:

```html
<article class="puerto" tabindex="0" role="button" aria-pressed="false">
    <div class="puertoCard">
        <div class="puertoCara puertoFrontal">
            ...
        </div>

        <div class="puertoCara puertoTrasera" aria-hidden="true">
            ...
        </div>
    </div>
</article>
```

Tiene dos partes esenciales:

- `puertoCard`: el bloque que rota en 3D
- `puertoCara`: cada una de las caras visible y oculta

## 3. Cómo se activa

La clase `is-flipped` es la que activa el giro. Cuando una tarjeta recibe esta clase, el CSS rota el bloque interior:

```css
.puerto.is-flipped .puertoCard {
    transform: rotateY(180deg);
}
```

La lógica del JavaScript añade o elimina esa clase al hacer clic o al pulsar Enter/Espacio.

## 4. Por qué funciona bien esta solución

Porque separa claramente:

- la interacción del usuario
- el bloque que gira
- la información que se muestra en cada cara

Eso hace que el efecto sea más controlable y más fácil de mantener.

## 5. Importancia de la accesibilidad

El efecto no solo es visual: también tiene soporte accesible.

Se usan atributos como:

- `aria-pressed`
- `aria-hidden`
- `tabindex="0"`
- `role="button"`

Esto permite que la tarjeta se comporte como un control interactivo y que el estado visual se refleje correctamente para tecnologías de asistencia.

## 6. Qué aporta al producto

La flipped card ayuda a:

- ahorrar espacio visual
- mostrar más detalle sin saturar la vista
- dar sensación de riqueza y experiencia premium
- reforzar la identidad de “colección” del producto

## 7. Resumen

La tarjeta con efecto flip es una pieza central del diseño de SUMMIT. No solo funciona como un objeto visual, sino como un mecanismo de interacción que apoya tanto la UX como la identidad del producto.

### Ejemplo de un puerto con datos completos

Un elemento de `data/puertosPV.json` podría quedar así:

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

En ese caso, la cara trasera mostraría:

- Conseguido: `12/06/2026`
- Tiempo: `01:04:32`
- Distancia: `14.9 km`
- Desnivel: `891 m`

Mientras esos campos no estén en el JSON, la interfaz muestra `Sin registrar` en su lugar.

---

## 8. Funcionamiento del clic

Después de crear todas las tarjetas, `renderParches` busca los elementos `.puerto` y añade un evento a cada uno.

La función central es:

```javascript
const alternarGiro = () => {
    const girada = tarjeta.classList.toggle("is-flipped");
    tarjeta.setAttribute("aria-pressed", String(girada));
    tarjeta.querySelector(".puertoTrasero")
        .setAttribute("aria-hidden", String(!girada));
};
```

### Paso a paso

1. `classList.toggle("is-flipped")` añade la clase si no existe o la elimina si ya existe.
2. El resultado se guarda en `girada`.
3. `aria-pressed` se actualiza a `true` cuando la tarjeta está girada.
4. `aria-pressed` vuelve a `false` al regresar a la cara frontal.
5. `aria-hidden` de la cara trasera se actualiza para indicar si está visible o no.

El CSS es el que convierte ese cambio de clase en una animación visual.

---

## 9. Funcionamiento con teclado

Además del clic, cada tarjeta puede activarse con el teclado:

```javascript
tarjeta.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        alternarGiro();
    }
});
```

Las teclas admitidas son:

- `Enter`.
- Barra espaciadora.

`event.preventDefault()` evita que la barra espaciadora desplace toda la página cuando se usa para girar la tarjeta.

La combinación de `tabindex="0"`, `role="button"` y los eventos de teclado permite que el componente sea utilizable sin ratón.

---

## 10. Efecto 3D en CSS

El efecto se construye con cuatro propiedades principales.

### Perspectiva

```css
.puerto {
    perspective: 1000px;
}
```

La perspectiva define cómo se percibe la profundidad durante el giro.

### Conservación del espacio 3D

```css
.puertoCard {
    transform-style: preserve-3d;
}
```

Permite que las dos caras mantengan su posición tridimensional.

### Rotación

```css
.puerto.is-flipped .puertoCard {
    transform: rotateY(180deg);
}
```

Gira el contenedor interior sobre su eje vertical.

### Ocultación de la cara posterior

```css
.puertoCara {
    backface-visibility: hidden;
}
```

Evita que el contenido se lea al revés durante la rotación o cuando está detrás.

La animación dura `500ms`:

```css
transition: transform 500ms ease, box-shadow 180ms ease;
```

---

## 11. Diseño de la cara trasera

La cara trasera utiliza el verde oscuro principal de SUMMIT:

```css
background: var(--color-forest);
color: var(--color-snow);
```

La información se organiza en una cuadrícula de dos columnas:

```css
.puertoDetalle {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
```

De esta forma los cuatro datos se distribuyen en dos filas:

```text
Conseguido       Tiempo
Distancia        Desnivel
```

Las etiquetas se muestran en un tamaño más pequeño y los valores utilizan la fuente monoespaciada configurada en el proyecto para que los tiempos sean fáciles de comparar visualmente.

---

## 12. Bordes por nivel

Antes el borde de nivel se aplicaba directamente a `.puerto`.

Como ahora el contenedor exterior se utiliza para la perspectiva y la rotación, el borde visible debe estar en las caras reales de la tarjeta.

Por eso las reglas ahora apuntan a `.puertoCara`:

```css
.puerto[data-nivel="1"] .puertoCara {
    border-top: 4px solid var(--level-1);
}
```

Se aplica el mismo patrón a los niveles 2, 3 y 4.

Así el color de dificultad sigue siendo visible tanto en la cara frontal como en la trasera.

---

## 13. Estado de foco

Cuando una tarjeta se selecciona con el teclado, aparece un contorno ocre:

```css
.puerto:focus-visible {
    outline: 3px solid var(--color-ochre);
    outline-offset: 4px;
    border-radius: 28px;
}
```

`focus-visible` hace que el contorno se muestre especialmente cuando la navegación se realiza con teclado, sin añadir ruido visual innecesario al clic normal.

---

## 14. Compatibilidad con los filtros

Los filtros por nivel no se han cambiado.

Cuando se pulsa uno de los botones de nivel:

1. Se filtra `todosLosPuertos`.
2. Se vuelve a llamar a `renderParches`.
3. Se destruyen las tarjetas antiguas.
4. Se crean las tarjetas del nuevo resultado.
5. A cada tarjeta nueva se le vuelven a asociar sus eventos de clic y teclado.

Por eso el giro también funciona después de filtrar por cualquier nivel.

---

## 15. Validaciones realizadas

Se han realizado estas comprobaciones:

### Sintaxis de JavaScript

Se ejecutó:

```bash
node --check src/app.js
```

Resultado: el archivo tiene una sintaxis válida.

### Diagnósticos del editor

Se revisaron:

- `src/app.js`
- `src/styles.css`

Resultado: no se encontraron errores.

### Formato del diff

Se ejecutó:

```bash
git diff --check
```

Resultado: no se encontraron espacios problemáticos ni errores básicos de formato.

---

## 16. Resumen final

El cambio convierte las tarjetas de medallas en componentes interactivos con dos estados:

```text
Cara frontal -> clic o teclado -> cara trasera
Cara trasera -> clic o teclado -> cara frontal
```

La implementación mantiene el diseño existente, reutiliza las variables de color y tipografía del proyecto, conserva los filtros por nivel y deja preparada la interfaz para mostrar fechas y tiempos reales cuando esos datos se añadan al JSON.
