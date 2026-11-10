import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';

export default function StartHere() {
  const { lang } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  useSEO({
    title: tr('Start Here', 'Empezar Aquí', '入门'),
    description: tr(
      'Your introduction to Chan: the difference between Chan and Zen, the rational non-religious approach, and how to choose your path between theory, experience, and space.',
      'Tu guía de introducción a Chan: la diferencia entre Chan y Zen, el enfoque racional sin religión, y cómo elegir tu camino entre teoría, experiencia y espacio.',
      '你的禅之入门：禅与Zen的区别、理性的非宗教路径，以及如何在理论、体验与空间之间选择你的道路。',
    ),
    path: `${prefix}/start-here`,
  });

  const paths: { to: string; label: string; desc: string; img: string }[] = [
    {
      to: `${prefix}/series/buddhism-101`,
      label: tr('The Theory', 'La Teoría', '理'),
      desc: tr(
        'Dive into structured chapters that dismantle Chan philosophy from its Chinese roots. Intellectual reading, not devotional.',
        'Sumérgete en los capítulos estructurados que desmontan la filosofía Chan desde sus raíces chinas. Lectura intelectual, no devocional.',
        '深入结构化章节，从中国根源拆解禅的哲学。智识阅读，非信仰阅读。',
      ),
      img: '/assets/start-theory.jpg',
    },
    {
      to: `${prefix}/escapes`,
      label: tr('The Experience', 'La Experiencia', '行'),
      desc: tr(
        'Curated luxury meditation retreats worldwide. Where theory meets the body and silence becomes tangible.',
        'Retiros de meditación de lujo curados globalmente. Donde la teoría se encuentra con el cuerpo y el silencio se vuelve tangible.',
        '甄选全球奢华禅修。理论在此遇见身体，静默变得可触。',
      ),
      img: '/assets/start-experience.jpg',
    },
    {
      to: `${prefix}/curated`,
      label: tr('The Space', 'El Espacio', '境'),
      desc: tr(
        'Design guides and curated objects for building a minimalist sanctuary at home. Practice made ambient.',
        'Guías de diseño y objetos curados para construir un santuario minimalista en casa. La práctica hecha ambiente.',
        '设计指南与甄选器物，在家中营造极简静室。修行化为氛围。',
      ),
      img: '/assets/start-space.jpg',
    },
  ];

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      <article className="container-editorial">
        <span className="tag text-gold">{tr('Start Here', 'Empezar', '入门')}</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4 mb-6 leading-[1.1] tracking-tightest">
          {tr('Before Zen, there is Chan.', 'Antes del Zen, está Chan.', 'Zen之前，有禅。')}
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-12">
          {tr(
            'This is your entry point. We will not ask you to believe anything. We will ask you to look.',
            'Esta es tu puerta de entrada. No te pediremos que creas en nada. Te pediremos que mires.',
            '这是你的入口。我们不会要求你相信任何东西。我们只要求你去看。',
          )}
        </p>

        <div className="article-body">
          <h2>{tr('1. Chan vs. Zen: Why the root matters', '1. Chan vs. Zen: ¿Por qué la raíz importa?', '一、禅与Zen：为何根源重要')}</h2>
          <p>
            {tr(
              'The word "Zen" is the Japanese pronunciation of "Chan" (禅). Chan is the Chinese original — the tradition that flourished in China between the 6th and 9th centuries, before traveling to Japan, Korea, and Vietnam. When the West discovers Zen, it discovers the Japanese branch: formalized, aestheticized, wrapped in ritual. Chan, in its original form, is blunter, less performative, more interested in seeing than in doing.',
              'La palabra "Zen" es la pronunciación japonesa de "Chan" (禅). Chan es el original chino — la tradición que floreció en China entre los siglos VI y IX, antes de viajar a Japón, Corea y Vietnam. Cuando Occidente descubre el Zen, descubre la rama japonesa: formalizada, estetizada, envuelta en ritual. Chan, en su forma original, es más directo, menos performativo, más interesado en ver que en hacer.',
              '"Zen"是"禅"（禅）的日语读音。禅是中文原版——六至九世纪在中国兴盛的传统，之后东传日本、朝鲜、越南。西方所见之Zen，是日本分支：规范化、美学化、裹以仪轨。禅在其本源处更直截、更少表演性，更重"见"而非"做"。',
            )}
          </p>
          <p>
            {tr(
              'Does the distinction matter? Yes. Because if you confuse the branch with the root, you confuse form with function. The Japanese ritual is beautiful, but it is a technique, not the truth. Chan points to the function: what the mind does when you take away the script.',
              '¿Importa la distinción? Sí. Porque si confundes la rama con la raíz, confundes la forma con la función. El ritual japonés es hermoso, pero es una técnica, no la verdad. Chan apunta a la función: lo que la mente hace cuando se le quita el guion.',
              '这个区别重要吗？重要。因为如果你混淆了枝与根，你就混淆了形式与功能。日本仪轨很美，但它是技术，不是真理。禅指向功能：当你拿掉剧本时，心识在做什么。',
            )}
          </p>

          <h2>{tr('2. The Rational Path: No religion, just tools', '2. El Camino Racional: Sin religión, solo herramientas', '二、理性之路：没有宗教，只有工具')}</h2>
          <p>
            {tr(
              'canchan.com is not a religious site. We do not preach. We do not ask for faith. We offer something more useful: cognitive tools. Chan, understood functionally, is a set of practices for observing how the mind constructs its experience — and for questioning those constructions until they loosen.',
              'canchan.com no es un sitio religioso. No predicamos. No pedimos fe. Ofrecemos algo más útil: herramientas cognitivas. Chan, entendido funcionalmente, es un conjunto de prácticas para observar cómo la mente construye su experiencia — y para cuestionar esas construcciones hasta que se aflojen.',
              'canchan.com不是宗教网站。我们不布道。我们不要求信仰。我们提供更有用的东西：认知工具。从功能上理解，禅是一组修行方法，用于观察心识如何构建其体验——并质询那些构建，直到它们松动。',
            )}
          </p>
          <p>
            {tr(
              'Think of it as cognitive hygiene. You do not need to be a Buddhist to sit and watch your breath. You do not need to believe in karma to notice that most of your suffering comes not from events but from the stories you tell about events. Chan offers a vocabulary for this, and a practice to deepen it.',
              'Piénsalo como higiene cognitiva. No necesitas ser budista para sentarte y observar tu respiración. No necesitas creer en el karma para notar que la mayoría de tu sufrimiento viene no de los eventos sino de las historias que cuentas sobre los eventos. Chan ofrece un vocabulario para esto, y una práctica para profundizarlo.',
              '把它想成认知卫生。你不需要是佛教徒才能坐下来观呼吸。你不需要信业报就能注意到：你的痛苦大多不来自事件，而来自你对事件编造的故事。禅为此提供了一套词汇，以及一种深化的修行。',
            )}
          </p>

          <blockquote>
            {tr(
              'Philosophy is the map. Experience is the territory. Chan asks you to put down the map and walk.',
              'La filosofía es el mapa. La experiencia es el territorio. Chan te pide que dejes el mapa y camines.',
              '哲学是地图。体验是疆域。禅要你放下地图，走。',
            )}
          </blockquote>

          <h2>{tr('3. Choose your path', '3. Elige tu camino', '三、选择你的路')}</h2>
          <p>
            {tr(
              'There are three ways in. There is no correct order. Choose what resonates — or what discomforts you, which is often the same thing.',
              'Hay tres formas de entrar. No hay orden correcto. Elige lo que resuena — o lo que te incomoda, que a menudo es lo mismo.',
              '有三条入路。没有正确顺序。选让你共鸣的——或让你不安的，那往往是同一件事。',
            )}
          </p>
        </div>

        {/* Path cards */}
        <div className="grid grid-cols-1 gap-px bg-divider mt-12 -mx-6">
          {paths.map((path) => (
            <Link
              key={path.to}
              to={path.to}
              className="group bg-alabaster p-8 md:p-10 transition-colors duration-500 hover:bg-white"
            >
              <img src={path.img} alt="" className="mb-6 w-full aspect-[16/9] object-cover" />
              <span className="tag text-gold">{path.label}</span>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mt-2 mb-3 group-hover:text-gold transition-colors duration-300">
                {path.label}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-5">{path.desc}</p>
              <span className="link-underline text-sm font-medium text-gold uppercase tracking-wider2">
                {tr('Enter →', 'Entrar →', '进入 →')}
              </span>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
