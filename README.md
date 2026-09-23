# SUMMIT

## Proyecto actual

SUMMIT es un prototipo web de una app de ciclismo y coleccionismo de puertos. La interfaz actual está construida con HTML, CSS y JavaScript puro, con varias páginas dedicadas a la navegación, la colección de puertos y los retos.

La idea principal es convertir cada puerto de montaña en un "parche" o "medalla" coleccionable. El usuario puede ver los puertos disponibles, filtrar por nivel de dificultad, explorar la colección y navegar por distintas secciones de la app.

## Estado actual del proyecto

La estructura web ya incluye estas páginas:

- `src/inicio/indexInicio.html`: pantalla principal / landing page
- `src/puertos/puertos.html`: colección de puertos con galería dinámica
- `src/retos/retos.html`: vista de retos
- `src/perfil/`: espacio preparado para la página de perfil
- `src/comunidad/comunidad.html`: primera página de comunidad
- `data/puertosPV.json`: fuente de datos de puertos
- `images/`: assets y chapas visuales

## Funcionalidades ya implementadas

- Header con logo, título y perfil
- Sidebar lateral de navegación
- Botón de hamburguesa para abrir/cerrar el menú
- Grid de puertos cargado desde JSON
- Tarjetas con efecto flip al hacer clic
- Filtros por nivel de dificultad
- Diseño responsive en tablet y móvil
- Paleta visual consistente con la identidad del producto

## Estructura del proyecto

```text
SUMMIT/
├── README.md
├── data/
│   └── puertosPV.json
├── images/
│   ├── chapas/
│   ├── logo/
│   └── photo/
├── src/
│   ├── comunidad/
│   │   ├── comunidad.html
│   │   └── stylesComunidad.css
│   ├── inicio/
│   │   ├── app.js
│   │   ├── indexInicio.html
│   │   └── stylesInicio.css
│   ├── perfil/
│   │   └── (pendiente de desarrollo)
│   ├── puertos/
│   │   ├── appPuertos.js
│   │   ├── puertos.html
│   │   └── stylesPuertos.css
│   ├── retos/
│   │   ├── appRetos.js
│   │   ├── retos.html
│   │   └── stylesRetos.css
│   └── ...
├── apuntes/
│   ├── apuntes-css.md
│   ├── apuntes-html.md
│   ├── apuntes-js.md
│   ├── apuntes-summit.md
│   ├── plan-primera-entrega.md
│   └── tarjetas-medallas-flip.md
└── ...
```

## Cómo arrancarlo

Como es un prototipo front-end estático, no necesitas compilación ni framework.

La forma más sencilla es servir la carpeta localmente:

```bash
cd /Users/maialenbarredomuro/Desktop/SUMMIT_Github
python3 -m http.server 8000
```

Después abre en el navegador:

- <http://localhost:8000/src/inicio/indexInicio.html>
- <http://localhost:8000/src/puertos/puertos.html>
- <http://localhost:8000/src/retos/retos.html>
- <http://localhost:8000/src/comunidad/comunidad.html>

## Datos

El archivo `data/puertosPV.json` contiene la información de los puertos, incluyendo:

- nombre
- nivel
- distancia
- desnivel
- logo
- otros metadatos que se pueden ampliar más adelante

## Roadmap visual y funcional

### Primera entrega

El objetivo de la primera entrega es terminar la página de retos, crear y terminar la página de perfil, preparar una primera propuesta de la página de comunidad y crear un CSS genérico con los estilos comunes del proyecto.

La planificación de trabajo para los 12 días está disponible en [apuntes/plan-primera-entrega.md](apuntes/plan-primera-entrega.md).

### En curso

- crear un CSS genérico con los estilos comunes del proyecto
- mantener la navegación responsive
- mejorar la experiencia mobile
- ajustar la grilla de puertos para tamaños intermedios
- pulir la identidad visual de cada sección

### Próximo paso

- conectar la app con Strava o con otra fuente de datos reales
- introducir persistencia de colecciones o logros
- ampliar la lógica de retos y comunidad

## Nota

Este repositorio se encuentra en una fase de prototipo web exploratorio. La idea es validar la dirección visual y la UX antes de pasar a una versión más avanzada con lógica de negocio o integración externa.
