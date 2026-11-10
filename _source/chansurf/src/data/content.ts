import { Lang } from '../i18n/LangContext';

export type LocalizedField = { en: string; es: string; zh: string };
export type LocalizedBody = { en: string[]; es: string[]; zh: string[] };

export interface Article {
  slug: string;
  category: LocalizedField;
  title: LocalizedField;
  subtitle: LocalizedField;
  readingTime: number;
  visual: string;
  chapter: number;
  body: LocalizedBody;
}

export const articles: Article[] = [
  {
    slug: 'what-is-chan',
    category: { en: 'Foundations', es: 'Fundamentos', zh: '根基' },
    title: {
      en: 'What Is Chan? The Source Before the Wave',
      es: '¿Qué es Chan? La Fuente Antes de la Ola',
      zh: '何为禅——浪未起处之源',
    },
    subtitle: {
      en: 'Before Zen was Japanese, it was Chan — the Chinese root of a practice that is less religion than cognitive architecture.',
      es: 'Antes de que Zen fuera japonés, era Chan — la raíz china de una práctica que es menos religión que arquitectura cognitiva.',
      zh: '在禅东渡日本之前，它已在中国生长六百年。它与其说是宗教，不如说是一种关于心智的认知之学。',
    },
    readingTime: 3,
    visual: 'enso',
    chapter: 1,
    body: {
      en: [
        'Chan is the Chinese parent of what the West calls Zen. The word itself — 禅 — is a transliteration of the Sanskrit *dhyana*, meaning meditative absorption. But Chan is not merely meditation. It is a radical proposition: that the mind, when stripped of its compulsive commentary, reveals a clarity that no doctrine can install and no ritual can replace.',
        '## The Root, Not the Branch',
        'When Chan traveled eastward to Japan in the 12th century, it became Zen — refined, formalized, aestheticized. The tea ceremony, the rock garden, the bowing — these are Japanese innovations, beautiful and precise. But they are the branch. Chan is the root.',
        'The difference matters. Zen, as it is packaged for Western consumption, often arrives wrapped in mystique: incense, robes, enigmatic koans. Chan, in its original Chinese form, is blunter. It is less interested in performance and more interested in seeing — seeing what the mind actually does, moment by moment, without the stories it tells about itself.',
        '## A Practice of Subtraction',
        'Chan does not add beliefs. It removes them. The practice is not to adopt a worldview but to notice the one you already carry — and to question it so thoroughly that it loosens its grip. This is why Chan masters historically rejected scripture. Not out of anti-intellectualism, but because reading about water does not quench thirst.',
        '> The finger pointing at the moon is not the moon. — *The Lankavatara Sutra*',
        'This is the core Chan insight: maps are not territory. Philosophy is not experience. And the most sophisticated cognitive framework is still a framework — a structure the mind builds to manage reality, not reality itself.',
        '## Why This Matters Now',
        'In an age of infinite content, Chan offers something counterintuitive: the possibility that less information, not more, produces clarity. The modern mind is over-fed and under-nourished — drowning in input, starved for insight. Chan is the practice of making the mind quiet enough to hear itself think, and honest enough to question what it hears.',
        'This is not religion. It is cognitive hygiene. And it begins not with belief, but with a single, unsettling question: *Can you Chan?*',
      ],
      es: [
        'Chan es el padre chino de lo que Occidente llama Zen. La palabra misma — 禅 — es una transliteración del sánscrito *dhyana*, que significa absorción meditativa. Pero Chan no es simplemente meditación. Es una proposición radical: que la mente, despojada de su comentario compulsivo, revela una claridad que ninguna doctrina puede instalar y ningún ritual puede reemplazar.',
        '## La Raíz, No la Rama',
        'Cuando Chan viajó hacia Japón en el siglo XII, se convirtió en Zen — refinado, formalizado, estetizado. La ceremonia del té, el jardín de rocas, las reverencias — estas son innovaciones japonesas, hermosas y precisas. Pero son la rama. Chan es la raíz.',
        'La diferencia importa. El Zen, tal como se empaqueta para el consumo occidental, a menudo llega envuelto en mistica: incienso, túnicas, koans enigmáticos. Chan, en su forma china original, es más directo. Le interesa menos el performance y más el ver — ver lo que la mente realmente hace, momento a momento, sin las historias que cuenta sobre sí misma.',
        '## Una Práctica de Sustracción',
        'Chan no añade creencias. Las quita. La práctica no es adoptar una cosmovisión sino notar la que ya llevas — y cuestionarla tan a fondo que afloje su agarre. Por esto los maestros Chan históricamente rechazaron las escrituras. No por antiintelectualismo, sino porque leer sobre agua no apaga la sed.',
        '> El dedo que señala la luna no es la luna. — *El Sutra Lankavatara*',
        'Esta es la idea central de Chan: los mapas no son el territorio. La filosofía no es la experiencia. Y el marco cognitivo más sofisticado sigue siendo un marco — una estructura que la mente construye para gestionar la realidad, no la realidad misma.',
        '## Por Qué Esto Importa Ahora',
        'En una era de contenido infinito, Chan ofrece algo contraintuitivo: la posibilidad de que menos información, no más, produce claridad. La mente moderna está sobrealimentada y desnutrida — ahogada en input, hambrienta de insight. Chan es la práctica de hacer la mente suficientemente silenciosa para escucharse pensar, y suficientemente honesta para cuestionar lo que escucha.',
        'Esto no es religión. Es higiene cognitiva. Y no comienza con la creencia, sino con una sola pregunta inquietante: *¿Puedes Chan?*',
      ],
      zh: [
        '禅，西方称之为Zen。这个"禅"字，本是梵语*dhyana*的音译，意为禅定。然而禅远不止于打坐。它提出了一个极为根本的命题：当心识剥落了那层永不停歇的自我注解，一种教义无法安装、仪式无法替代的清明，便会自然现前。',
        '## 根与枝',
        '十二世纪，禅东渡日本，化为Zen——精致、规范、美学化。茶道、枯山水、鞠躬礼，皆为日本之创新，精美而严谨。然而这些是枝，不是根。根在中华。',
        '这个分别至关重要。西方所见的Zen，往往裹着神秘外衣：焚香、僧袍、公案。而禅在其中国本源处，要直截得多。它不重表演，唯重"见"——见心识在当下实际如何运作，而非听信它对自己编造的故事。',
        '## 减法之修',
        '禅不增一法，唯减一法。修行不是采纳某种世界观，而是照见你已携带的那一套，质询它，直到它松手。这正是禅宗祖师历来呵斥经教的原因——并非出于反智，而是因为读关于水的东西不能解渴。',
        '> 指月之指，非月本身。——《楞伽经》',
        '这是禅的根本洞见：地图不是疆域，哲思不是体验。再精妙的认知框架，终究只是框架——心识为管理现实而搭建的结构，并非现实本身。',
        '## 当下何以重要',
        '身处这个信息无穷无尽的时代，禅给出一种反直觉的可能：清明不生于更多，而生于更少。现代心智过载而虚浮——溺于输入，饥于洞见。禅的修行，令心识静到能听见自己在想什么，诚到敢于质疑所听到的一切。',
        '这不是宗教。这是认知的卫生。它不从信仰开始，只从一个令人不安的问题开始——*你能禅吗？*',
      ],
    },
  },
  {
    slug: 'the-rational-path',
    category: { en: 'Foundations', es: 'Fundamentos', zh: '根基' },
    title: {
      en: 'The Rational Path: Chan Without Religion',
      es: 'El Camino Racional: Chan Sin Religión',
      zh: '理性之路——禅非宗教',
    },
    subtitle: {
      en: 'Why Chan is not a faith system but a set of cognitive tools for re-framing the mind.',
      es: 'Por qué Chan no es un sistema de fe sino un conjunto de herramientas cognitivas para reencuadrar la mente.',
      zh: '禅不是信仰体系，而是一套重构心智的认知工具。',
    },
    readingTime: 2,
    visual: 'path',
    chapter: 2,
    body: {
      en: [
        'The most common misconception about Chan is that it requires belief. It does not. Chan is not a religion in the Western sense — there is no deity to worship, no soul to save, no creed to recite. Chan is, at its functional core, a technology of attention.',
        '## Tools, Not Truths',
        'Consider what religion typically offers: a metaphysical claim (the universe is *this* way), a moral framework (you *should* act like *this*), and a soteriological promise (if you comply, *this* will happen). Chan offers none of these. Instead, it offers practices — sitting, breathing, observing — and a vocabulary for describing what the mind does when no one is forcing it to do anything.',
        'The practice of *zuo chan* (sitting meditation, the Chinese origin of *zazen*) is not prayer. It is observation. You sit. You breathe. You watch thoughts arise and pass. You do not chase them. You do not suppress them. You simply notice: *ah, thinking is happening.*',
        '## Cognitive Re-framing',
        'What Chan actually does, in psychological terms, is teach the mind to *de-center* from its own narrative. Most suffering is not caused by events but by the stories the mind tells about events — the interpretation layer that turns a neutral occurrence into a personal crisis. Chan practice weakens that layer.',
        '> Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water. — *Traditional Chan saying*',
        'The saying is not mystical. It is precise. Enlightenment — *wu* in Chinese — is not a transcendent state. It is the recognition that ordinary life, experienced without the mind\'s running commentary, is already complete. The wood is the same. The water is the same. What changes is the noise around it.',
        '## A Practice for Skeptics',
        'This is why Chan is uniquely suited to the modern, skeptical mind. It does not ask you to believe anything. It asks you to *look*. And looking — honest, sustained, unadorned attention — turns out to be the hardest and most transformative thing a human mind can do.',
      ],
      es: [
        'La idea errónea más común sobre Chan es que requiere creencia. No la requiere. Chan no es una religión en el sentido occidental — no hay deidad que adorar, ni alma que salvar, ni credo que recitar. Chan es, en su núcleo funcional, una tecnología de la atención.',
        '## Herramientas, No Verdades',
        'Considera lo que la religión típicamente ofrece: una afirmación metafísica (el universo es *así*), un marco moral (*debes* actuar *así*), y una promesa soteriológica (si cumples, *esto* sucederá). Chan no ofrece nada de esto. En cambio, ofrece prácticas — sentarse, respirar, observar — y un vocabulario para describir lo que la mente hace cuando nadie la obliga a hacer nada.',
        'La práctica de *zuo chan* (meditación sentada, el origen chino de *zazen*) no es oración. Es observación. Te sientas. Respiras. Observas los pensamientos surgir y pasar. No los persigues. No los reprimes. Simplemente notas: *ah, el pensamiento está sucediendo.*',
        '## Reencuadre Cognitivo',
        'Lo que Chan realmente hace, en términos psicológicos, es enseñar a la mente a *descentrarse* de su propia narrativa. La mayoría del sufrimiento no es causado por eventos sino por las historias que la mente cuenta sobre los eventos — la capa de interpretación que convierte un suceso neutral en una crisis personal. La práctica Chan debilita esa capa.',
        '> Antes de la iluminación, corta leña, lleva agua. Después de la iluminación, corta leña, lleva agua. — *Proverbio Chan tradicional*',
        'El dicho no es místico. Es preciso. La iluminación — *wu* en chino — no es un estado trascendente. Es el reconocimiento de que la vida ordinaria, experimentada sin el comentario continuo de la mente, ya está completa. La leña es la misma. El agua es la misma. Lo que cambia es el ruido a su alrededor.',
        '## Una Práctica para Escépticos',
        'Por esto Chan es particularmente adecuada para la mente moderna y escéptica. No te pide que creas en nada. Te pide que *mires*. Y mirar — atención honesta, sostenida, sin adornos — resulta ser lo más difícil y transformador que una mente humana puede hacer.',
      ],
      zh: [
        '关于禅，最常见的误解是：它需要信仰。其实不然。禅不是西方意义上的宗教——没有神祇可以崇拜，没有灵魂等待拯救，没有信条可以诵读。禅的核心功能，是一种注意力的技术。',
        '## 是工具，不是真理',
        '想一想宗教通常提供什么：一个形而上学的论断（宇宙*是*这样的），一套道德框架（你*应该*这样做），一个救赎的许诺（如果你遵从，*就会*如何）。禅这三样都不提供。它提供的是修行——坐、呼吸、观察——以及一套词汇，用来描述心识在无人驱使时究竟在做什么。',
        '*坐禅*（日文*zazen*的源头）不是祈祷，而是观察。你坐着。你呼吸。你看着念头生起又灭去。不追逐，不压抑，只是注意到——*哦，在想。*',
        '## 认知的重构',
        '用心理学的语言来说，禅所做的，是教心识从自己的叙事中*去中心*。大多数痛苦并非由事件造成，而是由心识对事件编造的故事造成——那层将中性事件转化为个人危机的诠释之壳。禅的修行，正在削弱这层壳。',
        '> 未悟时，砍柴挑水。已悟时，砍柴挑水。——*禅宗古语*',
        '这句话不神秘，它很精确。悟——不是一种超验的状态，而是一种认出：没有心识旁白的日常，本已圆满。柴还是那柴，水还是那水。变的只是围绕它的噪音。',
        '## 适合怀疑者的修行',
        '正因如此，禅特别适合现代的、怀疑的心智。它不要求你相信任何东西，只要求你去*看*。而看——诚实的、持续的、不加修饰的注意——恰好是人类心智能做的最困难、也最具转化力的事。',
      ],
    },
  },
  {
    slug: 'the-mind-mirror',
    category: { en: 'Practice', es: 'Práctica', zh: '修行' },
    title: {
      en: 'The Mind Mirror: Seeing Without the Seer',
      es: 'El Espejo Mental: Ver Sin el Que Ve',
      zh: '心镜——见而无所见',
    },
    subtitle: {
      en: 'The Chan insight that consciousness is not a thing but a process — and why that changes everything.',
      es: 'La idea Chan de que la conciencia no es una cosa sino un proceso — y por qué eso lo cambia todo.',
      zh: '禅的洞见：意识不是物，而是过程——这改变了一切。',
    },
    readingTime: 2,
    visual: 'mirror',
    chapter: 3,
    body: {
      en: [
        'Huineng, the Sixth Patriarch of Chan, posed a question that has echoed for thirteen centuries: *If the mind is a mirror, what polishes it?* His answer was radical: the mirror is already clean. The polishing is the illusion.',
        '## The Mirror That Needs No Polishing',
        'Shenxiu, the senior monk, wrote: *The body is the bodhi tree, the mind is the bright mirror. Carefully wipe it day by day, so no dust collects.* This is the conventional view — the mind is a surface that accumulates grime, and practice is the act of cleaning.',
        'Huineng replied: *Bodhi has no tree, the mirror has no stand. Fundamentally there is not a single thing — where could dust collect?* This is the Chan view. The mind is not a thing that gets dirty. It is not a thing at all.',
        '## Process, Not Substance',
        'What Huineng pointed to is a recognition that modern neuroscience would later confirm: consciousness is not an object. You cannot find it, weigh it, or point to it. It is a *process* — the ongoing activity of a brain interpreting its own signals. There is no "self" behind the process, running it. The running is the self.',
        '> To seek the mind is as futile as trying to bite your own teeth. — *Mazu Daoyi*',
        'This is not philosophy. It is a direct observation available to anyone who sits quietly enough, long enough. When you watch thoughts closely, you do not find a thinker behind them. You find only the thinking. The "I" that seems to observe is itself another thought.',
        '## The Liberation of No-Self',
        'Why does this matter? Because most psychological suffering is predicated on the assumption that there is a solid "I" that can be threatened, insulted, diminished, or destroyed. Chan practice dissolves this assumption — not through argument, but through direct seeing. And when the "I" is seen through, the one who suffers is seen through as well.',
      ],
      es: [
        'Huineng, el Sexto Patriarca de Chan, planteó una pregunta que ha resonado por trece siglos: *Si la mente es un espejo, ¿qué lo pule?* Su respuesta fue radical: el espejo ya está limpio. El pulido es la ilusión.',
        '## El Espejo Que No Necesita Pulido',
        'Shenxiu, el monje senior, escribió: *El cuerpo es el árbol bodhi, la mente es el espejo brillante. Límpialo cuidadosamente día tras día, para que no se acumule polvo.* Esta es la visión convencional — la mente es una superficie que acumula suciedad, y la práctica es el acto de limpiar.',
        'Huineng respondió: *Bodhi no tiene árbol, el espejo no tiene soporte. Fundamentalmente no hay una sola cosa — ¿dónde podría acumularse el polvo?* Esta es la visión Chan. La mente no es una cosa que se ensucia. No es una cosa en absoluto.',
        '## Proceso, No Sustancia',
        'Lo que Huineng señaló es un reconocimiento que la neurociencia moderna confirmaría después: la conciencia no es un objeto. No puedes encontrarla, pesarla, o señalarla. Es un *proceso* — la actividad continua de un cerebro interpretando sus propias señales. No hay un "yo" detrás del proceso, ejecutándolo. El ejecutar es el yo.',
        '> Buscar la mente es tan inútil como intentar morder tus propios dientes. — *Mazu Daoyi*',
        'Esto no es filosofía. Es una observación directa disponible para cualquiera que se siente suficientemente quieto, suficientemente tiempo. Cuando observas los pensamientos de cerca, no encuentras un pensador detrás de ellos. Encuentras solo el pensar. El "yo" que parece observar es en sí mismo otro pensamiento.',
        '## La Liberación del No-Yo',
        '¿Por qué importa esto? Porque la mayoría del sufrimiento psicológico se basa en la suposición de que hay un "yo" sólido que puede ser amenazado, insultado, disminuido, o destruido. La práctica Chan disuelve esta suposición — no mediante argumento, sino mediante visión directa. Y cuando el "yo" es atravesado, el que sufre también es atravesado.',
      ],
      zh: [
        '禅宗六祖慧能留下了一个回响千年的问题：*如果心是镜子，谁在擦它？*他的回答极为彻底——镜子本就干净，擦拭才是幻觉。',
        '## 不须拂拭的镜',
        '上座神秀写道：*身是菩提树，心如明镜台。时时勤拂拭，勿使惹尘埃。*这是常规的见解——心如镜面，会积灰，修行就是清洁。',
        '慧能和道：*菩提本无树，明镜亦非台。本来无一物，何处惹尘埃。*这是禅的见地。心不是会脏的东西，它根本不是"东西"。',
        '## 是过程，不是实体',
        '慧能所指出的，现代神经科学后来予以了确认：意识不是物件。你找不到它、称不出它、指不到它。它是一个*过程*——大脑持续解读自身信号的活动。过程背后没有"自我"在操控，运行本身即是自我。',
        '> 觅心犹如欲咬己齿。——*马祖道一*',
        '这不是哲学，而是直接观察——但凡坐得够静够久的人都能获得。当你仔细观察念头，你找不到念头背后的"想者"，只找到想本身。那个似乎在观察的"我"，本身又是另一个念头。',
        '## 无我的解脱',
        '这为何重要？因为大多数心理痛苦都建立在一个假设上：存在一个坚实的"我"可以被威胁、被侮辱、被贬损、被毁灭。禅的修行消解了这个假设——不是通过论证，而是通过直接的看。当"我"被看穿，受苦的那个也被看穿了。',
      ],
    },
  },
  {
    slug: 'the-sound-of-one-hand',
    category: { en: 'Practice', es: 'Práctica', zh: '修行' },
    title: {
      en: 'The Sound of One Hand: Koans as Cognitive Disruption',
      es: 'El Sonido de Una Mano: Koans Como Disrupción Cognitiva',
      zh: '只手之声——公案作为认知的中断',
    },
    subtitle: {
      en: 'How paradoxical riddles are not puzzles to solve but traps for the rational mind — designed to exhaust it into silence.',
      es: 'Cómo los acertijos paradójicos no son problemas a resolver sino trampas para la mente racional — diseñados para agotarla hasta el silencio.',
      zh: '悖论之问不是待解的谜题，而是理性心智的陷阱——设计来将它耗尽，归于静默。',
    },
    readingTime: 3,
    visual: 'circle',
    chapter: 4,
    body: {
      en: [
        'A monk asked Hakuin: *What is the sound of one hand clapping?* The question is famous. What is less understood is its function: it is not a riddle with an answer. It is a precision-engineered cognitive dead end.',
        '## The Architecture of a Koan',
        'A *gongan* — the Chinese term that became *koan* in Japanese — is a public case, a record of an exchange between master and student that has been preserved as a tool for practice. The one-hand question is among the most famous, but there are thousands. Each one is designed to do the same thing: confront the rational mind with something it cannot process.',
        'The rational mind is a meaning-making machine. Give it anything — a cloud, a word, a sensation — and it will interpret, categorize, narrate. This is its genius and its tyranny. The koan is designed to break the machine. You cannot solve *one hand clapping* because the premise is structurally impossible. The mind runs, finds no traction, runs again, finds none, and eventually — exhausts itself.',
        '## Exhaustion as Method',
        'This exhaustion is the point. When the conceptual mind finally gives up — not out of defeat but out of genuine inability — what remains is a kind of openness. Not emptiness in the mystical sense, but a clearing. The noise stops, and something else becomes audible.',
        '> Great doubt: a ball of fire in the chest. — *Hakuin Ekaku*',
        'Hakuin called this state *great doubt*. It is not skepticism or uncertainty. It is the felt experience of the mind hitting its own limit — the visceral recognition that the instrument you have been using to navigate reality cannot navigate this. In that recognition, something shifts.',
        '## Not a Trick, a Tool',
        'Koans are not spiritual party tricks. They are instruments — as precise as a scalpel — for a specific surgical task: separating the mind from its dependence on conceptual thought. The goal is not to "solve" the koan but to let the koan dissolve the solver.',
      ],
      es: [
        'Un monje preguntó a Hakuin: *¿Cuál es el sonido de una mano aplaudiendo?* La pregunta es famosa. Lo que se entiende menos es su función: no es un acertijo con respuesta. Es un callejón cognitivo de precisión.',
        '## La Arquitectura de un Koan',
        'Un *gongan* — el término chino que se convirtió en *koan* en japonés — es un caso público, un registro de un intercambio entre maestro y estudiante que se ha preservado como herramienta de práctica. La pregunta de una mano es una de las más famosas, pero hay miles. Cada uno está diseñado para hacer lo mismo: confrontar a la mente racional con algo que no puede procesar.',
        'La mente racional es una máquina de generar significado. Dale cualquier cosa — una nube, una palabra, una sensación — y la interpretará, categorizará, narrará. Este es su genio y su tiranía. El koan está diseñado para romper la máquina. No puedes resolver *una mano aplaudiendo* porque la premisa es estructuralmente imposible. La mente corre, no encuentra tracción, corre de nuevo, no encuentra nada, y eventualmente — se agota.',
        '## Agotamiento Como Método',
        'Este agotamiento es el punto. Cuando la mente conceptual finalmente se rinde — no por derrota sino por genuina incapacidad — lo que queda es una especie de apertura. No vacío en el sentido místico, sino un claro. El ruido se detiene, y algo más se vuelve audible.',
        '> Gran duda: una bola de fuego en el pecho. — *Hakuin Ekaku*',
        'Hakuin llamó a este estado *gran duda*. No es escepticismo ni incertidumbre. Es la experiencia palpable de la mente llegando a su propio límite — el reconocimiento visceral de que el instrumento que has estado usando para navegar la realidad no puede navegar esto. En ese reconocimiento, algo cambia.',
        '## No un Truco, una Herramienta',
        'Los koans no son trucos espirituales de fiesta. Son instrumentos — tan precisos como un bisturí — para una tarea quirúrgica específica: separar la mente de su dependencia del pensamiento conceptual. La meta no es "resolver" el koan sino dejar que el koan disuelva al que resuelve.',
      ],
      zh: [
        '有僧问白隐禅师：*只手拍掌，声从何来？*此问闻名于世。但少有人理解它的功用——它不是有答案的谜题，而是一条精密设计的认知死路。',
        '## 公案的架构',
        '*公案*——中文的术语，日文转写为*koan*——即"公案"，是师徒对答的记录，被保存为修行的工具。只手之声是最著名的公案之一，但公案有数千则，每一则都做同一件事：以理性心智无法处理的东西，与之对峙。',
        '理性心智是一台制造意义的机器。给它任何东西——一朵云、一个词、一种感觉——它都会去诠释、归类、叙述。这是它的天赋，也是它的暴政。公案就是设计来打破这台机器的。你无法*解开*一只手拍掌，因为前提在结构上就不可能。心智奔走，抓不住，再奔走，还是抓不住，最终——力竭。',
        '## 以耗尽为方法',
        '这种耗尽正是目的。当概念心智终于放弃——不是出于挫败，而是出于真正的无力——剩下的是一种敞开。不是神秘意义上的空，而是一片澄明。噪音止息，别的什么变得可闻了。',
        '> 大疑——胸中一团火。——*白隐慧鹤*',
        '白隐称此状态为*大疑*。它不是怀疑论，不是不确定。它是心智撞上自身极限的切身感受——你一直用来导航现实的工具，竟无法导航此处。在那个认出中，某种东西发生了位移。',
        '## 不是戏法，是利器',
        '公案不是灵性的戏法。它们是器械——如手术刀般精密——用于一项特定的外科任务：将心智从对概念思维的依赖中剥离。目标不是"解开"公案，而是让公案消解那个解题者。',
      ],
    },
  },
  {
    slug: 'immediate-awakening',
    category: { en: 'Philosophy', es: 'Filosofía', zh: '哲学' },
    title: {
      en: 'Immediate Awakening: The Sudden School',
      es: 'Despertar Inmediato: La Escuela Súbita',
      zh: '顿悟——顿宗之教'
    },
    subtitle: {
      en: 'Why Chan insists that awakening is not gradual but instantaneous — and what that means in practice.',
      es: 'Por qué Chan insiste en que el despertar no es gradual sino instantáneo — y qué significa eso en la práctica.',
      zh: '禅何以坚持悟不是渐进而是顿然——以及这在修行中意味着什么。',
    },
    readingTime: 2,
    visual: 'moon',
    chapter: 5,
    body: {
      en: [
        'Chan is divided into two schools: the Gradual and the Sudden. The Gradual school holds that awakening comes through sustained practice — step by step, year by year, the mind is refined. The Sudden school, championed by Huineng, says otherwise: awakening is not a destination. It is a recognition, and it can happen now.',
        '## The Split',
        'The historical split between these schools is one of the great turning points in Chinese intellectual history. Shenxiu represented the Gradual position: practice diligently, polish the mirror, progress incrementally. Huineng represented the Sudden: there is no mirror, no polishing, no progress. There is only seeing or not seeing.',
        'From a modern cognitive perspective, both are partially right. The Gradual school describes the *training* — the slow, patient work of building the capacity to pay attention. The Sudden school describes the *event* — the moment when that capacity meets its object and something clicks.',
        '## Recognition, Not Achievement',
        'The Sudden school\'s key insight is that awakening is not an achievement. You do not earn it. You do not build toward it. You recognize it — the way you recognize a face in a crowd, or the solution to a problem you had been approaching from the wrong angle. The recognition is instantaneous, but the conditions for it may take years to ripen.',
        '> Awakening is like water and ice — there is no other ice besides water. — *Hakuin Ekaku*',
        'The metaphor is exact. Ice is not *produced from* water. Ice *is* water, in a different condition. Awakening is not produced from practice. It *is* the mind, in a different condition. Practice does not create awakening. Practice creates the conditions under which awakening can be recognized.',
        '## What This Means for You',
        'You do not need to become something. You do not need to improve, progress, or ascend. You need to *see* — and seeing is available now, in this sentence, in this breath, in the ordinary fact of being conscious. The Sudden school\'s radical promise is that nothing stands between you and clarity except the assumption that something does.',
      ],
      es: [
        'Chan se divide en dos escuelas: la Gradual y la Súbita. La escuela Gradual sostiene que el despertar viene a través de la práctica sostenida — paso a paso, año tras año, la mente se refina. La escuela Súbita, defendida por Huineng, dice lo contrario: el despertar no es un destino. Es un reconocimiento, y puede suceder ahora.',
        '## La División',
        'La división histórica entre estas escuelas es uno de los grandes puntos de inflexión en la historia intelectual china. Shenxiu representaba la posición Gradual: practica diligentemente, pule el espejo, progresa incrementalmente. Huineng representaba la Súbita: no hay espejo, ni pulido, ni progreso. Solo hay ver o no ver.',
        'Desde una perspectiva cognitiva moderna, ambas tienen razón parcialmente. La escuela Gradual describe el *entrenamiento* — el trabajo lento y paciente de construir la capacidad de prestar atención. La escuela Súbita describe el *evento* — el momento en que esa capacidad encuentra su objeto y algo hace clic.',
        '## Reconocimiento, No Logro',
        'La idea clave de la escuela Súbita es que el despertar no es un logro. No lo ganas. No construyes hacia él. Lo *reconoces* — como reconoces una cara en una multitud, o la solución a un problema que habías estado abordando desde el ángulo equivocado. El reconocimiento es instantáneo, pero las condiciones para él pueden tardar años en madurar.',
        '> El despertar es como el agua y el hielo — no hay otro hielo además del agua. — *Hakuin Ekaku*',
        'La metáfora es exacta. El hielo no se *produce a partir del* agua. El hielo *es* agua, en una condición diferente. El despertar no se produce a partir de la práctica. *Es* la mente, en una condición diferente. La práctica no crea el despertar. La práctica crea las condiciones bajo las cuales el despertar puede ser reconocido.',
        '## Qué Significa Para Ti',
        'No necesitas convertirte en algo. No necesitas mejorar, progresar, o ascender. Necesitas *ver* — y ver está disponible ahora, en esta frase, en esta respiración, en el hecho ordinario de estar consciente. La promesa radical de la escuela Súbita es que nada se interpone entre tú y la claridad excepto la suposición de que algo se interpone.',
      ],
      zh: [
        '禅分渐顿二宗。渐宗认为开悟来自持续修行——一步步、一年年，心识被提纯。顿宗，由慧能所倡，则另有说法：开悟不是目的地，它是一种认出，可以发生在当下。',
        '## 分野',
        '两宗之间的历史分野，是中国思想史上的一大转折。神秀代表渐宗：勤修行，擦明镜，渐进提升。慧能代表顿宗：没有镜子，没有擦拭，没有进步，只有见或未见。',
        '从现代认知的角度看，两方都部分正确。渐宗描述的是*训练*——缓慢、耐心地构建注意力的能力。顿宗描述的是*事件*——那个能力遇到其对象、某物咔哒一响的瞬间。',
        '## 是认出，不是成就',
        '顿宗的关键洞见是：开悟不是成就。你不是赚来的，不是向它构建的。你*认出*它——就像你在人群中认出一张脸，或认出一个你一直从错误角度切入的问题的答案。认出是瞬间的，但它的条件可能需要多年才能成熟。',
        '> 悟如水与冰——除了水别无他冰。——*白隐慧鹤*',
        '这个比喻是精确的。冰不是从水*产生*的，冰*就是*水，处于不同状态。开悟不是从修行*产生*的，它*就是*心识，处于不同状态。修行不创造开悟，修行创造的是开悟能被认出的条件。',
        '## 这对你意味着什么',
        '你不需要成为什么。你不需要改进、进步、攀升。你需要去*见*——而见于当下可得，在这一句中，在这一呼吸中，在"有意识"这个平凡的事实中。顿宗的彻底承诺是：横亘在你与清明之间的，只有"有什么横亘其间"这个假设。',
      ],
    },
  },
  {
    slug: 'chan-in-daily-life',
    category: { en: 'Philosophy', es: 'Filosofía', zh: '哲学' },
    title: {
      en: 'Chan in Daily Life: The Ordinary Sacred',
      es: 'Chan en la Vida Cotidiana: Lo Sagrado Ordinario',
      zh: '日常之禅——平常即道'
    },
    subtitle: {
      en: 'Why Chan rejects the monastery/layperson divide — and how practice dissolves into every act of living.',
      es: 'Por qué Chan rechaza la división monasterio/laico — y cómo la práctica se disuelve en cada acto de vivir.',
      zh: '禅何以拒绝寺院与俗众的分割——以及修行如何消融于生活的每一个动作中。',
    },
    readingTime: 2,
    visual: 'bamboo',
    chapter: 6,
    body: {
      en: [
        'There is a Chan story about a monk who asked his master: *What is the ultimate teaching?* The master replied: *Have you eaten your rice porridge?* The monk said yes. The master said: *Then go wash your bowl.*',
        '## The Sacred Is Not Elsewhere',
        'This exchange captures the entire spirit of Chan. The ultimate teaching is not a doctrine. It is rice porridge and a dirty bowl. The sacred is not in a temple, on a mountain, or in a trance. It is in the act of eating when you are eating, and in the act of washing when you are washing.',
        'Western spiritual traditions typically separate the sacred from the profane: there is holy ground and ordinary ground, holy time and ordinary time, holy acts and ordinary acts. Chan rejects this entire framework. There is only one ground, one time, one act — and it is either done with attention or without.',
        '## The Practice of Ordinary Attention',
        'This makes Chan the most accessible and the most demanding of practices. Accessible because it requires no special equipment, no temple, no robe, no certification. Demanding because it asks for something harder than any of those: sustained, honest attention to the present moment, in the most mundane circumstances.',
        '> When walking, just walk. When sitting, just sit. Above all, do not wobble. — *Layman Pang*',
        'The instruction is deceptively simple. *Just walk.* Not walk while planning the meeting. Not walk while replaying the argument. Not walk while composing the email. Walk — and know that you are walking. This is the entire practice, and it is endlessly deep.',
        '## Dissolution of the Boundary',
        'When practice is no longer something you *do* for thirty minutes in the morning, but something that infuses every act — eating, walking, speaking, listening — the boundary between practice and life dissolves. There is no longer a meditator and a world. There is just the world, experienced clearly. This is Chan in daily life: not a practice added to living, but living itself, done with the lights on.',
      ],
      es: [
        'Hay una historia Chan sobre un monje que preguntó a su maestro: *¿Cuál es la enseñanza última?* El maestro respondió: *¿Ya comiste tu gachas de arroz?* El monje dijo que sí. El maestro dijo: *Entonces ve y lava tu tazón.*',
        '## Lo Sagrado No Está en Otra Parte',
        'Este intercambio captura todo el espíritu de Chan. La enseñanza última no es una doctrina. Son gachas de arroz y un tazón sucio. Lo sagrado no está en un templo, en una montaña, o en un trance. Está en el acto de comer cuando comes, y en el acto de lavar cuando lavas.',
        'Las tradiciones espirituales occidentales típicamente separan lo sagrado de lo profano: hay tierra sagrada y tierra ordinaria, tiempo sagrado y tiempo ordinario, actos sagrados y actos ordinarios. Chan rechaza todo este marco. Solo hay una tierra, un tiempo, un acto — y se hace con atención o sin ella.',
        '## La Práctica de la Atención Ordinaria',
        'Esto hace de Chan la práctica más accesible y la más exigente. Accesible porque no requiere equipo especial, ni templo, ni túnica, ni certificación. Exigente porque pide algo más difícil que todo eso: atención sostenida y honesta al momento presente, en las circunstancias más mundanas.',
        '> Cuando camines, solo camina. Cuando te sientes, solo siéntate. Sobre todo, no titubees. — *Lego Pang*',
        'La instrucción es engañosamente simple. *Solo camina.* No caminar mientras planificas la reunión. No caminar mientras repites la discusión. No caminar mientras compones el email. Camina — y sabe que estás caminando. Esta es toda la práctica, y es infinitamente profunda.',
        '## Disolución de la Frontera',
        'Cuando la práctica ya no es algo que *haces* durante treinta minutos por la mañana, sino algo que infunde cada acto — comer, caminar, hablar, escuchar — la frontera entre práctica y vida se disuelve. Ya no hay un meditador y un mundo. Solo hay el mundo, experimentado con claridad. Esto es Chan en la vida cotidiana: no una práctica añadida a vivir, sino el vivir mismo, con las luces encendidas.',
      ],
      zh: [
        '禅宗有一则公案。僧人问师父：*究竟的教导是什么？*师父答：*吃粥了吗？*僧人说吃过了。师父说：*那就去洗碗吧。*',
        '## 道不在别处',
        '这一段对答，尽摄禅的精神。究竟的教导不是教义，是一碗粥和一只脏碗。道不在寺院里，不在山上，不在定中。在吃的时候吃，在洗的时候洗。',
        '西方灵性传统通常将神圣与世俗分开：有圣地与凡地，有圣时与凡时，有圣行与凡行。禅拒绝这整套框架。只有一地、一时、一行——要么带着注意去做，要么没有。',
        '## 平常注意的修行',
        '这使禅成为最易行也最苛求的修行。易行，因为它不需要任何特殊装备、不需要寺院、不需要僧袍、不需要认证。苛求，因为它要求的比这些都难：在最平凡的场景中，对当下保持持续、诚实的注意。',
        '> 行时即行，坐时即坐。最要紧，莫摇摆。——*庞居士*',
        '指令看似简单。*只是走。*不是边走边想会议。不是边走边重播争吵。不是边走边编邮件。走——并且知道你在走。这就是全部修行，而它深不见底。',
        '## 边界的消融',
        '当修行不再是你早上*做*三十分钟的事，而是渗入每一个动作——吃、走、说、听——修行与生活的边界就消融了。不再有一个打坐者和一个世界，只有世界，被清晰地体验。这就是日常之禅：不是加在生活上的修行，而是生活本身，灯亮着。',
      ],
    },
  },
];

