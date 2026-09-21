# Apuntes de CSS

## 1. Objetivo general

El CSS de SUMMIT está pensado para crear una interfaz clara, de alto contraste y visualmente orientada a la colección de puertos.

Los estilos actuales combinan:

- cabecera fija con marca y perfil
- sidebar de navegación
- layout principal con contenido flexible
- galería responsiva de tarjetas
- identidades visuales por nivel de dificultad
- botones interactivos y efectos de hover/focus

## 2. Sistema de variables

El proyecto basa gran parte de su identidad en variables CSS definidas en `:root`:

```css
:root {
    --color-forest: #172A27;
    --color-mountain: #647A68;
    --color-terracotta: #C97852;
    --color-ochre: #C6A15B;
    --color-snow: #FAFAF7;
    --text-primary: #18201F;
    --background: #F3F1EA;
    --surface: #FAFAF7;
    --border: #D5D5CC;
}
```

Estas variables son útiles porque centralizan la paleta visual y permiten modificar la identidad del producto sin tocar cada regla individual.

## 3. Layout base

El cuerpo principal y el header se construyen con flexbox:

```css
header {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0 2.25rem;
    background-color: var(--color-forest);
}
```

Esto permite:

- alinear los elementos en una fila
- mantener una distribución sencilla y limpia
- separar visualmente marca, título y accesos

La estructura es muy útil para crear una cabecera moderna y estable.

## 4. Sidebar

La barra lateral se define con un ancho fijo y un fondo oscuro:

```css
.sidebar {
    width: 190px;
    background-color: var(--color-forest);
    color: var(--text-light);
    padding: 22px 16px;
}
```

Sus enlaces usan `display: flex` y `flex-direction: column` para producir una estructura vertical clara.

Los estados `:hover` y `:focus-visible` añaden feedback visual sin sobrecargar la interfaz.

## 5. Menú hamburguesa

El botón de hamburguesa usa tres líneas horizontales y se convierte en un control real del menú:

```css
.menu-toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.24rem;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid rgba(250, 250, 247, 0.28);
    border-radius: 10px;
    background: transparent;
}
```

Esto permite que el botón se integre sin romper la identidad del header y sin necesitar un icono externo.

## 6. Galería de puertos

La colección se organiza con CSS Grid:

```css
.puertos-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
}
```

Esto hace que el contenido se adapte automáticamente y evita que una cuarta columna empuje el layout fuera de su contenedor.

Las media queries ajustan la grilla por ancho de pantalla:

```css
@media (max-width: 1200px) {
    .puertos-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 820px) {
    .puertos-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 520px) {
    .puertos-grid {
        grid-template-columns: 1fr;
    }
}
```

Esto evita los desbordamientos al pasar por pantallas tablet y móvil.

## 7. Tarjetas con efecto flip

La tarjeta de cada puerto está pensada como una estructura con dos caras:

```css
.puerto {
    perspective: 1000px;
}

.puertoCard {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 500ms ease;
}
```

La cara visible y la cara posterior se superponen, y la cara trasera se rota 180º:

```css
.puertoTrasero {
    transform: rotateY(180deg);
    background: var(--color-forest);
    color: var(--color-snow);
}
```

La clase `.is-flipped` activa el cambio de cara:

```css
.puerto.is-flipped .puertoCard {
    transform: rotateY(180deg);
}
```

## 8. Colores por nivel

Cada nivel usa un valor cromático distinto:

```css
.puerto[data-nivel="1"] .puertoCara {
    border-top: 4px solid var(--level-1);
}

.puerto[data-nivel="2"] .puertoCara {
    border-top: 4px solid var(--level-2);
}
```

Esto hace que la dificultad sea reconocible de un vistazo, aunque la tarjeta esté en cualquier parte del catálogo.

## 9. Responsive y accesibilidad

El CSS ha incorporado varios ajustes para mejorar la experiencia en pantallas pequeñas y para usuarios de teclado:

- `focus-visible` para resaltar elementos al navegar con teclado
- `outline-offset` para no tapar el contenido
- `transition` para suavizar cambios visuales
- media queries para recortar columnas y mantener el flujo visual

## 10. Resumen

El CSS del proyecto actual no es solo decoración: define la estructura de navegación, la legibilidad del contenido, la jerarquía visual y el comportamiento de interacción. Gracias a la combinación de flexbox, grid, variables y media queries, la interfaz se mantiene ordenada y muy adaptable.
