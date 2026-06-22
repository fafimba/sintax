# Sintax

App educativa estilo [Brilliant](https://brilliant.org) para aprender **sintaxis castellana**: minimalista, visual y aprender-haciendo. La tesis es que el análisis sintáctico es "matemático" (cajas anidadas, núcleos, funciones, recursividad) y por tanto se puede manipular con el dedo.

## Estado: F0 — el gesto insignia

Primer prototipo, centrado en validar **una** mecánica: la **sustitución pronominal animada** para identificar el complemento directo.

- Arrastra la ficha-pronombre (`lo` / `la`) sobre un grupo de la oración.
- Si es el CD → el grupo se tiñe de verde (función) con su etiqueta `CD`, colapsa y el pronombre aparece en posición preverbal (`Ana lo compró`). La función conserva el color aunque cambie la forma.
- Si no lo es → la frase se sacude, marca el error en rojo y se reinicia.

Sistema de color en **dos ejes**: relleno = función, borde/etiqueta = categoría. Las cajas nacen neutras y se tiñen al descubrir su función (el color es la recompensa, no la pista).

Lo que F0 deja fuera a propósito: lecciones, progreso real, login, árbol/subordinación. Solo el gesto.

## Stack

Vite + React + TypeScript + [Framer Motion](https://www.framer.com/motion/).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de producción
```

## Estructura

```
src/
  data/sentences.ts   Contenido como DATOS (frase = constituyentes + CD + pronombre)
  theme.ts            Tokens de color por función / categoría
  types.ts            Modelo Sentence / Segment
  components/
    Caja.tsx          Primitiva: un constituyente como caja (neutra / CD / error)
    PronounChip.tsx   Primitiva: la ficha-pronombre arrastrable (la "sonda")
    SentenceStage.tsx Máquina de estados del gesto (idle → revealing → done / error)
  App.tsx             Barra de progreso + recorrido por las frases
```
