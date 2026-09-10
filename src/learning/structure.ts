import { choice, group, word, type Lesson } from "./model";
export const structure: Lesson[] = [
  {
    id: "concordancia",
    unit: 1,
    title: "Dos piezas que se entienden",
    description: "Encuentra el sujeto observando al verbo.",
    summary: [
      "El sujeto concuerda con el verbo en persona y número.",
      "El predicado incluye el verbo y los complementos que lo acompañan.",
      "Cambiar otro grupo no obliga al verbo a cambiar.",
    ],
    scenes: [
      {
        id: "numero",
        title: "Cambia uno. Se mueven dos.",
        description:
          "Hay una conexión entre el grupo del animal y el verbo. Hazla visible.",
        instruction: "Pasa de uno a varios y vuelve. Observa las dos piezas.",
        controls: [choice("number", "Número de gatos", ["Uno", "Varios"])],
        concept: {
          title: "Sujeto y concordancia",
          text: "El sujeto concuerda con el verbo en persona y número. En estos ejemplos, «el gato» y «los gatos» son sujetos. La concordancia es una pista más fiable que preguntar quién realiza la acción.",
        },
        view: ({ number }) => ({
          pieces: [
            word(
              "subject",
              number ? "Los gatos" : "El gato",
              "subject",
              "Sujeto",
            ),
            word("verb", number ? "duermen" : "duerme", "verb", "Verbo"),
            word("dot", "."),
          ],
          connection: number ? "plural ↔ plural" : "singular ↔ singular",
          observation: number
            ? "«Los gatos» pide «duermen». El verbo cambia junto al sujeto: eso es concordar."
            : "«El gato» y «duerme»: las dos piezas están en singular.",
        }),
      },
      {
        id: "contraste",
        title: "No todos los cambios llegan al verbo.",
        description:
          "Ahora hay dos grupos que pueden pasar a plural. Compáralos.",
        instruction: "Cambia los gatos y los pájaros por separado.",
        controls: [
          choice("subject", "Gatos", ["Uno", "Varios"]),
          choice("object", "Pájaros", ["Uno", "Varios"]),
        ],
        concept: {
          title: "Una prueba de concordancia",
          text: "No basta con que dos palabras estén en singular. Al variar el número del sujeto, el verbo se ajusta. «A los pájaros» acompaña al verbo, pero no determina su número.",
        },
        view: ({ subject, object }) => ({
          pieces: [
            word(
              "subject",
              subject ? "Los gatos" : "El gato",
              "subject",
              "Sujeto",
            ),
            word("verb", subject ? "miran" : "mira", "verb", "Verbo"),
            word(
              "object",
              object ? "a los pájaros" : "al pájaro",
              "neutral",
              "Otro grupo",
            ),
            word("dot", "."),
          ],
          observation: object
            ? `Cambian los pájaros; el verbo sigue en ${subject ? "plural por «los gatos»" : "singular por «el gato»"}.`
            : `«${subject ? "Miran" : "Mira"}» concuerda con los gatos, no con los pájaros.`,
        }),
      },
      {
        id: "predicado",
        title: "El verbo tiene compañía.",
        description:
          "Mira qué se dice del sujeto. Puede ocupar una palabra o varias.",
        instruction:
          "Haz crecer el predicado. El sujeto sigue siendo el mismo.",
        controls: [
          choice(
            "detail",
            "Detalle del predicado",
            ["duerme", "+ tranquilamente", "+ en el sofá"],
            "range",
          ),
        ],
        concept: {
          title: "Predicado",
          text: "En esta oración, el predicado es lo que se dice del sujeto. Su núcleo es el verbo «duerme». Los grupos que añadimos al verbo también quedan dentro del predicado, que es un sintagma verbal (SV).",
        },
        view: ({ detail }) => ({
          pieces: [
            word("subject", "El gato", "subject", "Sujeto"),
            group(
              "predicate",
              [
                word("verb", "duerme", "verb", "Núcleo"),
                ...(detail > 0 ? [word("manner", "tranquilamente")] : []),
                ...(detail > 1 ? [word("place", "en el sofá")] : []),
              ],
              "Predicado · grupo verbal",
              "verb",
            ),
            word("dot", "."),
          ],
          observation: detail
            ? "El predicado incluye el verbo y los detalles que lo acompañan."
            : "Aquí, el verbo «duerme» forma todo el predicado.",
        }),
      },
    ],
  },
  {
    id: "sujeto",
    unit: 1,
    title: "El sujeto no siempre está delante",
    description: "Muévelo, ocúltalo y descubre cuándo no existe.",
    summary: [
      "El orden no determina qué grupo es el sujeto.",
      "Un sujeto tácito se recupera por la forma verbal y el contexto.",
      "Las oraciones impersonales no tienen sujeto.",
    ],
    scenes: [
      {
        id: "orden",
        title: "Otro orden. La misma conexión.",
        description: "Las frases no tienen por qué empezar por el sujeto.",
        instruction: "Cambia el orden y después el número de trenes.",
        controls: [
          choice("order", "Orden", ["Sujeto delante", "Sujeto detrás"]),
          choice("number", "Trenes", ["Uno", "Varios"]),
        ],
        concept: {
          title: "Sujeto pospuesto",
          text: "El sujeto puede ir después del verbo. En «Llegan los trenes», «los trenes» sigue siendo el sujeto: concuerda con «llegan». El orden también puede cambiar qué información destacamos.",
        },
        view: ({ order, number }) => {
          const s = word(
            "subject",
            number
              ? order
                ? "los trenes"
                : "Los trenes"
              : order
                ? "el tren"
                : "El tren",
            "subject",
            "Sujeto",
          );
          const v = word(
            "verb",
            (order ? "L" : "l") + (number ? "legan" : "lega"),
            "verb",
            "Verbo",
          );
          return {
            pieces: [...(order ? [v, s] : [s, v]), word("dot", ".")],
            observation: order
              ? "El sujeto cambia de sitio. Su conexión con el verbo se mantiene."
              : "El sujeto está delante. El verbo concuerda con él.",
          };
        },
      },
      {
        id: "tacito",
        title: "Puede estar sin escribirse.",
        description: "En español no siempre necesitamos decir el sujeto.",
        instruction: "Oculta el pronombre. Después cambia la persona.",
        controls: [
          choice("visible", "Sujeto", ["Escrito", "Sin escribir"]),
          choice("person", "Quién habla", ["Yo", "Nosotros"]),
        ],
        concept: {
          title: "Sujeto tácito u omitido",
          text: "«Leo» permite recuperar «yo» y «leemos», «nosotros» o «nosotras». El sujeto no está escrito, pero está presente gramaticalmente. Con «lee», necesitamos contexto para saber a quién se refiere.",
        },
        view: ({ visible, person }) => ({
          pieces: [
            ...(!visible
              ? [
                  word(
                    "subject",
                    person ? "Nosotros" : "Yo",
                    "subject",
                    "Sujeto expreso",
                  ),
                ]
              : []),
            word(
              "verb",
              (visible ? "L" : "l") + (person ? "eemos" : "eo"),
              "verb",
              "Verbo",
            ),
            word("object", "un libro"),
            word("dot", "."),
          ],
          connection: visible
            ? `Sujeto tácito: ${person ? "nosotros / nosotras" : "yo"}`
            : undefined,
          observation: visible
            ? `«${person ? "Leemos" : "Leo"}» permite recuperar ${person ? "«nosotros»" : "«yo»"}. El sujeto sigue ahí, sin escribirse.`
            : "El pronombre hace visible quién lee.",
        }),
      },
      {
        id: "impersonal",
        title: "A veces no hay sujeto.",
        description:
          "Que no se vea un sujeto no significa siempre que esté oculto.",
        instruction: "Compara un sujeto tácito con dos oraciones impersonales.",
        controls: [
          choice("example", "Compara", ["Leemos", "Llueve", "Hay libros"]),
        ],
        concept: {
          title: "Oración impersonal",
          text: "Las impersonales carecen de sujeto. «Llueve», en su sentido meteorológico, y «hay libros» son ejemplos. «Libros» no es sujeto de «hay»; el haber existencial se mantiene en singular: «había libros».",
        },
        view: ({ example }) => ({
          pieces:
            example === 0
              ? [word("verb", "Leemos", "verb", "Verbo"), word("dot", ".")]
              : example === 1
                ? [word("verb", "Llueve", "verb", "Verbo"), word("dot", ".")]
                : [
                    word("verb", "Hay", "verb", "Verbo"),
                    word("books", "libros"),
                    word("dot", "."),
                  ],
          connection:
            example === 0
              ? "Sujeto tácito: nosotros / nosotras"
              : "Oración sin sujeto",
          observation: [
            "En «leemos» hay un sujeto tácito: nosotros o nosotras. La forma verbal da la pista.",
            "En «llueve» no hay nadie oculto que llueva. Es una oración impersonal.",
            "En «hay libros», «libros» no hace concordar al verbo. Decimos «hay un libro» y «hay libros».",
          ][example],
        }),
      },
    ],
  },
  {
    id: "forma-funcion",
    unit: 1,
    title: "Qué es y qué hace",
    description: "Separa la clase de un grupo del papel que cumple.",
    summary: [
      "La categoría describe cómo se forma una pieza.",
      "La función describe su relación con otras piezas.",
      "Un mismo grupo puede cumplir distintas funciones.",
    ],
    scenes: [
      {
        id: "papel",
        title: "La misma pieza, otro papel.",
        description: "Sigue a «el libro» en estas dos oraciones.",
        instruction:
          "Cambia de frase. El tipo de grupo permanece; su función cambia.",
        controls: [
          choice("example", "Frase", ["El libro cae", "Ana lee el libro"]),
        ],
        concept: {
          title: "Categoría y función",
          text: "«El libro» es un grupo nominal en ambas frases: eso es su categoría. En una es el sujeto; en otra completa al verbo «lee». Esa relación es su función. En la próxima lección la llamaremos complemento directo.",
        },
        view: ({ example }) => {
          const book = {
            ...word(
              "book",
              example ? "el libro" : "El libro",
              example ? "direct" : "subject",
              example ? "Completa al verbo" : "Sujeto",
            ),
            badge: "Grupo nominal · SN",
          };
          return {
            pieces: example
              ? [
                  word("ana", "Ana", "subject", "Sujeto"),
                  word("verb", "lee", "verb", "Verbo"),
                  book,
                  word("dot", "."),
                ]
              : [book, word("verb", "cae", "verb", "Verbo"), word("dot", ".")],
            observation: example
              ? "El libro sigue siendo un grupo nominal. Ahora el sujeto es Ana."
              : "«El libro» es un grupo nominal y aquí funciona como sujeto: «los libros caen».",
          };
        },
      },
      {
        id: "niveles",
        title: "Acércate. Hay piezas dentro.",
        description:
          "Podemos mirar una oración completa o la estructura interna de sus grupos.",
        instruction: "Abre el grupo para ver de qué está hecho.",
        controls: [choice("zoom", "Nivel de detalle", ["Grupos", "Palabras"])],
        concept: {
          title: "Niveles de análisis",
          text: "«Mi gata negra» tiene la función de sujeto. Dentro del grupo, «mi» es un determinante, «gata» es el sustantivo que actúa como núcleo y «negra» es un adjetivo que lo modifica. Son niveles distintos de la misma estructura.",
        },
        view: ({ zoom }) => ({
          pieces: [
            group(
              "subject",
              zoom
                ? [
                    word("det", "Mi", "neutral", "Determinante"),
                    word("noun", "gata", "focus", "Sustantivo · núcleo"),
                    word("adj", "negra", "neutral", "Adjetivo"),
                  ]
                : [word("whole", "Mi gata negra", "subject")],
              "Sujeto · grupo nominal",
              "subject",
            ),
            group(
              "predicate",
              [word("verb", "duerme", "verb")],
              "Predicado",
              "verb",
            ),
            word("dot", "."),
          ],
          observation: zoom
            ? "«Gata» es un sustantivo y funciona como núcleo. Las tres palabras forman el sujeto."
            : "Sujeto y predicado: dos grupos con sus propias piezas dentro.",
        }),
      },
    ],
  },
];