export interface Retreat {
  slug: string;
  title: LocalizedField;
  location: LocalizedField;
  duration: LocalizedField;
  vibe: LocalizedField;
  visual: string;
  review: LocalizedField;
  affiliateLink: string;
}

export const retreats: Retreat[] = [
  {
    slug: 'misty-peaks-kyoto',
    title: { en: 'Misty Peaks Retreat — Kyoto', es: 'Retiro Misty Peaks — Kioto', zh: '雾峰禅修——京都' },
    location: { en: 'Kyoto, Japan', es: 'Kioto, Japón', zh: '京都，日本' },
    duration: { en: '7 days', es: '7 días', zh: '七日' },
    vibe: { en: 'Silent, forested, monastic precision', es: 'Silencioso, forestado, precisión monástica', zh: '寂静，山林，寺院之严谨' },
    visual: 'forest',
    review: {
      en: 'A 14th-century temple compound restored to minimalist perfection. The schedule is rigorous — 5am sitting, walking meditation through cedar groves, vegetarian meals eaten in silence. What makes Misty Peaks exceptional is not the austerity but the architecture: every window frames nature as a living painting. The cognitive decompression begins around day three, when the planning mind finally exhausts itself and something quieter takes its place.',
      es: 'Un complejo de templo del siglo XIV restaurado a la perfección minimalista. El horario es riguroso — meditación a las 5am, caminatas meditativas entre cedros, comidas vegetarianas en silencio. Lo que hace excepcional a Misty Peaks no es la austeridad sino la arquitectura: cada ventana enmarca la naturaleza como una pintura viva. La descompresión cognitiva comienza alrededor del tercer día, cuando la mente planificadora finalmente se agota y algo más silencioso toma su lugar.',
      zh: '一座十四世纪的寺院群，修复至极简之境。日程严谨——清晨五时打坐，穿行杉林行禅，素食默食。雾峰之卓越不在苦行，而在建筑：每扇窗都将自然框成一幅活的画。认知的减压大约在第三日开始——那时计划心终于耗尽，某种更安静的东西取而代之。',
    },
    affiliateLink: 'https://www.bookretreats.com',
  },
  {
    slug: 'alpine-stillness-swiss',
    title: { en: 'Alpine Stillness — Swiss Alps', es: 'Quietud Alpina — Alpes Suizos', zh: '阿尔卑斯之静——瑞士' },
    location: { en: 'Lauterbrunnen, Switzerland', es: 'Lauterbrunnen, Suiza', zh: '劳特布龙嫩，瑞士' },
    duration: { en: '5 days', es: '5 días', zh: '五日' },
    vibe: { en: 'Mountain luxury, thermal baths, silence', es: 'Lujo de montaña, baños termales, silencio', zh: '山间奢隐，温泉，寂静' },
    visual: 'mountains',
    review: {
      en: 'Set in a valley walled by 300-meter cliffs and 72 waterfalls, this retreat pairs Chan-style sitting with alpine thermal therapy. The mornings are silent meditation; the afternoons are guided walks through glacial landscapes; the evenings are long soaks in geothermal pools. The contrast between cold mountain air and hot mineral water becomes a physical metaphor for the Chan practice of holding opposites without resolving them.',
      es: 'Ubicado en un valle amurallado por acantilados de 300 metros y 72 cascadas, este retiro combina la meditación estilo Chan con terapia térmica alpina. Las mañanas son meditación silenciosa; las tardes son caminatas guiadas por paisajes glaciares; las noches son largos remojones en piscinas geotermales. El contraste entre el aire frío de montaña y el agua mineral caliente se convierte en una metáfora física de la práctica Chan de sostener opuestos sin resolverlos.',
      zh: '坐落于被三百米崖壁和七十二道瀑布围合的山谷中，这处禅修将禅式打坐与阿尔卑斯温泉疗法结合。晨间静坐，午后冰川景观导览步行，晚间在地热池中长泡。冷空气与热矿水的对比，成为禅的修行"持对立而不消解"的身体隐喻。',
    },
    affiliateLink: 'https://www.bookretreats.com',
  },
  {
    slug: 'desert-zen-morocco',
    title: { en: 'Desert Zen — Sahara Edge', es: 'Zen del Desierto — Borde del Sahara', zh: '沙漠之禅——撒哈拉之缘' },
    location: { en: 'Merzouga, Morocco', es: 'Merzouga, Marruecos', zh: '梅尔祖卡，摩洛哥' },
    duration: { en: '6 days', es: '6 días', zh: '六日' },
    vibe: { en: 'Minimalist bivouac, vast silence, starlight', es: 'Bivac minimalista, vasto silencio, luz de estrellas', zh: '极简营地，大寂，星光' },
    visual: 'desert',
    review: {
      en: 'The Sahara is the world\'s largest anechoic chamber. At the edge of the Erg Chebbi dunes, this retreat offers a stripped-down experience: a low bivouac, a wool blanket, and 360 degrees of nothing. The silence here is not the absence of sound but the presence of vastness. Days begin with sitting meditation facing the sunrise over the dunes; nights end with unguided stargazing. The desert does what no temple can: it removes every distraction, including the distraction of comfort.',
      es: 'El Sahara es la cámara anecoica más grande del mundo. En el borde de las dunas de Erg Chebbi, este retiro ofrece una experiencia despojada: un bivac bajo, una manta de lana, y 360 grados de nada. El silencio aquí no es la ausencia de sonido sino la presencia de vastedad. Los días comienzan con meditación sentada mirando el amanecer sobre las dunas; las noches terminan con observación de estrellas sin guía. El desierto hace lo que ningún templo puede: quita cada distracción, incluida la distracción del confort.',
      zh: '撒哈拉是世界上最大的消声室。在切比沙丘的边缘，这处禅修提供了一种剥离到骨的体验：低矮的帐篷、一条毛毯、三百六十度的空无。这里的静默不是声音的缺席，而是浩瀚的在。每日以面朝沙丘、迎日打坐开始，夜以无人引导的观星结束。沙漠做到了任何寺院都做不到的：它移除一切干扰，包括舒适这个干扰。',
    },
    affiliateLink: 'https://www.bookretreats.com',
  },
  {
    slug: 'coastal-sanctuary-portugal',
    title: { en: 'Coastal Sanctuary — Algarve', es: 'Santuario Costero — Algarve', zh: '海岸静所——阿尔加维' },
    location: { en: 'Sagres, Portugal', es: 'Sagres, Portugal', zh: '萨格里什，葡萄牙' },
    duration: { en: '8 days', es: '8 días', zh: '八日' },
    vibe: { en: 'Oceanfront, modernist architecture, slow living', es: 'Frente al océano, arquitectura modernista, vida lenta', zh: '面海，现代主义建筑，慢生活' },
    visual: 'ocean',
    review: {
      en: 'A modernist villa on the cliff edge of Sagres, where the Atlantic meets the last point of Europe. The retreat blends Chan sitting with ocean swimming and slow-food practices. The architecture is all glass and concrete — intentionally austere, so the landscape does the talking. The cognitive reset comes from the Atlantic itself: there is something about staring at an ocean that has no far shore that quiets the planning mind more effectively than any instruction.',
      es: 'Una villa modernista en el borde del acantilado de Sagres, donde el Atlántico se encuentra con el último punto de Europa. El retiro combina meditación Chan con natación oceánica y prácticas de comida lenta. La arquitectura es todo vidrio y concreto — intencionalmente austera, para que el paisaje hable. El reseteo cognitivo viene del propio Atlántico: hay algo en mirar un océano que no tiene orilla lejana que silencia la mente planificadora más efectivamente que cualquier instrucción.',
      zh: '一座现代主义别墅，立于萨格里什的崖缘——大西洋与欧洲最后一点交汇之处。禅修融合了禅坐、海泳与慢食实践。建筑全为玻璃与混凝土——刻意素净，让风景说话。认知的重置来自大西洋本身：凝视一片没有远岸的海洋，比任何指令都更有效地令计划心安静下来。',
    },
    affiliateLink: 'https://www.bookretreats.com',
  },
];

