import { choice, group, word, type Lesson } from "./model";
export const foundations: Lesson[] = [
  {
    id: "palabras",
    unit: 0,
    title: "Una palabra cambia todo",
    description: "Cambia las piezas. Descubre qué aporta cada una.",
    summary: [
      "Las palabras aportan cosas distintas a una frase.",
      "Sustantivos, adjetivos y determinantes se relacionan; los adverbios pueden modificar al verbo.",
    ],
    scenes: [
      {
        id: "nombrar",
        title: "Una palabra cambia todo.",
        description:
          "La frase es pequeña. Las posibilidades, muchas. Empieza cambiando de protagonista.",
        instruction: "Toca la palabra verde. Cambia quién duerme.",
        controls: [
          choice(
            "noun",
            "Cambiar protagonista",
            ["gato", "perro", "pájaro"],
            "word",
          ),
        ],
        concept: {
          title: "Sustantivo",
          text: "Un sustantivo permite nombrar seres, objetos, lugares o ideas: gato, mesa, Madrid, alegría. Aquí has cambiado un sustantivo por otro.",
        },
        view: ({ noun }, touched) => ({
          pieces: [
            word("det", "El"),
            word(
              "noun",
              ["gato", "perro", "pájaro"][noun],
              "focus",
              touched ? "Sustantivo" : undefined,
              "noun",
            ),
            word("verb", "duerme"),
            word("dot", "."),
          ],
          observation: touched
            ? "Cambia el animal. La frase sigue funcionando igual."
            : "«Gato» nombra al animal del que hablamos. ¿Qué ocurre si ponemos otra palabra en su lugar?",
        }),
      },
      {
        id: "describir",
        title: "El mismo gato. Otro matiz.",
        description:
          "Algunas palabras nombran; otras añaden una característica a lo que nombramos.",
        instruction: "Toca la palabra verde. Después prueba con varios gatos.",
        controls: [
          choice(
            "adj",
            "Cambiar característica",
            ["curioso", "tranquilo", "pequeño"],
            "word",
          ),
          choice("number", "Cuántos gatos", ["Uno", "Varios"]),
        ],
        concept: {
          title: "Adjetivo y determinante",
          text: "«Curioso» es un adjetivo: caracteriza al gato. «El» es un determinante: acompaña al sustantivo y ayuda a identificarlo. En este grupo, los tres comparten género y número.",
        },
        view: ({ adj, number }) => ({
          pieces: [
            word("det", number ? "Los" : "El", "neutral", "Determinante"),
            word("noun", number ? "gatos" : "gato", "neutral", "Sustantivo"),
            word(
              "adj",
              ["curioso", "tranquilo", "pequeño"][adj] + (number ? "s" : ""),
              "focus",
              "Adjetivo",
              "adj",
            ),
          ],
          observation: number
            ? `«Los gatos ${["curiosos", "tranquilos", "pequeños"][adj]}»: las tres palabras pasan a plural.`
            : "El adjetivo cambia cómo es el gato.",
          note: "Esto es un grupo de palabras, todavía no una oración con verbo.",
        }),
      },
      {
        id: "matizar",
        title: "¿Cómo? ¿Cuándo? ¿Cuánto?",
        description: "También podemos añadir información sobre lo que sucede.",
        instruction: "Toca la palabra verde. ¿Qué cambia en el sueño?",
        controls: [
          choice(
            "adverb",
            "Cambiar matiz",
            ["tranquilamente", "hoy", "mucho"],
            "word",
          ),
        ],
        concept: {
          title: "Adverbio",
          text: "Un adverbio puede modificar a un verbo («duerme mucho»), a un adjetivo («muy tranquilo») o a otro adverbio («muy lejos»). No cambia de género ni de número.",
        },
        view: ({ adverb }) => ({
          pieces: [
            word("det", "El"),
            word("noun", "gato"),
            word("verb", "duerme", "neutral", "Verbo"),
            word(
              "adverb",
              ["tranquilamente", "hoy", "mucho"][adverb],
              "focus",
              "Adverbio",
              "adverb",
            ),
            word("dot", "."),
          ],
          observation: [
            "«Tranquilamente» añade cómo duerme. La palabra modifica al verbo «duerme».",
            "«Hoy» dice cuándo duerme. Es un adverbio de tiempo.",
            "«Mucho» indica cuánto duerme. No describe al gato: modifica «duerme».",
          ][adverb],
        }),
      },
    ],
  },
  {
    id: "grupos",
    unit: 0,
    title: "Palabras que van juntas",
    description: "Haz crecer un grupo sin perder su centro.",
    summary: [
      "Un grupo puede tener una o varias palabras.",
      "El núcleo organiza el grupo; no se identifica simplemente borrando palabras.",
    ],
    scenes: [
      {
        id: "crecer",
        title: "Una pieza puede crecer.",
        description:
          "Mira cómo añadimos detalles sin dejar de hablar del mismo animal.",
        instruction: "Mueve el control para añadir o quitar detalles.",
        controls: [
          choice(
            "size",
            "Detalle del grupo",
            ["El gato", "+ curioso", "+ de mi vecina"],
            "range",
          ),
        ],
        concept: {
          title: "Grupo o sintagma",
          text: "Un sintagma es una unidad organizada alrededor de una palabra central, su núcleo. «El gato curioso de mi vecina» es un sintagma nominal: su núcleo es el sustantivo «gato».",
        },
        view: ({ size }) => ({
          pieces: [
            group(
              "nominal",
              [
                word("det", "El"),
                word("core", "gato", "focus", "Núcleo"),
                ...(size > 0 ? [word("adj", "curioso")] : []),
                ...(size > 1 ? [word("extra", "de mi vecina")] : []),
              ],
              "Un grupo",
            ),
            word("verb", "duerme"),
            word("dot", "."),
          ],
          observation: [
            "«El gato» funciona como una unidad dentro de la frase. «Gato» es su centro.",
            "El grupo crece. «Gato» sigue siendo su núcleo.",
            "Más palabras, una sola pieza: todo el grupo habla del gato.",
          ][size],
        }),
      },
      {
        id: "centro",
        title: "El núcleo da nombre al grupo.",
        description:
          "No todos los grupos se construyen alrededor de un sustantivo.",
        instruction: "Cambia el tipo de grupo y compara su palabra central.",
        controls: [
          choice("type", "Centro del grupo", [
            "Sustantivo",
            "Adjetivo",
            "Adverbio",
          ]),
        ],
        concept: {
          title: "Núcleo",
          text: "El núcleo determina las propiedades básicas del grupo. No es «la única palabra que nunca se puede quitar»: hay elipsis y complementos necesarios. Aquí observamos ejemplos con el núcleo escrito.",
        },
        view: ({ type }) => ({
          pieces: [
            group(
              "group",
              [
                word("modifier", ["un", "muy", "bastante"][type]),
                word(
                  "core",
                  ["libro", "interesante", "lejos"][type],
                  "focus",
                  "Núcleo",
                ),
                ...(type === 0 ? [word("detail", "interesante")] : []),
              ],
              [
                "Grupo nominal · SN",
                "Grupo adjetival · SAdj",
                "Grupo adverbial · SAdv",
              ][type],
            ),
          ],
          observation: [
            "El núcleo es un sustantivo: «libro». Por eso el grupo es nominal.",
            "El núcleo «interesante» es un adjetivo. «Muy» modifica su intensidad.",
            "El núcleo «lejos» es un adverbio. «Bastante» modifica la distancia que expresa.",
          ][type],
        }),
      },
      {
        id: "enlazar",
        title: "Una palabra abre una relación.",
        description: "Las palabras pequeñas también construyen la estructura.",
        instruction:
          "Cambia la preposición. Observa cómo cambia la relación con la casa.",
        controls: [
          choice(
            "prep",
            "Cambiar preposición",
            ["en", "desde", "hacia"],
            "word",
          ),
        ],
        concept: {
          title: "Preposición y grupo preposicional",
          text: "Una preposición relaciona su término con otra parte de la frase. «Hacia la casa» es un grupo preposicional (SPrep). En estos ejemplos, la preposición necesita el grupo que viene después.",
        },
        view: ({ prep }) => ({
          pieces: [
            group(
              "prep-group",
              [
                word(
                  "prep",
                  ["en", "desde", "hacia"][prep],
                  "focus",
                  "Preposición",
                  "prep",
                ),
                group(
                  "term",
                  [word("det", "la"), word("noun", "casa")],
                  "Término",
                ),
              ],
              "Grupo preposicional · SPrep",
            ),
          ],
          observation:
            [
              "«En» sitúa algo en la casa.",
              "«Desde» presenta la casa como punto de origen.",
              "«Hacia» presenta la casa como dirección.",
            ][prep] + " El término «la casa» no cambia.",
        }),
      },
    ],
  },
  {
    id: "verbo",
    unit: 0,
    title: "El verbo pone la frase en marcha",
    description:
      "Explora el tiempo, la persona y los verbos de varias palabras.",
    summary: [
      "El verbo puede expresar acciones, estados o procesos.",
      "Tiempo, persona y número se reflejan en sus formas.",
      "Varias palabras pueden formar un solo núcleo verbal.",
    ],
    scenes: [
      {
        id: "tiempo",
        title: "La misma escena, en otro tiempo.",
        description: "El verbo nos permite situar lo que contamos.",
        instruction: "Viaja del pasado al futuro.",
        controls: [choice("time", "Tiempo", ["Ayer", "Hoy", "Mañana"])],
        concept: {
          title: "Verbo",
          text: "El verbo tiene formas que expresan tiempo, modo, persona y número. No siempre cuenta una acción: «sabe» expresa un estado y «crece», un proceso.",
        },
        view: ({ time }) => ({
          pieces: [
            word("subject", "Ana"),
            word("verb", ["leyó", "lee", "leerá"][time], "verb", "Verbo"),
            word("object", "un libro"),
            word("dot", "."),
          ],
          observation:
            [
              "«Leyó» sitúa la lectura en el pasado.",
              "«Lee» está en presente.",
              "«Leerá» sitúa la lectura en el futuro.",
            ][time] +
            " Cambia el tiempo del verbo; las otras piezas permanecen.",
        }),
      },
      {
        id: "persona",
        title: "Cambia quién habla.",
        description: "El verbo también refleja la persona y el número.",
        instruction: "Prueba las tres personas. Mira cómo se ajusta «leer».",
        controls: [choice("person", "Persona", ["Yo", "Tú", "Nosotros"])],
        concept: {
          title: "Persona y número",
          text: "«Yo» es primera persona del singular; «tú», segunda del singular; «nosotros», primera del plural. Son pronombres personales: permiten referirse a los participantes sin nombrarlos.",
        },
        view: ({ person }) => ({
          pieces: [
            word(
              "person",
              ["Yo", "Tú", "Nosotros"][person],
              "focus",
              "Pronombre",
            ),
            word("verb", ["leo", "lees", "leemos"][person], "verb", "Verbo"),
            word("object", "un libro"),
            word("dot", "."),
          ],
          connection: [
            "1.ª persona · singular",
            "2.ª persona · singular",
            "1.ª persona · plural",
          ][person],
          observation:
            "Cambias quién lee y el verbo se ajusta. Las dos piezas concuerdan.",
        }),
      },
      {
        id: "compuesto",
        title: "Más palabras, un núcleo verbal.",
        description: "Contar palabras no basta para contar núcleos verbales.",
        instruction:
          "Compara una forma simple, una compuesta y una perífrasis.",
        controls: [
          choice("form", "Forma del verbo", [
            "Simple",
            "Compuesta",
            "Perífrasis",
          ]),
        ],
        concept: {
          title: "Núcleo verbal",
          text: "«Lee», «ha leído» y «está leyendo» funcionan aquí como un núcleo verbal. «Ha leído» es un tiempo compuesto; «está leyendo» es una perífrasis que presenta la lectura en desarrollo.",
        },
        view: ({ form }) => ({
          pieces: [
            word("subject", "Ana"),
            group(
              "verbal",
              [word("verb", ["lee", "ha leído", "está leyendo"][form], "verb")],
              "Un núcleo verbal",
              "verb",
            ),
            word("object", "un libro"),
            word("dot", "."),
          ],
          observation:
            [
              "Una palabra: «lee».",
              "Dos palabras: el auxiliar «ha» y el participio «leído».",
              "Dos palabras: «está» y el gerundio «leyendo».",
            ][form] + " Un solo núcleo verbal.",
        }),
      },
    ],
  },
];
