# Apuntes de SUMMIT

## Visión general del proyecto

SUMMIT nace como una idea de producto para combinar ciclismo, rutas y coleccionismo visual. La propuesta central es transformar cada puerto o ascensión en un trofeo o parche que el usuario va desbloqueando conforme completa rutas.

En el estado actual, el proyecto ya no es solo una idea conceptual: es un prototipo web funcional con varias páginas, una estructura visual clara y datos dinámicos cargados desde un JSON.

## Qué forma parte del producto actual

### 1. Landing / inicio
La página de inicio presenta la identidad del producto, la navegación y una introducción visual al estilo de la app.

Incluye:

- cabecera con marca y perfil
- sidebar de navegación
- bloque de banner con llamado a la acción
- tarjetas de estadísticas
- sección de colección personal

### 2. Colección de puertos
La pantalla de puertos es la parte más importante del prototipo. Muestra una galería con cada puerto como una tarjeta individual.

Cada tarjeta incluye:

- imagen de la chapa
- nombre del puerto
- nivel de dificultad
- distancia y desnivel
- opción de giro para ver más detalle

### 3. Retos
La vista de retos está pensada para ampliar la experiencia de la aplicación más allá del simple registro y la colección.

Se estructura como una segunda zona de producto donde el usuario puede:

- ver objetivos
- participar en retos
- progresar en distintas categorías

### 4. Datos
La información no está fija en el HTML. Se lee desde `data/puertosPV.json`, que permite trabajar de forma más limpia y escalable.

Esto ayuda a:

- separar contenido de presentación
- reutilizar la misma lógica en distintas vistas
- preparar la app para futuras integraciones reales

## Arquitectura visual del prototipo

La app se organiza con estas capas:

- `header`: marca y acciones principales
- `sidebar`: navegación del producto
- `main`: contenido principal por página
- `footer`: cierre visual y enlaces sociales

Aunque todavía es un prototipo, esta estructura ya prepara la base para una app más completa y con navegación por secciones.

## Estilo visual

El sistema visual actual se apoya en varias decisiones claves:

- fondo oscuro para el header y la sidebar
- tonos verdes y tierra para reforzar la identidad de recorrido y naturaleza
- códigos de color por nivel para diferenciar dificultad
- tipografías de estilo editorial para los títulos
- uso de iconos para mejorar legibilidad y ritmo visual

## Relación con el concepto de colección

La idea importante es que cada puerto no solo se ve como dato, sino como un objeto coleccionable. El diseño intenta que la sensación sea parecida a la de una colección de cartas o medallas, donde la dificultad, el nombre y la ruta forman parte del valor del elemento.

Eso se ve en:

- el uso de chapas visuales
- los colores diferenciados por nivel
- la tarjeta con giro para revelar información adicional
- la estructura de catálogo y filtros

## Fase actual del producto

En este momento el proyecto se ha centrado más en la validación visual y de flujo UX que en la lógica de backend. Es decir:

- la navegación funciona
- la visualización de puertos está resuelta
- la colección se presenta bien en varias pantallas
- el estilo general es coherente
- la lógica de datos ya está preparada para ampliarse

## Siguientes pasos sugeridos

1. Añadir persistencia para guardar logros del usuario.
2. Conectar con Strava o algún origen de datos real.
3. Expandir la vista de retos con más variedad de objetivos.
4. Reforzar el diseño responsive para móviles.
5. Preparar una estructura más robusta de componentes reutilizables.

## Resumen

SUMMIT está pasando de una idea conceptual a un prototipo con identidad clara y navegación funcional. La base de producto ya está en marcha: marca, colecciones, puertos, retos y estructura de páginas. Lo que sigue es convertir ese prototipo en una experiencia más completa, conectada y real.

Esto hace tres cosas clave:

- margin: 0 elimina el margen por defecto del navegador
- background-color aplica el fondo general de la página
- ayuda a que todo empiece desde la misma base visual

Sin este reset básico, cada navegador puede poner márgenes y alturas distintos y la página se vería rara.

### 4.3 Header: cabecera superior

```css
header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 68px;
  padding: 0 2.25rem;
  background-color: var(--color-forest);
  border-bottom: 1px solid var(--border);
}
```

Explicación detallada:

