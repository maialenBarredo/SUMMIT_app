# Apuntes de CSS

## 1. Objetivo de los estilos

Los estilos nuevos convierten una tarjeta plana en una tarjeta con dos caras que puede girar sobre su eje vertical.

La estructura visual utiliza tres niveles:

```text
.puerto       -> controla perspectiva, foco e interacción visual
    .puertoCard   -> rota en 3D
        .puertoCara -> contiene cada cara
```

Esta separación hace que el contenedor que gira no tenga que encargarse directamente del foco ni de los eventos.

---

## 2. Perspectiva 3D

El contenedor exterior define la profundidad:

```css
.puerto {
    perspective: 1000px;
}
```

`perspective` controla cómo se ve la distancia entre el observador y el objeto 3D.

Un valor más pequeño produce una deformación más marcada. Un valor más grande hace que el giro parezca más plano.

En este caso, `1000px` crea un giro visible pero suave.

---

## 3. Tamaño estable de la tarjeta

La tarjeta mantiene una altura mínima:

```css
.puerto {
    min-height: 260px;
    width: 100%;
}

.puertoCard {
    width: 100%;
    min-height: 260px;
}
```

Las dos caras comparten el mismo espacio. Esto evita que la cuadrícula cambie de tamaño al girar la tarjeta.

También evita saltos visuales cuando la cara trasera tiene una distribución de contenido diferente.

---

## 4. Conservación del espacio 3D

El contenedor interior utiliza:

```css
.puertoCard {
    transform-style: preserve-3d;
}
```

Esta propiedad permite que los elementos hijos conserven su posición tridimensional.

Sin ella, las dos caras podrían comportarse como elementos planos y el efecto de giro no sería correcto.

---

## 5. Colocación de las dos caras

Cada cara ocupa exactamente la misma posición:

```css
.puertoCara {
    position: absolute;
    inset: 0;
}
```

`inset: 0` equivale a establecer:

```css
top: 0;
right: 0;
bottom: 0;
left: 0;
```

Como las caras se superponen, solo una debe ser visible desde el frente.

---

## 6. Ocultar la cara posterior

Las caras utilizan:

```css
backface-visibility: hidden;
```

Cuando una cara gira y queda orientada hacia atrás, esta propiedad evita que el contenido se vea invertido o duplicado.

Es especialmente importante porque la cara trasera ya está rotada inicialmente:

```css
.puertoTrasero {
    transform: rotateY(180deg);
}
```

La cara frontal empieza en `0deg` y la trasera empieza en `180deg`. Cuando el contenedor gira, ambas quedan orientadas correctamente.

---

## 7. Activar el giro

La clase que activa el estado girado es:

```css
.puerto.is-flipped .puertoCard {
    transform: rotateY(180deg);
}
```

JavaScript añade o elimina `is-flipped` según el estado de la tarjeta.

El CSS no necesita saber si el evento vino de un clic, de `Enter` o de la barra espaciadora. Solo responde a la presencia de la clase.

---

## 8. Animación

El movimiento se anima con:

```css
.puertoCard {
    transition: transform 500ms ease, box-shadow 180ms ease;
}
```

Hay dos transiciones diferentes:

- `transform 500ms ease`: hace que el giro dure medio segundo y tenga una aceleración suave.
- `box-shadow 180ms ease`: suaviza la sombra cuando la tarjeta sube al pasar el ratón o recibe el foco.

---

## 9. Diseño de la cara frontal

La cara frontal mantiene el fondo claro original:

```css
.puertoFrontal {
    background: linear-gradient(
        180deg,
        rgba(250, 250, 247, 0.86),
        rgba(236, 239, 234, 0.9)
    );
}
```

La cara conserva:

- El fondo claro.
- La imagen de la chapa.
- La sombra exterior.
- Los bordes redondeados.
- El espacio de la información inferior.

---

## 10. Diseño de la cara trasera

La cara trasera utiliza el color oscuro principal:

```css
.puertoTrasero {
    justify-content: center;
    gap: 0.55rem;
    padding: 1.5rem;
    background: var(--color-forest);
    color: var(--color-snow);
    transform: rotateY(180deg);
    text-align: center;
}
```

### `justify-content: center`

Centra la información verticalmente.

### `gap`

Separa el título, la lista de datos y la indicación para volver.

### `background` y `color`

Utiliza las variables globales del proyecto para mantener el mismo lenguaje visual.

