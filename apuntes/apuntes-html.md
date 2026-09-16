# Apuntes de HTML

## 1. Punto donde aparecen las tarjetas

Las tarjetas de las medallas se muestran dentro de `src/index.html`, en el contenedor:

```html
<div class="parches" id="parchesContainer" aria-live="polite"></div>
```

Este elemento empieza vacío porque las tarjetas se crean dinámicamente desde JavaScript cuando se cargan los datos de los puertos.

### `class="parches"`

La clase `parches` se utiliza en CSS para organizar las tarjetas mediante una cuadrícula.

### `id="parchesContainer"`

El identificador permite que JavaScript encuentre el contenedor usando:

```javascript
document.getElementById("parchesContainer");
```

### `aria-live="polite"`

Indica a las tecnologías de asistencia que el contenido del contenedor puede cambiar, pero que el cambio no es urgente.

Es útil porque las tarjetas se vuelven a dibujar cuando el usuario filtra por nivel.

---

## 2. Elemento principal de cada tarjeta

JavaScript crea cada medalla con un elemento `article`:

```html
<article
    class="puerto"
    data-nivel="1"
    tabindex="0"
    role="button"
    aria-pressed="false"
    aria-label="Ver información de Monte Oiz (desde Iurreta)">
</article>
```

### `article`

`article` representa una unidad de contenido independiente. En este caso, cada tarjeta contiene la información completa de un puerto.

### `class="puerto"`

La clase conecta la tarjeta con los estilos CSS y permite que JavaScript encuentre todas las tarjetas.

### `data-nivel="1"`

Es un atributo de datos personalizado. Guarda el nivel del puerto dentro del HTML.

Se utiliza para aplicar el borde de color correspondiente:

```css
.puerto[data-nivel="1"] .puertoCara {
    border-top: 4px solid var(--level-1);
}
```

También permite mantener la relación visual entre la tarjeta y los filtros de nivel.

### `tabindex="0"`

Hace que la tarjeta pueda recibir el foco al navegar con la tecla `Tab`.

Sin este atributo, un `article` normal no suele ser seleccionable mediante teclado.

### `role="button"`

Explica a los lectores de pantalla que la tarjeta se comporta como un control interactivo.

La tarjeta no es un botón HTML nativo porque contiene una estructura visual compleja con dos caras, pero este atributo comunica su función.

### `aria-pressed="false"`

Indica el estado de la tarjeta:

- `false`: la tarjeta muestra la cara frontal.
- `true`: la tarjeta está girada y muestra la cara trasera.

JavaScript modifica este atributo cada vez que se activa el giro.

### `aria-label`

Proporciona una descripción clara para lectores de pantalla. El usuario puede saber qué ocurrirá antes de activar la tarjeta.

---

## 3. Contenedor interior de la tarjeta

Dentro de cada `article` se crea:

```html
<div class="puertoCard">
    ...
</div>
```

Este contenedor es importante porque es el elemento que rota visualmente con CSS.

El elemento exterior recibe la interacción y el elemento interior realiza la transformación 3D.

Separar estas responsabilidades evita que el giro afecte a la forma de recibir eventos o al foco del teclado.

---

## 4. Las dos caras

La tarjeta contiene dos `div` con la clase común `puertoCara`:

```html
<div class="puertoCara puertoFrontal">
    ...
</div>

<div class="puertoCara puertoTrasero" aria-hidden="true">
    ...
</div>
```

### Cara frontal

```html
<div class="puertoCara puertoFrontal">
    <div class="puertoLogoWrap">
        <img
            src="../images/chapas/monte-oiz.png"
            alt="Monte Oiz (desde Iurreta)"
            class="chapa">
    </div>

    <div class="puertoInfo">
        <h3>Monte Oiz (desde Iurreta)</h3>
        <p class="nivelBadge">Nivel 1</p>
        <p>14.9 km · 891 m</p>
    </div>
</div>
```

La cara frontal conserva la información principal que se veía antes de añadir el giro.

Incluye:

- La imagen de la chapa.
- El texto alternativo de la imagen.
- El nombre del puerto.
- El nivel.
- La distancia.
- El desnivel.

### Cara trasera

```html
<div class="puertoCara puertoTrasero" aria-hidden="true">
    <span class="puertoBackKicker">Puerto conquistado</span>
    <h3>Monte Oiz (desde Iurreta)</h3>

    <dl class="puertoDetalle">
        <div>
            <dt>Conseguido</dt>
            <dd>12/06/2026</dd>
        </div>
        <div>
            <dt>Tiempo</dt>
            <dd>01:04:32</dd>
        </div>
        <div>
            <dt>Distancia</dt>
            <dd>14.9 km</dd>
        </div>
        <div>
            <dt>Desnivel</dt>
            <dd>891 m</dd>
        </div>
    </dl>

    <span class="puertoBackHint">Clica para volver</span>
</div>
```

La cara trasera añade información más detallada de la subida conseguida.

---

## 5. Por qué se utiliza `dl`, `dt` y `dd`

La información trasera es una lista de datos con etiquetas. Por eso se utiliza:

```html
<dl>
    <dt>Tiempo</dt>
    <dd>01:04:32</dd>
</dl>
```

Cada etiqueta tiene un significado concreto:

- `dl`: lista de detalles.
- `dt`: término o nombre del dato.
- `dd`: descripción o valor del dato.

Esta estructura es más expresiva que usar varios párrafos sin relación semántica.

---

## 6. Accesibilidad de la cara trasera

La cara trasera empieza con:

```html
aria-hidden="true"
```

Esto significa que inicialmente está oculta para tecnologías de asistencia porque la tarjeta empieza mostrando la cara frontal.

Cuando la tarjeta gira, JavaScript cambia el valor a:

```html
aria-hidden="false"
```

Así se mantiene sincronizado el contenido visual con la información que recibe el lector de pantalla.

---

## 7. Imagen y texto alternativo

La imagen se genera así:

```html
<img
    src="../images/chapas/${logo}.png"
    alt="${nombre}"
    class="chapa">
```

El atributo `alt` utiliza el nombre del puerto para que la imagen no sea inaccesible si el usuario no puede verla.

La clase `chapa` se encarga exclusivamente de su presentación visual mediante CSS.

---

## 8. Relación entre HTML y JavaScript

El HTML proporciona un contenedor vacío:

```html
<div id="parchesContainer"></div>
```

JavaScript lo rellena con tarjetas cuando termina de cargar `data/puertosPV.json`.

El flujo es:

```text
HTML crea el contenedor
        ↓
JavaScript obtiene los datos
        ↓
JavaScript genera el HTML de las tarjetas
        ↓
CSS aplica la cuadrícula y el efecto visual
```

---

## 9. Resumen HTML

Los cambios principales de HTML son:

- Mantener el contenedor dinámico de tarjetas.
- Añadir una estructura con dos caras.
- Usar un contenedor interior que puede rotar.
- Añadir atributos de accesibilidad.
- Representar los detalles con `dl`, `dt` y `dd`.
- Mantener textos alternativos en las imágenes.
- Usar `data-nivel` para conservar el estilo por dificultad.
