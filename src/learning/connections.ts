import { choice, group, word, type Lesson } from "./model";
export const connections: Lesson[] = [
  {
    id: "voz",
    unit: 3,
    title: "La misma escena, otra perspectiva",
    description: "Convierte la activa en pasiva y sigue a sus participantes.",
    summary: [
      "El CD de esta activa pasa a ser sujeto en la pasiva.",
      "El sujeto no siempre realiza una acción: puede recibirla.",
      "El participio de la pasiva concuerda con su sujeto.",
    ],
    scenes: [
      {
        id: "perspectiva",
        title: "Cambia el foco de la escena.",
        description:
          "Eva pintó una puerta. Podemos contar lo mismo empezando por la puerta.",
        instruction: "Pasa de activa a pasiva. Sigue la pieza «la puerta».",
        controls: [choice("voice", "Voz", ["Activa", "Pasiva"])],
        concept: {
          title: "Voz activa y voz pasiva",
          text: "En esta transformación, el CD de la activa pasa a ser sujeto de la pasiva. El verbo se construye con «ser» y participio. La escena se mantiene, pero cambia cómo organizamos la información.",
        },
        view: ({ voice }) => ({
          pieces: voice
            ? [
                word("door", "La puerta", "subject", "Sujeto"),
                word("verb", "fue pintada", "verb", "Núcleo verbal"),
                word("eva", "por Eva", "link", "C. agente"),
                word("dot", "."),
              ]
            : [
                word("eva", "Eva", "subject", "Sujeto"),
                word("verb", "pintó", "verb", "Verbo"),
                word("door", "la puerta", "direct", "CD"),
                word("dot", "."),
              ],
          observation: voice
            ? "La puerta pasa de CD a sujeto. Cambia su función, no lo ocurrido."
            : "Eva pinta: es el sujeto. La puerta es el CD.",
        }),
      },
      {
        id: "paciente",
        title: "Ser sujeto no es hacer la acción.",
        description:
          "Comprueba la concordancia con un sujeto que recibe la acción.",
        instruction:
          "Cambia el número de puertas. Mira el auxiliar y el participio.",
        controls: [
          choice("number", "Puertas", ["Una", "Varias"]),
          choice("agent", "Quién pintó", ["Mostrar", "Omitir"]),
        ],
        concept: {
          title: "Sujeto paciente y complemento agente",
          text: "«Las puertas» es un sujeto paciente: no pinta, es pintado. «Fueron» concuerda con él en número y «pintadas», en género y número. El complemento agente «por Eva» puede omitirse.",
        },
        view: ({ number, agent }) => ({
          pieces: [
            word(
              "door",
              number ? "Las puertas" : "La puerta",
              "subject",
              "Sujeto paciente",
            ),
            word(
              "verb",
              number ? "fueron pintadas" : "fue pintada",
              "verb",
              "Núcleo verbal",
            ),
            ...(!agent ? [word("agent", "por Eva", "link", "C. agente")] : []),
            word("dot", "."),
          ],
          observation: number
            ? "El sujeto, el auxiliar y el participio pasan a plural."
            : "La puerta es el sujeto, aunque recibe la acción de pintar.",
          note: agent
            ? "Podemos contar lo ocurrido sin decir quién pintó."
            : undefined,
        }),
      },
      {
        id: "limites",
        title: "Una prueba útil, con límites.",
        description:
          "La pasiva ayuda a ver funciones, pero no todos los verbos se comportan igual.",
        instruction: "Compara una acción con un estado.",
        controls: [
          choice("example", "Construcción", [
            "Eva pintó la puerta",
            "Ana tiene un libro",
          ]),
          choice("voice", "Perspectiva", ["Activa", "Intentar pasiva"]),
        ],
        concept: {
          title: "Límites de la pasivización",
          text: "Con muchos verbos transitivos podemos formar pasivas, pero no siempre suenan naturales o conservan el sentido. La dificultad para formar una pasiva no basta para negar que haya un CD.",
        },
        view: ({ example, voice }) => ({
          pieces: example
            ? [
                word("subject", "Ana", "subject", "Sujeto"),
                word("verb", "tiene", "verb", "Verbo"),
                word("object", "un libro", "direct", "CD"),
                word("dot", "."),
              ]
            : voice
              ? [
                  word("object", "La puerta", "subject", "Sujeto"),
                  word("verb", "fue pintada", "verb", "Núcleo verbal"),
                  word("agent", "por Eva", "link", "C. agente"),
                  word("dot", "."),
                ]
              : [
                  word("subject", "Eva", "subject", "Sujeto"),
                  word("verb", "pintó", "verb", "Verbo"),
                  word("object", "la puerta", "direct", "CD"),
                  word("dot", "."),
                ],
          observation:
            example && voice
              ? "Con «tener», esta pasiva no es natural. «Un libro» sigue siendo CD: «Ana lo tiene»."
              : example
                ? "«Tiene» expresa posesión. «Un libro» es su CD."
                : voice
                  ? "Aquí la transformación es natural: la puerta pasa de CD a sujeto."
                  : "«Pintar» permite ver con claridad el cambio de activa a pasiva.",
          note:
            example && voice
              ? "Esta transformación no es natural con el sentido de posesión."
              : undefined,
        }),
      },
    ],
  },
  {
    id: "coordinacion",
    unit: 3,
    title: "Dos ideas que se conectan",
    description: "Une oraciones y descubre qué aporta el enlace.",
    summary: [
      "La coordinación une elementos del mismo nivel.",
      "Las conjunciones pueden sumar, ofrecer alternativas o introducir contrastes.",
      "Dos palabras verbales no implican dos oraciones.",
    ],
    scenes: [
      {
        id: "enlaces",
        title: "Una palabra entre dos ideas.",
        description:
          "El enlace nos dice cómo debemos relacionar lo que leemos.",
        instruction:
          "Cambia el enlace. Observa la relación entre las oraciones.",
        controls: [
          choice("link", "Relación", [
            "Sumar · y",
            "Elegir · o",
            "Contrastar · pero",
          ]),
        ],
        concept: {
          title: "Coordinación y conjunción",
          text: "Una conjunción como «y», «o» o «pero» puede enlazar dos oraciones del mismo nivel. Aquí ninguna de ellas ocupa una función dentro de la otra. Las conjunciones también pueden unir palabras o grupos.",
        },
        view: ({ link }) => ({
          pieces: [
            group(
              "first",
              [
                word("ana", "Ana", "subject", "Sujeto"),
                word("v1", "lee", "verb", "Verbo"),
              ],
              "Oración 1",
            ),
            ...(link === 2 ? [word("comma", ",")] : []),
            word("link", ["y", "o", "pero"][link], "link", "Conjunción"),
            group(
              "second",
              [
                word("eva", "Eva", "subject", "Sujeto"),
                word(
                  "v2",
                  link === 2 ? "descansa" : "escribe",
                  "verb",
                  "Verbo",
                ),
              ],
              "Oración 2",
            ),
            word("dot", "."),
          ],
          observation: [
            "«Y» suma dos informaciones: Ana lee; Eva escribe.",
            "«O» presenta alternativas: ocurre una cosa o la otra, según el contexto.",
            "«Pero» presenta la segunda idea como un contraste con la primera.",
          ][link],
        }),
      },
      {
        id: "contar",
        title: "Cuenta núcleos, no palabras.",
        description: "Recupera lo que aprendiste sobre las formas compuestas.",
        instruction: "Compara una oración simple con dos coordinadas.",
        controls: [
          choice("example", "Construcción", ["Ha leído", "Lee y escribe"]),
        ],
        concept: {
          title: "Oración simple y coordinación",
          text: "«Ha leído» es una forma verbal compuesta, no dos núcleos. En «Ana lee y Eva escribe» hay dos oraciones coordinadas, cada una con su sujeto y su núcleo verbal.",
        },
        view: ({ example }) => ({
          pieces: example
            ? [
                group(
                  "first",
                  [word("ana", "Ana", "subject"), word("v1", "lee", "verb")],
                  "Una oración",
                ),
                word("and", "y", "link"),
                group(
                  "second",
                  [
                    word("eva", "Eva", "subject"),
                    word("v2", "escribe", "verb"),
                  ],
                  "Otra oración",
                ),
                word("dot", "."),
              ]
            : [
                word("subject", "Ana", "subject", "Sujeto"),
                word("verb", "ha leído", "verb", "Un núcleo verbal"),
                word("object", "un libro", "direct", "CD"),
                word("dot", "."),
              ],
          observation: example
            ? "«Lee» y «escribe» son núcleos de dos oraciones. «Y» las coordina."
            : "«Ha» y «leído» funcionan juntas como un núcleo verbal. Esta oración es simple.",
        }),
      },
    ],
  },
  {
    id: "subordinacion",
    unit: 3,
    title: "Una oración dentro de otra",
    description: "Abre una pieza y encuentra una nueva estructura dentro.",
    summary: [
      "Una subordinada se integra en una estructura mayor.",
      "Puede ocupar el lugar de un grupo nominal, modificar a un nombre o expresar una circunstancia.",
      "La función de la pieza grande y las funciones de dentro son niveles distintos.",
    ],
    scenes: [
      {
        id: "sustantiva",
        title: "Abre la pieza. Hay otra oración.",
        description:
          "Lo que sabe Ana puede ocupar una palabra o una oración entera.",
        instruction: "Expande «eso» y después prueba la sustitución por «lo».",
        controls: [
          choice("shape", "Lo que sabe Ana", ["eso", "que Eva llegó", "lo"]),
        ],
        concept: {
          title: "Subordinada sustantiva",
          text: "«Que Eva llegó» ocupa aquí la función de CD de «sabe», como «eso» o «lo». Dentro de esa subordinada, «Eva» es sujeto y «llegó» es verbo. «Que» es una conjunción que introduce la subordinada.",
        },
        view: ({ shape }) => ({
          pieces: [
            word("ana", "Ana", "subject", "Sujeto"),
            ...(shape === 2 ? [word("object", "lo", "direct", "CD")] : []),
            word("main-verb", "sabe", "verb", "Verbo principal"),
            ...(shape === 0
              ? [word("object", "eso", "direct", "CD")]
              : shape === 1
                ? [
                    group(
                      "object",
                      [
                        word("que", "que", "link", "Conjunción"),
                        word("eva", "Eva", "subject", "Sujeto"),
                        word("inner-verb", "llegó", "verb", "Verbo"),
                      ],
                      "Todo este grupo es CD",
                      "direct",
                    ),
                  ]
                : []),
            word("dot", "."),
          ],
          observation:
            shape === 1
              ? "«Que Eva llegó» es CD de «sabe» y tiene su propio sujeto y verbo."
              : shape === 2
                ? "«Ana lo sabe»: el pronombre representa todo lo sabido, incluida una oración entera."
                : "«Eso» es el CD: lo que Ana sabe.",
        }),
      },
      {
        id: "relativa",
        title: "Una oración que describe a un nombre.",
        description: "Una descripción no tiene que ser solo un adjetivo.",
        instruction:
          "Cambia la característica breve por una oración de relativo.",
        controls: [
          choice("detail", "Descripción del gato", ["negro", "que vive aquí"]),
        ],
        concept: {
          title: "Subordinada de relativo",
          text: "«Que vive aquí» modifica al sustantivo «gato». El sujeto de la oración principal es todo «el gato que vive aquí». Dentro de la relativa, «que» es un pronombre relativo referido al gato y funciona como sujeto de «vive».",
        },
        view: ({ detail }) => ({
          pieces: [
            group(
              "subject",
              [
                word("det", "El"),
                word("cat", "gato", "focus", "Núcleo"),
                ...(detail
                  ? [
                      group(
                        "relative",
                        [
                          word("que", "que", "subject", "Relativo · sujeto"),
                          word("lives", "vive", "verb", "Verbo"),
                          word("here", "aquí", "circumstance", "CC de lugar"),
                        ],
                        "Modifica a «gato»",
                        "link",
                      ),
                    ]
                  : [word("adj", "negro", "neutral", "Adjetivo")]),
              ],
              "Sujeto completo",
              "subject",
            ),
            word("main-verb", "duerme", "verb", "Verbo principal"),
            word("dot", "."),
          ],
          observation: detail
            ? "La oración describe al gato. Está dentro del sujeto de «duerme»."
            : "«Negro» describe al gato con una sola palabra.",
        }),
      },
      {
        id: "temporal",
        title: "Una oración también puede situar otra.",
        description: "Ahora una pieza con verbo nos dice cuándo lee Ana.",
        instruction:
          "Alterna una expresión breve y una oración que indica tiempo.",
        controls: [
          choice("time", "Cuándo lee", ["por la tarde", "cuando llueve"]),
        ],
        concept: {
          title: "Una subordinada con valor temporal",
          text: "«Cuando llueve» sitúa temporalmente la lectura. En la enseñanza tradicional se llama subordinada adverbial temporal; otros análisis la describen como una relativa libre introducida por el adverbio «cuando». Aquí nos centramos en su relación de tiempo.",
        },
        view: ({ time }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            word("verb", "lee", "verb", "Verbo principal"),
            ...(time
              ? [
                  group(
                    "time",
                    [
                      word("when", "cuando", "link", "Enlace temporal"),
                      word("rains", "llueve", "verb", "Verbo impersonal"),
                    ],
                    "Sitúa la lectura en el tiempo",
                    "circumstance",
                  ),
                ]
              : [word("time", "por la tarde", "circumstance", "CC de tiempo")]),
            word("dot", "."),
          ],
          observation: time
            ? "«Cuando llueve» dice cuándo lee Ana. Dentro, «llueve» es impersonal."
            : "«Por la tarde» sitúa la lectura en el tiempo.",
        }),
      },
    ],
  },
];