### `text-align`

Centra los datos porque la tarjeta tiene un formato compacto.

---

## 11. Información del reverso

La lista de datos se organiza en dos columnas:

```css
.puertoDetalle {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem 1rem;
    width: 100%;
}
```

`repeat(2, 1fr)` crea dos columnas iguales.

La primera medida de `gap` separa filas y la segunda separa columnas:

```css
gap: 0.7rem 1rem;
```

El resultado visual es:

```text
Conseguido       Tiempo
Distancia        Desnivel
```

---

## 12. Presentación de las etiquetas y valores

Cada bloque de detalle se organiza verticalmente:

```css
.puertoDetalle div {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}
```

Las etiquetas son más discretas:

```css
.puertoDetalle dt {
    color: rgba(250, 250, 247, 0.62);
    font-size: 0.62rem;
    text-transform: uppercase;
}
```

Los valores destacan mediante la fuente monoespaciada:

```css
.puertoDetalle dd {
    margin: 0;
    color: var(--color-snow);
    font-family: var(--font-mono);
    font-size: 0.75rem;
}
```

La fuente monoespaciada ayuda especialmente con los tiempos porque los caracteres tienen un ancho más uniforme.

---

## 13. Bordes según el nivel

Cada nivel tiene un color diferente. El borde se aplica a ambas caras:

```css
.puerto[data-nivel="1"] .puertoCara {
    border-top: 4px solid var(--level-1);
}

.puerto[data-nivel="2"] .puertoCara {
    border-top: 4px solid var(--level-2);
}

.puerto[data-nivel="3"] .puertoCara {
    border-top: 4px solid var(--level-3);
}

.puerto[data-nivel="4"] .puertoCara {
    border-top: 4px solid var(--level-4);
}
```

Se aplica a `.puertoCara` y no al contenedor exterior porque el contenedor exterior ya no pinta directamente el fondo de la tarjeta.

---

## 14. Efecto al pasar el ratón

Cuando el usuario pasa el ratón sobre la tarjeta, el contenedor interior sube ligeramente:

```css
.puerto:hover .puertoCard,
.puerto:focus-visible .puertoCard {
    transform: translateY(-4px);
    box-shadow: 0 24px 40px rgba(23, 42, 39, 0.12);
}
```

El movimiento crea una sensación de elemento seleccionable.

La sombra se hace más amplia para reforzar la separación respecto al fondo.

---

## 15. Estado de foco

Para usuarios que navegan con teclado se añade un contorno:

```css
.puerto:focus-visible {
    outline: 3px solid var(--color-ochre);
    outline-offset: 4px;
    border-radius: 28px;
}
```

### `focus-visible`

Muestra el estilo de foco cuando el navegador considera que es necesario, especialmente durante la navegación con teclado.

### `outline-offset`

Separa el contorno del borde para que sea visible sin tapar el diseño de la tarjeta.

---

## 16. Relación entre el giro y el hover

La tarjeta puede encontrarse en dos situaciones al mismo tiempo:

- El usuario puede tener el ratón encima.
- La tarjeta puede estar girada.

La regla de giro mantiene la transformación principal:

```css
.puerto.is-flipped .puertoCard {
    transform: rotateY(180deg);
}
```

El objetivo es que el hover no destruya el estado girado. El giro debe seguir siendo el estado dominante cuando la tarjeta ya está volteada.

---

## 17. Variables reutilizadas

El diseño reutiliza variables definidas en `:root`:

```css
--color-forest: #172A27;
--color-snow: #FAFAF7;
--color-ochre: #C6A15B;
--font-mono: "IBM Plex Mono", "Courier New", monospace;
```

Usar variables evita repetir valores y mantiene la tarjeta integrada con el resto de la aplicación.

---

## 18. Resumen CSS

Las partes principales añadidas o adaptadas son:

- `perspective` para crear profundidad.
- `transform-style: preserve-3d` para conservar las caras en 3D.
- `rotateY(180deg)` para girar la tarjeta.
- `backface-visibility` para ocultar la cara posterior.
- `position: absolute` e `inset` para superponer las caras.
- `grid` para organizar los detalles.
- Transiciones para suavizar el movimiento.
- `focus-visible` para accesibilidad con teclado.
- Bordes por nivel aplicados a las dos caras.
- Variables globales para conservar los colores y tipografías de SUMMIT.
