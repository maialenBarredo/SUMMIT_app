---
name: preparar-entregas
description: "Usa este skill cuando haya que preparar, revisar o cerrar una entrega del proyecto SUMMIT: prototipo web estático de HTML, CSS y JavaScript con páginas de retos, perfil, comunidad y colección de puertos. Guía el alcance, la integración, las comprobaciones responsive y el informe final."
argument-hint: Indica qué entrega o conjunto de cambios de SUMMIT quieres preparar y qué partes están terminadas.
---

# Preparar entregas de SUMMIT

Convierte un conjunto de cambios del prototipo SUMMIT en una entrega comprobable y presentable. Trabaja con el estado real del workspace y conserva las decisiones visuales y la estructura existentes.

## 1. Fijar el alcance

1. Lee `README.md` y el plan de entrega relevante en `apuntes/`.
2. Inspecciona el árbol real de `src/`, `data/` e `images/`; no des por válidas rutas que solo aparezcan en la documentación.
3. Enumera las páginas, funcionalidades y criterios que pertenecen a esta entrega.
4. Separa cada punto en `hecho`, `pendiente`, `bloqueado` o `fuera de alcance`.
5. Si el alcance no está claro, pregunta antes de modificar varias áreas. Para una corrección localizada, sigue con el contexto disponible y registra la suposición.

## 2. Revisar la implementación

Para cada página incluida:

- Confirma que el HTML carga sus CSS, scripts, imágenes y datos desde rutas válidas.
- Comprueba que la navegación enlaza con las páginas reales del proyecto.
- Revisa que los estados importantes existan: contenido normal, vacío, error o interacción desactivada cuando corresponda.
- Verifica que los cambios compartidos no rompan las páginas que no forman parte de la entrega.
- Comprueba que los datos de `data/puertosPV.json` coinciden con los campos que consume el JavaScript.
- Mantén el estilo actual de HTML, CSS y JavaScript vanilla; no introduzcas un framework o una build si la entrega no lo requiere.

Da prioridad a errores que impidan navegar, cargar recursos, usar una interacción o presentar correctamente una página. No hagas refactors no relacionados para mejorar el aspecto del diff.

## 3. Integrar y pulir

Cuando falte una pieza dentro del alcance:

1. Identifica el archivo que controla directamente el comportamiento.
2. Haz el cambio mínimo que complete el requisito.
3. Reutiliza variables, clases, componentes visuales y patrones de navegación existentes.
4. Ajusta primero escritorio y después los puntos de ruptura usados por el proyecto.
5. Comprueba que textos, botones, tarjetas, imágenes y controles no se solapen ni desborden.
6. Revisa teclado, foco visible, `alt` de imágenes y etiquetas de controles en las interacciones modificadas.

Si un requisito necesita datos reales, backend, persistencia o una integración externa que no existe, implementa solo una representación explícita y funcional de prototipo. Declara la limitación en el informe; no simules que está terminado.

## 4. Validar localmente

Arranca el servidor desde la raíz del workspace:

```bash
python3 -m http.server 8000
```

Abre cada URL de la entrega y comprueba:

- carga inicial sin errores de consola;
- navegación entre páginas y enlaces relativos;
- scripts, JSON, fuentes e imágenes sin respuestas 404;
- filtros, botones, menú, tarjetas flip y demás interacciones del alcance;
- diseño en escritorio y móvil, incluyendo tamaños intermedios;
- ausencia de desbordamiento horizontal y de elementos superpuestos;
- estado vacío o contenido de ejemplo cuando el diseño lo requiera.

Si existe una herramienta de navegador disponible, usa capturas en al menos una vista de escritorio y una móvil para revisar visualmente la entrega. Si no existe, documenta la comprobación manual realizada.

## 5. Cerrar la entrega

Antes de darla por terminada:

1. Relee el alcance y marca cada criterio como verificado, pendiente o bloqueado.
2. Revisa el diff para detectar archivos accidentales, rutas locales, código de depuración y cambios fuera de alcance.
3. Comprueba que la documentación de arranque o de la entrega sigue siendo correcta.
4. No borres trabajo existente ni archivos del usuario sin confirmación.
5. Resume los cambios, las verificaciones ejecutadas y cualquier limitación conocida.

La entrega está lista solo cuando las páginas del alcance cargan desde una raíz limpia, sus interacciones principales funcionan, el responsive no presenta fallos visibles y cualquier pendiente está nombrado explícitamente.

## Formato del informe

Usa este formato breve:

```text
Entrega: <nombre o fecha>

Completado:
- <criterio o cambio>

Verificado:
- <comando o comprobación>

Pendiente o bloqueado:
- <elemento y motivo>

Riesgos conocidos:
- <limitación, si existe>
```
