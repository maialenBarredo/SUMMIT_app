# Apuntes de HTML

## 1. Estructura actual de la web

La aplicación web de SUMMIT está dividida en varias páginas HTML dentro de `src/`:

- `src/inicio/index.html`
- `src/puertos/puertos.html`
- `src/retos/retos.html`

Cada una mantiene una estructura base común:

- `header`
- `main`
- `aside.sidebar`
- `section.main-content`
- `footer`

## 2. Header y navegación

El header contiene los elementos principales de identidad y acceso:

```html
<header>
    <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
    </button>

    <div class="titulo_header">
        <h1>SUMMIT</h1>
    </div>

    <div class="miPerfil_header">
        <i class="fa-solid fa-circle-user"></i>
        <p>Mi Perfil</p>
    </div>
</header>
```

El botón de hamburguesa ha sido añadido para controlar la sidebar en pantallas pequeñas o como interacción alternativa del menú.

## 3. Sidebar

La navegación lateral se define como un bloque aparte:

```html
<aside class="sidebar">
    <div class="logo">
        <img class="logo_sidebar" src="../../images/logo/summit_logo3.png">
    </div>

    <div class="links">
        <a href="#">Inicio</a>
        <a href="../puertos/puertos.html">Puertos</a>
        <a href="#">Retos</a>
    </div>
</aside>
```

La ventaja es que la navegación queda separada del contenido principal, lo que facilita su reutilización visual y funcional en cada página.

## 4. Contenedor principal

Dentro de `main`, cada vista coloca su contenido concreto:

```html
<section class="main-content">
    <div class="banner">
        <h1>Cada puerto, una historia</h1>
    </div>
</section>
```

Esto hace que cada página comparta un mismo eje estructural, pero tenga contenido específico.

## 5. Página de puertos

En la vista de puertos, el punto clave es el contenedor vacío que luego rellenará JavaScript:

```html
<div class="puertos-grid" id="puertosContainer" aria-live="polite"></div>
```

Esto es la base para la carga dinámica de datos. El contenido no está hardcodeado, sino que se inyecta desde JSON.

## 6. Sección de retos

La página de retos sigue el mismo patrón de estructura, pero cambia el contenido textual como una vista distinta dentro del mismo producto.

## 7. Accesibilidad

El HTML actual incorpora algunos atributos relevantes para accesibilidad:

- `aria-label` en los botones y enlaces
- `aria-expanded` para indicar el estado del menú
- `aria-live="polite"` en contenedores dinámicos
- `tabindex="0"` en elementos interactivos que no son nativos

Esto ayuda a que la navegación sea más usable con lector de pantalla y con teclado.

## 8. Resumen

El HTML del proyecto actual está muy orientado a una estructura modular y reutilizable. La semántica es clara y cada bloque tiene una función concreta dentro del producto: cabecera, navegación, contenido y pie de página.

La parte más importante para la lógica de la app es el uso de contenedores vacíos que luego se rellenan con información desde JavaScript, lo que convierte la interfaz en algo más dinámico y escalable.