- display: flex coloca los hijos del header en fila
- align-items: center centra verticalmente cada bloque
- gap crea separación entre logo, título y perfil
- min-height fija la altura mínima para que no se comprima
- padding añade espacio lateral
- background-color oscurece la zona superior para crear contraste
- border-bottom separa visualmente el header del contenido de abajo

El header está pensado como una franja de navegación principal. Tiene un fondo oscuro y los elementos claros, para crear contraste y autoridad visual.

#### Elementos del header

```css
.logo_header {
  flex: 0 0 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- flex: 0 0 110px: fija un ancho para el bloque del logo
- display: flex: centra el contenido del logo
- justify-content: center: lo centra horizontalmente

```css
.titulo_header {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
```

- flex: 1 1 auto hace que el título ocupe el espacio disponible
- el texto queda centrado y equilibrado

```css
.titulo_header h1 {
  margin: 0;
  color: var(--color-snow);
  font-size: clamp(1.25rem, 2.5vw, 1.8rem);
  font-weight: 700;
  letter-spacing: 0.18em;
}
```

Este bloque define la tipografía del título principal del header:

- margin: 0 elimina el margen por defecto del h1
- color: var(--color-snow) hace que el texto sea blanco claro
- font-size: clamp(...) hace que el texto se adapte según el ancho de la pantalla
- font-weight: 700 hace que sea más grueso y contundente
- letter-spacing: 0.18em separa las letras para que parezca más editorial y premium

```css
.miPerfil_header {
  flex: 0 0 auto;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--color-snow);
}
```

- margin-left: auto empuja este bloque a la derecha del header
- display: flex pone icono y texto en fila
- gap separa el icono del texto

### 4.4 Sidebar

```css
.sidebar {
  width: 190px;
  min-height: calc(100vh - 150px);
  background-color: var(--color-forest);
  color: var(--text-light);
  padding: 22px 16px;
  box-sizing: border-box;
  border-right: 1px solid var(--border);
}
```

Aquí se crea la barra lateral:

- width: 190px fija un ancho concreto
- min-height: calc(100vh - 150px) hace que la sidebar tenga una altura casi completa
- background-color oscurece el panel
- color: var(--text-light) asegura que el texto sea claro
- padding añade espacio interior
- box-sizing: border-box hace que el padding no aumente el ancho final del bloque
- border-right separa visualmente la sidebar del resto del contenido

#### Logo de la sidebar

```css
.logo_sidebar {
  display: block;
  width: 88%;
  margin: 0 auto;
}
```

- display: block hace que la imagen se comporte como bloque
- width: 88% ajusta la imagen al ancho disponible
- margin: 0 auto centra la imagen horizontalmente

#### Enlaces del menú

```css
.links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 2.25rem;
}
```

- flex-direction: column apila los enlaces verticalmente
- gap crea espacio entre cada enlace
- margin-top separa el menú del logo superior

```css
.links a {
  display: block;
  color: rgba(250, 250, 247, 0.72);
  text-decoration: none;
  padding: 0.7rem 0.75rem;
  border-radius: 5px;
  font-size: 0.78rem;
  transition: background-color 160ms ease, color 160ms ease;
}
```

Explicación:

- display: block hace que cada enlace ocupe su propia fila
- color con transparencia hace que el texto parezca más suave
- text-decoration: none elimina el subrayado de los links
- padding genera espacio dentro de cada elemento
- border-radius redondea los bordes
- font-size hace que el texto sea pequeño y discreto
- transition suaviza los cambios al pasar el cursor

```css
.links a:hover {
  color: var(--text-light);
  background-color: var(--color-ochre);
}
```

- al pasar el cursor cambia el texto a blanco y resalta con color dorado y cálido

```css
.sidebar-strava {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(250, 250, 247, 0.22);
}
```

- margin-top: auto empuja este botón hacia abajo del menú
- display: flex alinea icono y texto
- justify-content: center centra el contenido dentro del bloque
- border produce un elemento destacado como CTA

### 4.5 Main content / contenido principal

```css
.main-content {
  flex: 1;
  padding: 32px;
}
```

La zona principal ocupa todo el espacio restante de la pantalla.

- flex: 1 hace que el contenido principal crezca y ocupe el espacio que sobra
- padding: 32px genera espacio alrededor de todos los bloques internos

```css
.main-content h1 {
  color: var(--color-snow);
}
```

Esto afecta a los encabezados dentro del main. En este caso, el banner tiene un h1 grande de color blanco.

### 4.6 Banner principal

```css
.banner {
  min-height: 460px;
  padding: clamp(2rem, 6vw, 5rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(...), url(...);
  background-size: cover;
  background-position: center;
  color: var(--color-snow);
}
```

Este bloque es muy importante porque crea el efecto hero de la app.

Explicación línea a línea:

- min-height: 460px da altura suficiente para que el banner se vea grande
- padding: clamp(2rem, 6vw, 5rem) hace que el espacio interno crezca según el ancho de la pantalla
- box-sizing: border-box incluye padding en la altura y anchura
- display: flex + flex-direction: column hace que el contenido se apile verticalmente
- justify-content: center centra verticalmente los textos
- align-items: flex-start alinea el contenido a la izquierda
- position: relative permite aplicar posición más avanzada si hace falta
- overflow: hidden evita que la imagen o contenido salga del contenedor
- background-image combina dos capas: un gradiente oscuro encima de una imagen
- background-size: cover hace que la imagen cubra todo el fondo sin deformarse
- background-position: center centra la foto
- color: var(--color-snow) hace que todo el texto del banner sea blanco claro

#### Subtextos del banner

```css
.banner-kicker {
  margin: 0 0 1rem;
  color: var(--color-ochre);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.24em;
}
```

- color: var(--color-ochre) le da un azul / dorado cálido para una pequeña línea de texto
- letter-spacing: 0.24em separa mucho las letras para dar sensación premium
- font-weight: 700 lo hace más grueso

```css
.banner h1 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  line-height: 0.98;
  letter-spacing: 0.04em;
}
```

- font-size: clamp hace que el título cambie de tamaño según la pantalla
- line-height: 0.98 ajusta la altura de línea para que el texto quede compacto
- letter-spacing: 0.04em da un toque más editorial sin exagerar

```css
.banner-copy {
  max-width: 29rem;
  margin: 1.5rem 0 2rem;
  color: rgba(250, 250, 247, 0.86);
  font-size: 1.05rem;
  line-height: 1.6;
}
```

- max-width limita el ancho de la descripción para no hacer demasiado largo un párrafo
- margin separa el texto del h1 y del botón
- color con transparencia hace que parezca más ligero y menos pesado

```css
.banner-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  background-color: var(--color-mountain);
  color: var(--color-snow);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: background-color 160ms ease, transform 160ms ease;
  border-radius: 20px;
}
```

Este botón se parece a un CTA:

- display: inline-flex hace que el botón se comporte como un inline con contenido flexible
- align-items: center centra verticalmente el texto y el icono
- gap separa el texto del icono
- background-color y color forman contraste
- text-decoration: none elimina el subrayado por defecto del enlace
- border-radius: 20px lo vuelve muy redondeado
- transition suaviza el cambio al pasar por encima

```css
.banner-button:hover {
  background-color: var(--color-forest);
  transform: translateY(-2px);
}
```

Cuando el usuario pasa por encima:

- el fondo se vuelve más oscuro
- el botón se levanta ligeramente con translateY
- da una sensación de clic o interactividad

### 4.7 Estadísticas: recuadros

```css
.recuadros {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}
```

Esto crea una fila de 4 cuadros con espacio uniforme:

- grid-template-columns: repeat(4, minmax(0, 1fr)) hace 4 columnas equivalentes
- gap: 1rem separa cada mini panel
- margin-top añade espacio por encima

```css
.stat-tile {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: var(--surface);
  border-top: 3px solid var(--color-ochre);
  padding: 1.1rem 1.2rem;
  box-shadow: var(--shadow-suave);
  border-radius: 25px;
}
```

Cada cuadro es una tarjeta con:

- flex-direction: column para apilar icono, número y texto
- background-color claro para destacarse sobre el fondo
- border-top de color cálido para hacer una línea decorativa
- padding de espacio interior
- shadow para darle profundidad
- border-radius redondeado para suavizar las esquinas

```css
.stat-valor {
  font-family: var(--font-mono);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-primary);
}
```

- font-family: var(--font-mono) le da un estilo más técnico, tipo número o dato
- font-size 1.6rem hace que el valor destaque
- font-weight le da fuerza

```css
.stat-label {
  font-size: 0.78rem;
  color: var(--text-secondary);
}
```

- el texto pequeño de la etiqueta sirve para aclarar qué significa el valor

### 4.8 Filtros de nivel

```css
.levelAll-button,
.levelOne-button,
.levelTwo-button,
.levelThree-button,
.levelFour-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  background-color: var(--surface-dark);
  color: var(--color-snow);
  text-decoration: none;
  border-radius: 20px;
}
```

Todos los filtros comparten estilos similares:

- apariencia de botón redondeado
- fondo oscuro
- texto blanco
- padding para hacerlos más cómodos de clickear

```css
.levelOne-button:hover {
  background-color: var(--level-1);
}
```

Cada nivel tiene un color distinto al pasar por encima. Esto ayuda a diferenciar visualmente las dificultades.

### 4.9 Sección Mis Parches

```css
.misParches {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: rgba(250, 250, 247, 0.72);
  border: 1px solid rgba(23, 42, 39, 0.08);
  border-radius: 32px;
  padding: 28px 26px 26px;
  box-shadow: 0 18px 40px rgba(23, 42, 39, 0.08);
}
```

Es el bloque principal de la colección.

- display: flex y flex-direction: column apilan los elementos en columna
- gap crea separación entre título, filtros y tarjetas
- background semi-transparente da sensación de carta ligera sobre fondo verde
- border y box-shadow definen una superficie elevada
- border-radius: 32px redondea mucho, más premium

```css
.misParches h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 3vw, 3.1rem);
  color: var(--text-primary);
  letter-spacing: -0.04em;
}
```

- font-family: var(--font-display) parece más editorial y más grande
- letter-spacing negativo reduce el espacio entre letras para que el texto se vea compacto y elegante

### 4.10 Grid de puertos

```css
.parches {
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 1.5rem;
}
```

Este bloque es la colección de tarjetas.

- grid crea varias columnas
- repeat(3, minmax(150px, 1fr)) quiere decir “3 columnas, cada una con un ancho mínimo de 150px y máximo flexible”
- gap separa las tarjetas entre sí

Esto permite que se vea un mosaico limpio de puertos, con una organización uniforme.

### 4.11 Tarjeta de cada puerto

```css
.puerto {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 260px;
  padding: 1rem 0.8rem 1.1rem;
  background: linear-gradient(...);
  border: 1px solid rgba(23, 42, 39, 0.08);
  border-radius: 28px;
  box-shadow: 0 18px 30px rgba(23, 42, 39, 0.08);
  cursor: pointer;
  transition: ...;
}
```

Esta tarjeta tiene una estructura vertical:

- flex-direction: column -> la imagen va arriba, la información debajo
- align-items: center -> todo se centra horizontalmente
- justify-content: flex-start -> el contenido empieza arriba
- min-height: 260px -> da altura a cada tarjeta
- padding -> espacio interno
- background: linear-gradient(...) da un fondo sutil y cálido
- border-radius: 28px -> esquinas muy redondeadas
- cursor: pointer indica que se puede clicar
- transition anima cambios visuales

#### Borde superior según nivel

```css
.puerto[data-nivel="1"] {
  border-top: 4px solid var(--level-1);
}
```

Esto añade una línea pequeña en la parte superior de cada tarjeta según el nivel:

- nivel 1 -> verde claro
- nivel 2 -> azul
- nivel 3 -> terracota
- nivel 4 -> rojo oscuro

Es una pista visual directa para saber el tipo de dificultad sin tener que leer el texto.

#### Hover de la tarjeta

```css
.puerto:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 40px rgba(23, 42, 39, 0.12);
}
```

- translateY(-4px) levanta la tarjeta ligeramente
- box-shadow aumenta para simular que sale más hacia delante
- da impresión de “hover elegante”

### 4.12 Logo del puerto

```css
.puertoLogoWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
}
```

- define el contenedor donde va la imagen del puerto
- centra la chapa de forma limpia
- le da una altura mínima para mantener consistencia visual

```css
.chapa {
  width: 76%;
  max-width: 220px;
  height: auto;
  display: block;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px rgba(23, 42, 39, 0.12));
}
```

- width: 76% hace que la imagen ocupe la mayoría del espacio disponible
- max-width: 220px evita que sea demasiado grande
- height: auto mantiene proporciones
- object-fit: contain hace que la imagen no se recorte ni se deforme
- filter: drop-shadow crea una sombra bajo la imagen para darle volumen

### 4.13 Información del puerto debajo

```css
.puertoInfo {
  width: 100%;
  margin-top: 0.75rem;
  text-align: center;
}
```

- text-align: center centra nombre, nivel y km
- width: 100% hace que la zona de texto ocupe todo el ancho disponible

```css
.puertoInfo h3 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 0.95rem;
  line-height: 1.35;
  letter-spacing: -0.02em;
}
```

- h3 es el nombre del puerto
- font-family más decorativa
- font-size pequeño pero legible
- line-height mejora la separación entre líneas cuando el nombre es largo

```css
.nivelBadge {
  display: inline-block;
  margin: 0.45rem 0 0.3rem;
  padding: 0.28rem 0.6rem;
  background: rgba(100, 122, 104, 0.12);
  color: var(--color-forest);
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

Este bloque parece una etiqueta:

- display: inline-block hace que se comporte como una etiqueta pequeña
- padding añade espacio interior
- background: semi-transparente da suavidad
- border-radius: 999px lo redondea completamente
- font-size muy pequeño para que parezca una etiqueta de categoría
- text-transform: uppercase convierte el texto a mayúsculas

```css
.puertoInfo p:last-child {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.72rem;
  line-height: 1.5;
}
```

- esta es la línea de km y desnivel
- color secundario para que parezca menos importante que el nombre
- size más pequeño para indicar detalle informativo

### 4.14 Responsive design

```css
@media (max-width: 900px) {
  .parches {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }
}
```

Cuando la pantalla es estrecha, la aislamos a 2 columnas para no apretar demasiado.

```css
@media (max-width: 520px) {
  .parches {
    grid-template-columns: 1fr;
  }
}
```

En móvil, cada tarjeta ocupa toda la fila, para que sea fácil leerla y tocarla.

Esto es bastante importante porque toda la app debe funcionar bien en pantallas pequeñas.

### 4.15 Footer

```css
footer {
  padding: 1.25rem 2rem;
  background: var(--color-forest);
  color: #f6f3ed;
  font-family: var(--font-display);
  letter-spacing: 0.25em;
  font-size: 0.7rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
```

El footer está diseñado como un cierre visual final de la página:

- background oscuro para contrastar con el contenido central
- letras claras para mantener legibilidad
- letter-spacing amplio para dar sensación premium
- display: flex + flex-direction: column apila el contenido verticalmente
- align-items: flex-start alinea a la izquierda

```css
footer .social-links {
  margin-left: auto;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-top: -2.2rem;
}
```

- margin-left: auto empuja los iconos sociales a la derecha del footer
- display: flex pone los iconos en fila
- margin-top: -2.2rem ajusta su posición para alinearlos visualmente con el bloque superior

---

## 5. Qué significa todo esto en conjunto

El CSS del proyecto hace varias cosas a la vez:

1. define la identidad visual de la marca
2. organiza el contenido con flexbox y grid
3. crea profundidad con sombras y redondeados
4. usa colores para diferenciar niveles
5. separa secciones con paddings, gaps y margins
6. adapta la interfaz a móvil con media queries
7. crea una experiencia moderna y premium

En resumen, no es solo poner colores y redondear; detrás de cada línea hay un objetivo visual.

---

## 6. Si quieres explicarlo en examen

Puedes decir algo como esto:

“En CSS he definido variables globales para los colores del proyecto, he usado flexbox para distribuir los elementos del header y la sidebar, y grid para organizar la colección de puertos. Además, he aplicado bordes redondeados, sombras suaves, fondos con transparencia y hover states para dar una sensación más moderna y premium. Las media queries permiten que la interfaz se adapte a móvil sin perder legibilidad.”

Eso ya te serviría para explicar prácticamente todo el CSS del proyecto.

---

## 7. Resumen ultra breve

- :root = variables de color
- body = base del documento
- header = cabecera
- sidebar = navegación
- banner = presentación principal
- recuadros = estadísticas
- parches = colección de tarjetas
- puerto = cada tarjeta individual
- media queries = versión móvil
- hover = interacción visual
- box-shadow + border-radius = estilo premium

---

Si quieres, te puedo convertir este mismo documento en una versión aún más corta para imprimir en una sola hoja, tipo chuleta de examen, sin perder los conceptos importantes.

Función:

- crea profundidad visual
- hace que las tarjetas parezcan “flotar” sobre el fondo
- aporta elegancia y afinación al diseño

### 4.6 hover

```css
.puerto:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 40px rgba(23, 42, 39, 0.12);
}
```

Función:

- hace que al pasar el cursor haya un efecto visual
- da sensación de interactividad
- mejora la experiencia del usuario

### 4.7 transiciones

```css
.puerto {
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}
```

Función:

- suaviza cambios visuales
- hace que el hover se sienta más natural
- evita que la animación sea brusca

### 4.8 media queries

```css
@media (max-width: 900px) {
  .parches {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }
}
```

Función:

- adapta la página a pantallas más pequeñas
- hace que el diseño sea responsive
- es fundamental para móvil

### 4.9 estilos por nivel

```css
.puerto[data-nivel="1"] {
  border-top: 4px solid var(--level-1);
}
```

Función:

- cada tarjeta puede tener un color según su nivel
- ayuda a distinguir visualmente cada categoría

---

## 5. JavaScript: funciones utilizadas y explicadas

El archivo app.js es el corazón de la dinámica.

### 5.1 PuertoFallback

```js
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

Función:

- es una copia de seguridad
- se usa si el JSON no carga bien
- evita que la web se rompa

### 5.2 Variable global

```js
let todosLosPuertos = [];
```

Función:

- guarda todos los puertos en una sola variable
- facilita filtrarlos y renderizarlos

### 5.3 getPuertoLogo

```js
function getPuertoLogo(nombre) {
  const texto = nombre.toLowerCase();

  if (texto.includes("oiz")) return "monte-oiz";
  if (texto.includes("urkiola")) return "urkiola";
  return "puerto-bloqueado";
}
```

Explicación:

- recibe el nombre del puerto
- pasa a minúsculas para comparar texto sin importar mayúsculas
- busca palabras clave como "oiz" o "urkiola"
- devuelve el nombre del archivo de imagen correspondiente
- si no encuentra una coincidencia, devuelve una imagen por defecto

Esto permite relacionar un nombre de puerto con una imagen sin escribirla a mano cada vez.

### 5.4 renderParches

```js
function renderParches(data) {
  const contenedor = document.getElementById("parchesContainer");

  if (!contenedor) return;

  contenedor.innerHTML = data.map((puerto) => {
    const nombre = puerto.nombre || "Puerto";
    const nivel = puerto.nivel || 1;
    const km = puerto.km || 0;
    const desnivel = puerto.m_desnivel || 0;
    const logo = puerto.logo || getPuertoLogo(nombre);

    return `
      <article class="puerto" data-nivel="${nivel}">
        <div class="puertoLogoWrap">
          <img src="../images/chapas/${logo}.png" alt="${nombre}" class="chapa">
        </div>
        <div class="puertoInfo">
          <h3>${nombre}</h3>
          <p class="nivelBadge">Nivel ${nivel}</p>
          <p>${km} km · ${desnivel} m</p>
        </div>
      </article>
    `;
  }).join("");
}
```

Explicación:

- busca el contenedor donde se pintarán las tarjetas
- si no existe, no hace nada
- recorre cada puerto del array con map
- por cada item crea una plantilla HTML
- inserta nombre, nivel, km y altura
- devuelve un bloque completo de HTML
- join() une todas las tarjetas en un único string

Esto es la base de la carga dinámica de contenido.

### 5.5 filtrarParches

```js
function filtrarParches(nivel) {
  if (!todosLosPuertos.length) return;

  const lista = nivel === "todos"
    ? todosLosPuertos
    : todosLosPuertos.filter((puerto) => Number(puerto.nivel) === Number(nivel));

  renderParches(lista);
}
```

Explicación:

- si el usuario escoge Todos, muestra todo el array
- si escoge Nivel 1, muestra solo los puertos con nivel 1
- filter() es la clave aquí: recorre el array y guarda solo los que cumplen una condición
- Number() convierte texto a número por si el valor llega como string

### 5.6 activarBotonNivel

```js
function activarBotonNivel(nivel) {
  document.querySelectorAll(".filtroNiveles a").forEach((boton) => {
    const activo = boton.classList.contains("levelAll-button") && nivel === "todos"
      || boton.classList.contains(`level${nivel}-button`) && nivel !== "todos";

    boton.classList.toggle("is-active", activo);
  });
}
```

Explicación:

- busca todos los botones del filtro
- compara qué botón corresponde al nivel elegido
- añade o quita la clase is-active
- esto permite resaltar el botón activo visualmente

### 5.7 bindFiltros

```js
function bindFiltros() {
  document.querySelectorAll(".filtroNiveles a").forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();

      const href = boton.getAttribute("href") || "#todos";
      const nivel = href.includes("nivel")
        ? href.replace("#nivel", "")
        : "todos";

      activarBotonNivel(nivel);
      filtrarParches(nivel);
    });
  });
}
```

Explicación:

- selecciona todos los enlaces de filtro
- añade un evento click a cada uno
- previene la acción por defecto del enlace
- analiza la URL del enlace (#nivel1, #nivel2, #todos)
- extrae el valor de nivel
- llama a activarBotonNivel y filtrarParches

### 5.8 cargarPuertos

```js
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

