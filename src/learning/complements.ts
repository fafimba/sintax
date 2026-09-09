import { choice, word, type Lesson } from "./model";
export const complements: Lesson[] = [
  {
    id: "directo",
    unit: 2,
    title: "Una pieza que cabe en «lo»",
    description: "Transforma el complemento directo en un pronombre.",
    summary: [
      "El complemento directo acompaña a un verbo transitivo.",
      "En estos ejemplos se sustituye por lo, la, los o las.",
      "La preposición «a» no convierte automáticamente un grupo en indirecto.",
    ],
    scenes: [
      {
        id: "sustituir",
        title: "Menos palabras. La misma función.",
        description: "Podemos referirnos al libro sin volver a nombrarlo.",
        instruction: "Sustituye la pieza y observa dónde aparece el pronombre.",
        controls: [choice("replace", "Forma de la pieza", ["un libro", "lo"])],
        concept: {
          title: "Complemento directo · CD",
          text: "En «Ana compró un libro», «un libro» es complemento directo. «Lo» ocupa su función. La sustitución ayuda a reconocerlo; preguntar «¿qué?» por sí solo no demuestra que un grupo sea CD.",
        },
        view: ({ replace }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            ...(replace ? [word("object", "lo", "direct", "CD")] : []),
            word("verb", "compró", "verb", "Verbo"),
            ...(!replace ? [word("object", "un libro", "direct", "CD")] : []),
            word("dot", "."),
          ],
          observation: replace
            ? "«Un libro» se convierte en «lo», que va delante del verbo conjugado. Cambia la forma y la posición; se conserva la función."
            : "La pieza verde completa «compró». Prueba a sustituirla por «lo».",
        }),
      },
      {
        id: "formas",
        title: "El pronombre se ajusta a la pieza.",
        description:
          "Cambia el objeto y comprueba qué pronombre lo representa.",
        instruction:
          "Prueba objetos distintos y alterna la frase completa con el pronombre.",
        controls: [
          choice("object", "Objeto", [
            "el libro",
            "la carta",
            "los libros",
            "las cartas",
          ]),
          choice("replace", "Mostrar", ["Grupo completo", "Pronombre"]),
        ],
        concept: {
          title: "Lo, la, los, las",
          text: "Los pronombres de CD de tercera persona distinguen género y número. Aquí usamos el patrón general lo/la/los/las. Existe leísmo de persona masculino singular admitido en ciertos usos; por eso no conviene convertir la sustitución en una regla ciega.",
        },
        view: ({ object, replace }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            ...(replace
              ? [
                  word(
                    "object",
                    ["lo", "la", "los", "las"][object],
                    "direct",
                    "CD",
                  ),
                ]
              : []),
            word("verb", "leyó", "verb", "Verbo"),
            ...(!replace
              ? [
                  word(
                    "object",
                    ["el libro", "la carta", "los libros", "las cartas"][
                      object
                    ],
                    "direct",
                    "CD",
                  ),
                ]
              : []),
            word("dot", "."),
          ],
          connection: `${["el libro", "la carta", "los libros", "las cartas"][object]} ↔ ${["lo", "la", "los", "las"][object]}`,
          observation: `El pronombre «${["lo", "la", "los", "las"][object]}» corresponde a «${["el libro", "la carta", "los libros", "las cartas"][object]}». El sujeto y el verbo no cambian al sustituir el CD.`,
        }),
      },
      {
        id: "personal",
        title: "Una persona también puede ser CD.",
        description:
          "Mira la «a» de «a Marta». No basta para identificar la función.",
        instruction: "Sustituye «a Marta» y comprueba qué pronombre aparece.",
        controls: [choice("replace", "Forma de la pieza", ["a Marta", "la"])],
        concept: {
          title: "La «a» personal",
          text: "Muchos complementos directos de persona llevan la preposición «a»: «vi a Marta». Siguen siendo directos. «¿A quién?» puede preguntar tanto por un CD como por un CI; hay que observar la construcción.",
        },
        view: ({ replace }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            ...(replace ? [word("object", "la", "direct", "CD")] : []),
            word("verb", "vio", "verb", "Verbo"),
            ...(!replace ? [word("object", "a Marta", "direct", "CD")] : []),
            word("dot", "."),
          ],
          observation: replace
            ? "«Ana la vio». La persona representada por «la» es complemento directo, aunque antes apareciera con «a»."
            : "«A Marta» es la persona vista. Observa su sustitución antes de decidir su función.",
        }),
      },
    ],
  },
  {
    id: "indirecto",
    unit: 2,
    title: "Lo que se da y a quién llega",
    description: "Compara el directo y el indirecto en la misma frase.",
    summary: [
      "En una entrega, el CD nombra lo entregado y el CI, al destinatario.",
      "Le y les representan el CI de tercera persona.",
      "Delante de lo, la, los o las, le y les se convierten en se.",
    ],
    scenes: [
      {
        id: "destinatario",
        title: "Dos complementos, dos papeles.",
        description:
          "Una carta y su destinataria participan de maneras distintas.",
        instruction:
          "Sustituye cada complemento por separado o los dos a la vez.",
        controls: [
          choice("direct", "La carta · CD", ["Completo", "Pronombre"]),
          choice("indirect", "A Marta · CI", ["Completo", "Pronombre"]),
        ],
        concept: {
          title: "Complemento indirecto · CI",
          text: "En esta entrega, «a Marta» es el CI y puede representarse con «le». El CI no siempre es un destinatario: también puede señalar a quien experimenta algo, como el «me» de «me gusta».",
        },
        view: ({ direct, indirect }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            ...(indirect
              ? [word("indirect", direct ? "se" : "le", "indirect", "CI")]
              : []),
            ...(direct ? [word("direct", "la", "direct", "CD")] : []),
            word("verb", "dio", "verb", "Verbo"),
            ...(!direct ? [word("direct", "la carta", "direct", "CD")] : []),
            ...(!indirect
              ? [word("indirect", "a Marta", "indirect", "CI")]
              : []),
            word("dot", "."),
          ],
          observation:
            direct && indirect
              ? "«Ana se la dio». «Se» representa a Marta y «la», a la carta. Aquí «le» se transforma en «se» delante de «la»."
              : indirect
                ? "«Ana le dio la carta». «Le» representa a Marta. La carta sigue siendo el CD."
                : direct
                  ? "«Ana la dio a Marta». «La» representa a la carta. «A Marta» sigue siendo el CI."
                  : "La carta es lo que Ana dio: CD. Marta es su destinataria: CI. Compara las sustituciones.",
        }),
      },
      {
        id: "les",
        title: "Importa cuántas personas reciben.",
        description:
          "El pronombre del indirecto distingue singular y plural, pero no género.",
        instruction: "Cambia a los destinatarios y observa le o les.",
        controls: [
          choice("who", "Destinatario", ["Marta", "Pablo", "Marta y Pablo"]),
          choice("replace", "Mostrar", ["Grupo completo", "Pronombre"]),
        ],
        concept: {
          title: "Le y les",
          text: "«Le» puede referirse a él o a ella; «les», a ellos o a ellas. La diferencia es de número. Un grupo con «para» no es automáticamente CI: en el patrón que exploramos, el CI se introduce con «a».",
        },
        view: ({ who, replace }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            ...(replace
              ? [word("indirect", who === 2 ? "les" : "le", "indirect", "CI")]
              : []),
            word("verb", "envió", "verb", "Verbo"),
            word("direct", "una carta", "direct", "CD"),
            ...(!replace
              ? [
                  word(
                    "indirect",
                    "a " + ["Marta", "Pablo", "Marta y Pablo"][who],
                    "indirect",
                    "CI",
                  ),
                ]
              : []),
            word("dot", "."),
          ],
          observation:
            who === 2
              ? "Marta y Pablo son dos destinatarios: «les». «Ana» sigue en singular y el verbo no cambia."
              : `Para ${["Marta", "Pablo"][who]} usamos «le». El pronombre no cambia según el género del destinatario.`,
        }),
      },
      {
        id: "gustar",
        title: "¿Quién siente? ¿Qué concuerda?",
        description: "Ahora ya puedes entender una frase que suele despistar.",
        instruction:
          "Cambia quién siente el gusto y después cuántos libros gustan.",
        controls: [
          choice("person", "A quién", ["A mí", "A ti"]),
          choice("number", "Libros", ["Uno", "Varios"]),
        ],
        concept: {
          title: "Sujeto y persona que experimenta",
          text: "En «Me gustan los libros», «los libros» es el sujeto porque concuerda con «gustan». «Me» es el CI y expresa quién experimenta el gusto. La persona que siente algo no tiene por qué ser el sujeto.",
        },
        view: ({ person, number }) => ({
          pieces: [
            word("indirect", person ? "Te" : "Me", "indirect", "CI"),
            word("verb", number ? "gustan" : "gusta", "verb", "Verbo"),
            word(
              "subject",
              number ? "los libros" : "el libro",
              "subject",
              "Sujeto",
            ),
            word("dot", "."),
          ],
          connection: number ? "gustan ↔ los libros" : "gusta ↔ el libro",
          observation:
            "El número del verbo depende de los libros, no de quien siente el gusto. Cambiar «me» por «te» no cambia «gusta» o «gustan».",
        }),
      },
    ],
  },
  {
    id: "atributo",
    unit: 2,
    title: "Decir cómo es o cómo está",
    description:
      "Explora una propiedad del sujeto y cómo se conecta con el verbo.",
    summary: [
      "Con ser, estar o parecer, el atributo puede expresar una propiedad del sujeto.",
      "El «lo» que sustituye al atributo es invariable.",
      "Un adjetivo con un verbo pleno puede funcionar como predicativo.",
    ],
    scenes: [
      {
        id: "propiedad",
        title: "Un verbo que enlaza.",
        description: "Aquí no contamos qué hace Ana: decimos cómo está.",
        instruction: "Cambia la propiedad. Después pasa a varios sujetos.",
        controls: [
          choice(
            "quality",
            "Cambiar propiedad",
            ["contenta", "cansada", "tranquila"],
            "word",
          ),
          choice("number", "Sujeto", ["Ana", "Ana y Eva"]),
        ],
        concept: {
          title: "Atributo",
          text: "«Contenta» funciona como atributo con el verbo copulativo «está». Atribuye una propiedad al sujeto. No tiene que ser siempre un adjetivo: en «Ana es médica», el atributo es «médica», un sustantivo.",
        },
        view: ({ quality, number }) => ({
          pieces: [
            word("subject", number ? "Ana y Eva" : "Ana", "subject", "Sujeto"),
            word("verb", number ? "están" : "está", "verb", "Verbo copulativo"),
            word(
              "attribute",
              ["contenta", "cansada", "tranquila"][quality] +
                (number ? "s" : ""),
              "attribute",
              "Atributo",
              "quality",
            ),
            word("dot", "."),
          ],
          connection: "La propiedad se refiere al sujeto",
          observation: number
            ? "También se ajusta el adjetivo: «contentas», «cansadas» o «tranquilas». Describe a Ana y Eva, en plural."
            : "La pieza rosa describe a Ana. «Está» enlaza el sujeto con esa propiedad.",
        }),
      },
      {
        id: "lo",
        title: "Este «lo» no cuenta objetos.",
        description:
          "Ya conoces «lo» como CD. También puede sustituir a un atributo.",
        instruction: "Cambia el número y sustituye la propiedad.",
        controls: [
          choice("number", "Sujeto", ["La casa", "Las casas"]),
          choice("replace", "Atributo", ["Escrito", "Con «lo»"]),
        ],
        concept: {
          title: "El «lo» del atributo",
          text: "En «Las casas lo son», «lo» representa «blancas» y es atributo. Es invariable, incluso con un sujeto femenino plural. El mismo pronombre no demuestra la misma función en todas las construcciones.",
        },
        view: ({ number, replace }) => ({
          pieces: [
            word(
              "subject",
              number ? "Las casas" : "La casa",
              "subject",
              "Sujeto",
            ),
            ...(replace
              ? [word("attribute", "lo", "attribute", "Atributo")]
              : []),
            word("verb", number ? "son" : "es", "verb", "Verbo copulativo"),
            ...(!replace
              ? [
                  word(
                    "attribute",
                    number ? "blancas" : "blanca",
                    "attribute",
                    "Atributo",
                  ),
                ]
              : []),
            word("dot", "."),
          ],
          observation: replace
            ? "El pronombre sigue siendo «lo», tanto para «blanca» como para «blancas». Representa una propiedad del sujeto."
            : "«Blanca» o «blancas» concuerda con la casa o las casas. Observa qué ocurre al sustituir el atributo.",
        }),
      },
      {
        id: "predicativo",
        title: "Una propiedad mientras ocurre algo.",
        description:
          "También podemos describir al sujeto con un verbo como «llegar».",
        instruction: "Alterna el verbo y cambia el número. Sigue al adjetivo.",
        controls: [
          choice("verb", "Verbo", ["estar", "llegar"]),
          choice("number", "Sujeto", ["Ana", "Ana y Eva"]),
        ],
        concept: {
          title: "Complemento predicativo",
          text: "En «Ana llegó cansada», «cansada» dice cómo estaba Ana al llegar. Con el verbo pleno «llegó» lo llamamos complemento predicativo. Sigue concordando con el sujeto; no es un adverbio que solo modifica al verbo.",
        },
        view: ({ verb, number }) => ({
          pieces: [
            word("subject", number ? "Ana y Eva" : "Ana", "subject", "Sujeto"),
            word(
              "verb",
              verb
                ? number
                  ? "llegaron"
                  : "llegó"
                : number
                  ? "estaban"
                  : "estaba",
              "verb",
              "Verbo",
            ),
            word(
              "attribute",
              number ? "cansadas" : "cansada",
              "attribute",
              verb ? "Predicativo" : "Atributo",
            ),
            word("dot", "."),
          ],
          observation: verb
            ? "«Cansada» describe al sujeto durante la llegada. El verbo «llegar» conserva su significado; el adjetivo es un predicativo."
            : "Con «estar», el adjetivo funciona como atributo. Ahora cambia el verbo a «llegar».",
        }),
      },
    ],
  },
  {
    id: "circunstancias",
    unit: 2,
    title: "El contexto y los vínculos del verbo",
    description:
      "Añade circunstancias y distingue una preposición seleccionada.",
    summary: [
      "Los circunstanciales añaden datos de tiempo, lugar o modo, entre otros.",
      "No todo grupo con preposición es circunstancial.",
      "El complemento de régimen mantiene la preposición seleccionada por el verbo.",
    ],
    scenes: [
      {
        id: "contexto",
        title: "La escena gana contexto.",
        description: "Ya sabemos que Ana lee. Podemos añadir cuándo y dónde.",
        instruction: "Añade o quita las circunstancias por separado.",
        controls: [
          choice("time", "Cuándo", ["Sin añadir", "Por la tarde"]),
          choice("place", "Dónde", ["Sin añadir", "En el parque"]),
        ],
        concept: {
          title: "Complemento circunstancial · CC",
          text: "Los circunstanciales añaden información como tiempo, lugar o modo. En esta oración, «por la tarde» y «en el parque» son circunstancias que podemos añadir o quitar sin alterar el sentido básico de «leer».",
        },
        view: ({ time, place }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            word("verb", "lee", "verb", "Verbo"),
            ...(time
              ? [word("time", "por la tarde", "circumstance", "CC de tiempo")]
              : []),
            ...(place
              ? [word("place", "en el parque", "circumstance", "CC de lugar")]
              : []),
            word("dot", "."),
          ],
          observation:
            time && place
              ? "Dos circunstancias pueden convivir: una sitúa la lectura en el tiempo y otra, en el espacio."
              : time
                ? "«Por la tarde» añade cuándo lee Ana."
                : place
                  ? "«En el parque» añade dónde lee Ana."
                  : "La oración «Ana lee» ya funciona. Añade detalles para situar la escena.",
        }),
      },
      {
        id: "regimen",
        title: "Hay verbos que eligen preposición.",
        description:
          "«Confiar en» y «depender de» construyen relaciones distintas.",
        instruction:
          "Cambia el verbo. Después sustituye el grupo por un pronombre.",
        controls: [
          choice("verb", "Relación", ["confía en", "depende de"]),
          choice("replace", "Término", ["Marta", "ella"]),
        ],
        concept: {
          title: "Complemento de régimen",
          text: "En estos usos, «confiar» selecciona «en» y «depender», «de». El complemento conserva esa preposición al usar un pronombre: «en ella», «de ella». No es una circunstancia de lugar.",
        },
        view: ({ verb, replace }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            word("verb", verb ? "depende" : "confía", "verb", "Verbo"),
            word(
              "regime",
              `${verb ? "de" : "en"} ${replace ? "ella" : "Marta"}`,
              "link",
              "C. de régimen",
            ),
            word("dot", "."),
          ],
          observation: `«${verb ? "Depende de" : "Confía en"} ${replace ? "ella" : "Marta"}»: la preposición pertenece a la construcción del verbo. Al sustituir a Marta, conservamos «${verb ? "de" : "en"}».`,
        }),
      },
      {
        id: "comparar",
        title: "La forma no resuelve la función.",
        description:
          "Dos grupos empiezan por «en». Observa su relación con el verbo.",
        instruction:
          "Alterna las frases. Compara el papel de los grupos destacados.",
        controls: [
          choice("example", "Compara", ["Lee en el parque", "Confía en Marta"]),
        ],
        concept: {
          title: "Circunstancia y argumento",
          text: "Un argumento está seleccionado por el significado del verbo; una circunstancia añade contexto. Borrar un grupo no es una prueba universal: algunos argumentos pueden quedar implícitos. Hay complementos locativos seleccionados, como el lugar con «residir».",
        },
        view: ({ example }) => ({
          pieces: [
            word("subject", "Ana", "subject", "Sujeto"),
            word("verb", example ? "confía" : "lee", "verb", "Verbo"),
            word(
              "complement",
              example ? "en Marta" : "en el parque",
              example ? "link" : "circumstance",
              example ? "C. de régimen" : "CC de lugar",
            ),
            word("dot", "."),
          ],
          observation: example
            ? "«En Marta» expresa en quién confía. «En» está seleccionada por este uso de «confiar»."
            : "«En el parque» sitúa la lectura. «Leer» no selecciona esa preposición para expresar lo que leemos.",
        }),
      },
    ],
  },
];
