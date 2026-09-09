# Revisión y reconstrucción

## Hallazgos en el prototipo

1. **La experiencia se alejaba de la exploración.** Varias actividades pedían acertar una pieza, castigaban un intento con color rojo o sacudidas y bloqueaban el paso siguiente. Las transformaciones se cerraban después del primer acierto.
2. **Había saltos de conocimiento.** La subordinación estaba situada antes del CI, el atributo y los circunstanciales. Los núcleos existían en un modo de actividad separado, pero no quedaban integrados en el recorrido principal.
3. **Algunas simplificaciones creaban falsas reglas.** Aparecían afirmaciones universales sobre las dos mitades de la oración y el núcleo como palabra insuprimible. La identificación de funciones se apoyaba demasiado en preguntas semánticas.
4. **Coexistían sistemas visuales incompatibles.** Había colores por función, colores por clase de palabra, formas recortadas y dos renderizadores de grupos. La representación no era uniforme entre actividades.
5. **El móvil dependía de encoger contenido.** El diseño general era una tarjeta de 460 píxeles y algunas frases se escalaban para forzarlas a una línea. Se deshabilitaba el zoom del navegador.
6. **La navegación tenía límites.** Las lecciones posteriores estaban bloqueadas; el recorrido tenía poco soporte para volver a una idea concreta. El almacenamiento se convertía directamente al tipo esperado sin validación estructural.
7. **Quedaba código sin recorrido claro.** Menús y motores de actividades del primer prototipo convivían con el reproductor de lecciones. El README aún describía solo el experimento inicial de CD.
8. **La base de desarrollo estaba desactualizada.** El árbol de dependencias presentaba seis avisos al comenzar la comprobación. Se actualizaron Vite, su integración React y las dependencias transitivas afectadas.

## Resultado

Se conserva React, TypeScript, Framer Motion, el repositorio y la publicación manual existente de GitHub Pages. Se reconstruyen el contenido, el motor de ejemplos, la navegación y el diseño. Los motores anteriores se eliminan del árbol de trabajo y permanecen recuperables en el historial de Git.

El contenido está organizado en 13 lecciones y 37 escenas con controles reversibles. Cada escena produce una representación de la frase y una explicación del estado. El explorador y el índice de conceptos se derivan de los mismos datos, sin copiar las explicaciones a otra fuente.

El progreso de esta versión es local, validado y recuperable ante datos erróneos. Conserva las elecciones concretas de cada ejemplo. No hay cuenta, puntuación, racha, examen ni bloqueo de contenido.

## Comprobaciones reproducibles

- `npm run build`: tipos y compilación de producción, con la base `/sintax/` existente.
- `npm test`: integridad de todas las combinaciones; casos concretos de concordancia, pronombres, pasiva y subordinación; navegación; persistencia; recuperación; teclado; menú móvil; búsqueda y acceso a todas las lecciones.
- Las pruebas recorren todas las escenas y sus estados amplios en Chromium a 320, 768 y 1440 píxeles, y en WebKit móvil a 390 píxeles. Comprueban ausencia de desbordamiento horizontal y errores de ejecución.
- Revisión visual de la primera lección en escritorio y móvil y de una relativa anidada en móvil.
- `npm audit`: comprobación del árbol de dependencias.

La revisión automática comprueba coherencia estructural y regresiones concretas; no reemplaza una revisión lingüística especializada ni sesiones de uso con alumnos. La compatibilidad móvil se ha comprobado con emulación de navegador, no en hardware físico.