Explicación:

- fetch() carga el archivo JSON
- await espera la respuesta
- response.json() convierte el texto JSON a un array de objetos
- si todo va bien, se actualiza todosLosPuertos
- si hay error, se usa el fallback
- bindFiltros es importante para que los botones funcionen
- filtrarParches("todos") muestra todos los puertos al inicio

### 5.9 llamada final

```js
cargarPuertos();
```

Función:

- ejecuta todo al cargar la página
- inicia la app

---

## 6. JSON: estructura de datos

El archivo [data/puertosPV.json](data/puertosPV.json) tiene este tipo de entradas:

```json
{
  "nombre": "Monte Oiz (desde Iurreta)",
  "nivel": 1,
  "km": 14.9,
  "m_desnivel": 891
}
```

Cada objeto representa un puerto.

Esto es útil porque:

- la información está centralizada
- se puede reutilizar fácilmente
- cambia una sola vez cuando quieres actualizar datos

---

## 7. Qué hemos aprendido en general

### HTML

- sirve para estructurar contenido
- organiza partes como header, sidebar, cards, listas y botones
- ayuda a dar sentido semántico a la página

### CSS

- sirve para diseñar visualmente la aplicación
- controla color, tamaño, posición, sombras, redondeado y responsividad
- permite hacer una interfaz mucho más pulida