export interface Product {
  slug: string;
  title: LocalizedField;
  description: LocalizedField;
  visual: string;
  affiliateLink: string;
}

export const products: Product[] = [
  {
    slug: 'handwoven-zabuton',
    title: { en: 'Handwoven Zabuton Meditation Mat', es: 'Zabuton Mat de Meditación Tejido a Mano', zh: '手织坐禅蒲团' },
    description: {
      en: 'A floor cushion mat woven from undyed organic cotton, sized for full-lotus or kneeling. The density is calibrated to support long sits without compressing — the foundation of a home meditation corner.',
      es: 'Una almohadilla de suelo tejida de algodón orgánico sin teñir, dimensionada para loto completo o arrodillado. La densidad está calibrada para soportar sesiones largas sin comprimirse — la base de un rincón de meditación en casa.',
      zh: '一张以未染色有机棉编织的蒲团坐垫，尺寸适合全跏趺坐或跪坐。密度经校准，可承托久坐而不塌——家中禅修角的基石。',
    },
    visual: 'mat',
    affiliateLink: 'https://www.dharmacrafts.com',
  },
  {
    slug: 'japanese-incense-burner',
    title: { en: 'Japanese Incense Burner — Brass', es: 'Quemador de Incienso Japonés — Latón', zh: '黄铜香炉' },
    description: {
      en: 'A solid brass koro in the simplest possible form — a low cylinder with a perforated lid. Designed for koh (Japanese incense), not cones. The weight gives it permanence on the altar; the patina deepens with use.',
      es: 'Un koro de latón macizo en la forma más simple posible — un cilindro bajo con tapa perforada. Diseñado para koh (incienso japonés), no para conos. El peso le da permanencia en el altar; la pátina se profundiza con el uso.',
      zh: '一只黄铜实心香炉，形制至简——矮筒配穿孔盖。为线香而设，非锥香。其分量使它在佛龛上稳如磐石；包浆随使用愈深。',
    },
    visual: 'incense',
    affiliateLink: 'https://www.dharmacrafts.com',
  },
  {
    slug: 'singing-bowl-nepal',
    title: { en: 'Hand-Hammered Singing Bowl — Nepal', es: 'Cuenco Tibetano a Mano — Nepal', zh: '手工颂钵——尼泊尔' },
    description: {
      en: 'A seven-metal alloy bowl hand-hammered in the Kathmandu Valley. Each bowl produces a unique harmonic — the one you choose becomes yours. Run the wooden mallet around the rim and the bowl sings a sustained note that fills a room.',
      es: 'Un cuenco de aleación de siete metales martillado a mano en el Valle de Katmandú. Cada cuenco produce un armónico único — el que elijas se convierte en tuyo. Pasa la maza de madera alrededor del borde y el cuento canta una nota sostenida que llena la habitación.',
      zh: '一只七金合金颂钵，于加德满都谷地手工锤打而成。每只颂钵发出独特的泛音——你所选的那只便成为你的。以木棒沿碗缘运行，颂钵唱出一个绵延的音，盈满一室。',
    },
    visual: 'bowl',
    affiliateLink: 'https://www.dhamacrafts.com',
  },
  {
    slug: 'linen-meditation-shawl',
    title: { en: 'Linen Meditation Shawl — Natural', es: 'Chal de Meditación de Lino — Natural', zh: '亚麻禅修披肩——原色' },
    description: {
      en: 'A generously sized shawl woven from heavyweight European linen, in undyed flax color. Drapes over the shoulders during sitting to hold warmth without weight. Folds to nothing for travel. Improves with every wash.',
      es: 'Un chal de tamaño generoso tejido de lino europeo de peso pesado, en color de lino sin teñir. Se coloca sobre los hombros durante la meditación para mantener el calor sin peso. Se dobla a nada para viajar. Mejora con cada lavado.',
      zh: '一条宽大的披肩，以重磅欧洲亚麻织成，原色未染。坐禅时披于肩上，保暖而不增重。旅行时可折至极小。愈洗愈柔。',
    },
    visual: 'shawl',
    affiliateLink: 'https://www.dharmacrafts.com',
  },
];

export function getLocalized<T extends { en: string; es: string; zh: string }>(field: T, lang: Lang): string {
  return field[lang];
}
