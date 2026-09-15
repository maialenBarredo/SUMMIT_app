# SUMMIT

## Coleccionismo y ciclismo

SUMMIT es una aplicación móvil gamificada que convierte la ascensión de puertos de ciclismo en una experiencia de coleccionismo. En lugar de funcionar únicamente como un tracker deportivo, SUMMIT valida las rutas realizadas por el usuario y desbloquea un parche o cromo virtual por cada puerto coronado.

Cada puerto tiene una identidad visual propia, inspirada en las cartas coleccionables, con información sobre su dureza, altitud y vertiente. El objetivo es que cada salida en bicicleta contribuya a completar una colección.

El MVP está centrado en ciclismo de carretera y gravel. La arquitectura se ha planteado para poder incorporar en el futuro cumbres, refugios y travesías de montaña.

## Objetivos del MVP

- Conectar las actividades del usuario mediante Strava.
- Validar que una ruta pasa por la vertiente correcta de un puerto.
- Desbloquear automáticamente el parche correspondiente.
- Mostrar la colección organizada por expansiones geográficas.
- Crear una experiencia visual de colección, no solo de registro deportivo.

## Funcionalidades principales

### Vitrina visual

La colección se presenta en una pantalla de showcase con pestañas por expansión geográfica, por ejemplo:

- Euskal Herria
- Pirineos
- Alpes
- Otras regiones futuras

Cada puerto se representa mediante un `PatchModel`.

Los parches bloqueados no muestran el diseño final. En su lugar, utilizan una silueta geométrica plana, tintada según la categoría oficial de dureza del puerto. Cuando la ascensión se valida, el parche revela su ilustración final.

### Conexión con Strava

SUMMIT utiliza OAuth 2.0 para acceder a las actividades del usuario sin necesidad de subir archivos manualmente.

Flujo previsto:

1. SUMMIT abre el navegador para iniciar sesión en Strava.
2. El usuario concede permisos de lectura de actividades.
3. Strava devuelve un `Authorization Code`.
4. La aplicación intercambia ese código por un token de acceso y un token de refresco.
5. El servicio sincroniza las actividades disponibles.
6. El motor de validación analiza las coordenadas de las rutas.

El permiso principal utilizado es:

```text
activity:read_all
```

Los tokens deben almacenarse de forma segura y nunca incluirse en el repositorio ni en el código fuente.

### Validación de una ascensión

No basta con pasar cerca de la cima. SUMMIT comprueba que el ciclista ha realizado la vertiente concreta del puerto.

Para cada vertiente se definen, como mínimo:

- Coordenadas del inicio o base.
- Coordenadas de la cima.
- Altitud de referencia.
- Radio de tolerancia.
- Categoría de dureza.
- Identidad visual del parche.

El algoritmo analiza el track de la actividad de forma secuencial:

1. Comprueba que el usuario pasa dentro de un radio de tolerancia del punto de inicio.
2. Después comprueba que cruza el radio definido alrededor de la cima.
3. Verifica que ambos puntos se alcanzan en el orden correcto.
4. Si la secuencia es válida, cambia `isUnlocked` a `true`.
5. La vitrina muestra el diseño desbloqueado del parche.

La distancia entre coordenadas se calcula mediante la fórmula de Haversine. El radio inicial previsto para el MVP es de 300 metros, aunque debe ajustarse con pruebas reales de GPS.

## Modelo de datos

El modelo central es `PatchModel`. De forma conceptual, cada parche puede contener los siguientes datos:

```dart
class PatchModel {
  final String id;
  final String name;
  final String expansion;
  final double startLatitude;
  final double startLongitude;
  final double summitLatitude;
  final double summitLongitude;
  final double elevation;
  final String difficulty;
  final String lockedAsset;
  final String unlockedAsset;
  final bool isUnlocked;
}
```

Los nombres exactos y tipos pueden evolucionar durante la implementación, pero el modelo debe permanecer independiente de la interfaz para facilitar la incorporación de nuevas categorías.

## Arquitectura

La aplicación sigue una separación por responsabilidades:

```text
UI
├── ShowcaseScreen
├── ProfileScreen
└── Navegación

Modelos
└── PatchModel

Servicios
├── StravaService
├── OAuthService
└── GeoValidationService

Datos
├── Configuración de puertos
├── Expansiones
└── Assets de parches
```

### Capas

- **UI**: muestra la vitrina, el perfil, los estados bloqueado/desbloqueado y la navegación.
- **Modelos**: define los datos de los puertos y sus estados.
- **Servicios**: encapsula OAuth, comunicación con Strava y validación geográfica.
- **Datos**: contiene las expansiones, metadatos de los puertos y recursos visuales.