### JavaScript

- conecta la información con la interfaz
- permite crear contenido dinámico
- hace posible filtrar, renderizar y gestionar datos del usuario

### JSON

- sirve como base de datos de prueba para la app
- guarda estructuras claras y reutilizables
- combina bien con fetch() y JavaScript

---

## 8. Concepto clave del proyecto

La app está construida con una lógica muy simple y clara:

1. HTML crea la base visual.
2. CSS define el estilo.
3. JSON guarda los datos.
4. JavaScript lee esos datos y los pinta en pantalla.
5. Los filtros permiten cambiar la colección según el nivel.

Esto es una base muy buena para cualquier proyecto web más grande.

---

## 9. Resumen final para estudiar

- HTML = estructura
- CSS = diseño
- JS = comportamiento
- JSON = datos
- map() = crear tarjetas desde un array
- filter() = seleccionar elementos según una condición
- fetch() = leer datos externos
- addEventListener() = reaccionar al click
- querySelectorAll() = buscar varios elementos
- classList.toggle() = activar/desactivar clase visual

---

## 10. Siguiente paso recomendado

Lo siguiente más útil sería:

- crear un segundo archivo HTML para una vista de detalle del puerto
- añadir una página de perfil de usuario
- mejorar el diseño de los filtros con colores por nivel
- añadir más estados como “desbloqueado / bloqueado”

---

Si quieres, te puedo dejar ahora mismo una versión todavía más compacta, tipo “chuleta definitiva en una sola hoja” para imprimir, o incluso convertir esto a formato PDF si quieres que te lo deje listo para descargar.
