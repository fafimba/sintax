# Sintax

Aprender sintaxis española viendo qué ocurre al transformar una frase.

La aplicación abre directamente un ejemplo manipulable. Se puede cambiar una palabra, pasar de singular a plural, sustituir un complemento, transformar la voz o abrir una oración dentro de otra. Cada cambio es reversible y tiene una explicación específica. No hay puntuaciones, respuestas obligatorias ni lecciones bloqueadas.

## Recorrido

**13 lecciones · 37 ejemplos interactivos · 4 etapas**

1. **Las piezas:** clases de palabras, grupos y núcleos, formas del verbo.
2. **La estructura:** concordancia, sujeto y predicado, orden, sujeto tácito e impersonales, categoría frente a función.
3. **Dentro del predicado:** CD, CI, atributo y predicativo, circunstancias y complemento de régimen.
4. **Conectar ideas:** activa y pasiva, coordinación, subordinadas sustantivas, relativas y temporales.

**Aprender** sigue el recorrido; **Tu recorrido** permite saltar a cualquier lección; **Explorar** abre cualquier ejemplo; **Conceptos** permite consultar y buscar las explicaciones. Los enlaces a lecciones y pasos se pueden copiar y funcionan en un alojamiento estático.

Cada paso muestra un título, una indicación y la frase. Al interactuar aparece una observación breve; «Ver explicación» despliega la definición y sus matices. La navegación del curso se abre desde el menú para mantener el foco en el ejemplo. La introducción cubre las bases y algunos contrastes importantes, no toda la gramática española. Consulta [las decisiones pedagógicas](docs/PEDAGOGIA.md).

## Desarrollo

Requiere **Node.js 22.12 o superior**. Se recomienda una versión LTS vigente.

```sh
npm ci
npm run dev
npm run build
```

React 18, TypeScript, Vite 7 y Framer Motion. Sin servidor de aplicación, cuenta ni servicios de IA. Los ejemplos están escritos y revisados: la aplicación **no analiza frases de texto libre**.

```sh
npx playwright install chromium webkit
npm test
npm run test:content
npm run test:ui
```

Las pruebas verifican todas las combinaciones de controles, casos gramaticales concretos, persistencia, navegación, teclado y recuperación de datos inválidos. El recorrido completo se comprueba a 320, 390, 768 y 1440 píxeles en Chromium y WebKit con configuración móvil. La emulación no sustituye a una prueba en un teléfono físico.

## Estructura

```text
src/
  learning/
    model.ts          Tipos, piezas, controles y normalización
    foundations.ts    Palabras, grupos y verbo
    structure.ts      Concordancia, sujeto y niveles de análisis
    complements.ts    Complementos de la oración simple
    connections.ts    Pasiva, coordinación y subordinación
    curriculum.ts     Orden del recorrido
    progress.ts       Progreso local validado
  ui/
    Explorer.tsx      Un motor para todos los ejemplos
    lesson.css        Lecciones, piezas y movimiento adaptable
    Library.tsx       Explorador e índice de conceptos
    Icon.tsx          Iconos de interfaz
  App.tsx             Navegación, recorrido y cierre de lecciones
  index.css           Diseño y adaptación a pantallas
```

Una escena declara controles finitos y una función pura que produce las piezas, sus relaciones y la explicación del estado. Para añadir contenido, se añade una escena al bloque correspondiente. El índice de conceptos y el explorador se actualizan a partir del mismo contenido.

## Progreso y accesibilidad

- Guarda el paso y el estado exacto de cada ejemplo en este navegador, con la clave `sintax_explorations_v3`.
- Una lección se marca como recorrida al pulsar «Cerrar lección». Es un registro de exploración, no una certificación de conocimiento.
- La clave del prototipo `sintax_progress_v2` se conserva sin modificar. Sus capítulos no se trasladan automáticamente porque el recorrido ha cambiado.
- Si el almacenamiento está bloqueado, la aplicación sigue funcionando durante la sesión e indica que no puede guardar.
- Controles mediante botones y deslizadores nativos; no exige arrastrar. Navegación con teclado, gestión de foco, etiquetas además de colores, zoom permitido y respeto a movimiento reducido.
- Los grupos se redistribuyen en pantallas estrechas; no se reducen mediante una escala para forzarlos a una línea.
- Las fuentes se cargan de Google Fonts, con fuentes del sistema como alternativa. No hay analítica ni cuentas.

## Compilación y publicación

Se mantiene la configuración existente de GitHub Pages: la compilación de producción usa `/sintax/` como ruta base. `npm run preview` permite revisar el resultado en `/sintax/`. Para otro subdirectorio, hay que ajustar `base` en `vite.config.ts`.

El sitio público está en [fafimba.github.io/sintax](https://fafimba.github.io/sintax/). `npm run deploy` compila y actualiza la rama `gh-pages`; GitHub Pages publica ese resultado.

[Revisión del prototipo y cambios](docs/REVISION.md).