Esta separación permite cambiar la fuente de actividades o añadir nuevos tipos de rutas sin acoplar la lógica de negocio a las pantallas.

## Estado actual

La aplicación está planteada con Flutter y se prueba actualmente en entorno Web/Chrome.

Según el estado funcional del proyecto:

- La navegación base está creada.
- La pantalla de perfil está maquetada.
- El botón de inicio de sesión con Strava está integrado en la interfaz.
- La pantalla de vitrina utiliza un grid dinámico de parches.
- `PatchModel` centraliza la información de los cromos.
- La capa de servicios está separada de la UI.
- El servicio de validación geométrica mediante Haversine está aislado y preparado para recibir datos de Strava.

En este workspace también existe un prototipo web estático en `src/`, con el objetivo de explorar la dirección visual de SUMMIT.

## Estructura del proyecto

Una estructura objetivo para la aplicación Flutter sería:

```text
lib/
├── main.dart
├── models/
│   └── patch_model.dart
├── screens/
│   ├── showcase_screen.dart
│   └── profile_screen.dart
├── services/
│   ├── strava_service.dart
│   ├── oauth_service.dart
│   └── geo_validation_service.dart
├── widgets/
│   ├── patch_card.dart
│   └── expansion_tabs.dart
└── data/
    └── patches.dart

assets/
├── patches/
├── icons/
└── images/
```

El prototipo visual actual se encuentra en:

```text
src/
├── index.html
└── styles.css
```

## Puesta en marcha

### Aplicación Flutter

Con Flutter instalado:

```bash
flutter pub get
flutter run -d chrome
```

Para comprobar el entorno local:

```bash
flutter doctor
```

La integración real con Strava requiere configurar las credenciales OAuth de la aplicación fuera del repositorio.

### Prototipo web

El prototipo visual puede abrirse directamente desde `src/index.html` o servirse mediante cualquier servidor estático local.

## Configuración de Strava

Para conectar la aplicación con Strava será necesario registrar una aplicación en el panel de desarrolladores de Strava y configurar:

- `client_id`
- `client_secret`
- URL de callback autorizada
- Permisos de lectura de actividades

Recomendaciones:

- Guardar secretos en variables de entorno o configuración segura.
- No subir archivos `.env` al repositorio.
- Usar HTTPS en entornos de producción.
- Renovar el token cuando expire mediante el token de refresco.
- Solicitar únicamente los permisos necesarios.

## Consideraciones de validación GPS

La validación debe contemplar las limitaciones de los datos GPS reales:

- El margen de error puede variar según el dispositivo y la cobertura.
- El radio de 300 metros debe poder configurarse por tipo de actividad.
- La secuencia de puntos debe respetar el sentido de la ascensión.
- Una ruta que pase cerca de la cima sin pasar por la base no debe desbloquear el parche.
- Deben evitarse falsos positivos producidos por saltos de GPS.
- Conviene registrar la fecha y el identificador de la actividad validada para no procesarla varias veces.

## Escalabilidad hacia montaña

El modelo de coordenadas, altitud y estado de desbloqueo es agnóstico al deporte. Por ello, la misma arquitectura puede ampliarse para incluir:

- Cumbres.
- Refugios.
- Travesías.
- Rutas de trekking.
- Puntos de interés de montaña.

La futura adaptación deberá revisar principalmente:

- Tolerancias GPS.
- Velocidades esperadas.
- Duración de las actividades.
- Fuentes de datos compatibles.
- Representación visual de cada tipo de objetivo.

## Hoja de ruta

### Fase 1: Vitrina visual

- Consolidar el grid de parches.
- Añadir expansiones geográficas.
- Definir estados bloqueado y desbloqueado.
- Finalizar la identidad visual de los parches.

### Fase 2: Strava y OAuth 2.0

- Registrar la aplicación en Strava.
- Implementar el flujo de autorización.
- Gestionar tokens y renovación.
- Descargar y normalizar actividades.

### Fase 3: Motor de validación

- Implementar Haversine.
- Validar base y cima en orden secuencial.
- Cubrir casos límite con tests.
- Persistir actividades ya procesadas.

### Fase 4: Comunidad y escalabilidad

- Añadir más expansiones.
- Incorporar estadísticas de colección.
- Preparar el modelo para montaña y trekking.
- Recoger feedback de ciclistas de carretera y gravel.

## Licencia

Este proyecto se encuentra en fase de desarrollo. La licencia y las condiciones de uso se definirán antes de su distribución pública.
