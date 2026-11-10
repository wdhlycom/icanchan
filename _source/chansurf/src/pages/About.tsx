import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

export default function About() {
  const { lang } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  useSEO({
    title: tr('About', 'Acerca de', '关于'),
    description: tr(
      'Meet Hu, the founder of canchan.com. Our mission: rational philosophy, not preaching. Chan cognitive tools for the modern mind.',
      'Conoce a Hu, el fundador de canchan.com. Nuestra misión: filosofía racional, no predicación. Herramientas cognitivas Chan para la mente moderna.',
      '认识Hu，canchan.com的创办人。我们的使命：理性哲学，不布道。为现代心智而设的禅之认知工具。',
    ),
    path: `${prefix}/about`,
  });

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      <article className="container-editorial">
        <span className="tag text-gold">{tr('About', 'Acerca de', '关于')}</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4 mb-6 leading-[1.1] tracking-tightest">
          {tr(
            'We do not preach. We offer tools.',
            'No predicamos. Ofrecemos herramientas.',
            '我们不布道。我们提供工具。',
          )}
        </h1>

        <div className="article-body">
          <p>
            {tr(
              'canchan.com began with a simple frustration: all the content about Zen and meditation on the internet falls into one of two extremes. Either it is devotional — incense, chanting, the aesthetic of Eastern mysticism packaged for Western consumption. Or it is instrumental — meditation as performance optimization, mindfulness as a productivity hack. Neither touches the root.',
              'canchan.com comenzó con una frustración simple: todo el contenido sobre Zen y meditación en internet cae en uno de dos extremos. O es devocional — incienso, cantos, la estética del misticismo oriental empaquetada para el consumo occidental. O es instrumental — meditación como optimización de rendimiento, mindfulness como hack de productividad. Ninguno toca la raíz.',
              'canchan.com始于一个简单的心结：互联网上所有关于Zen和冥想的内容都落入两个极端之一。要么是虔诚的——香、诵、为西方消费包装的东方神秘主义美学。要么是工具性的——冥想作为绩效优化，正念作为生产力技巧。两者都没有触及根源。',
            )}
          </p>

          <h2>{tr('Meet Hu', 'Conoce a Hu', '认识Hu')}</h2>
          <p>
            {tr(
              'I am Hu. I spent years studying Chinese philosophy — not as devotion but as serious thought. What I found in Chan was not a religion but a cognitive system: a set of tools for observing how the mind constructs its own experience, and for questioning those constructions until they loosen.',
              'Soy Hu. Pasé años estudiando filosofía china — no como devoción sino como pensamiento serio. Lo que encontré en Chan no fue una religión sino un sistema cognitivo: un conjunto de herramientas para observar cómo la mente construye su propia experiencia, y para cuestionar esas construcciones hasta que se aflojen.',
              '我是Hu。我花了多年研究中国哲学——不是作为信仰，而是作为严肃思考。我在禅中找到的不是宗教，而是一套认知系统：一组工具，用于观察心识如何构建自身体验，并质询那些构建，直到它们松动。',
            )}
          </p>
          <p>
            {tr(
              'My background is not monastic. It is intellectual and practical. I believe Chan philosophy deserves a treatment that respects its rigor without imposing its religion. And I believe there are people — perhaps you — who want the rigor without the incense.',
              'Mi formación no es monástica. Es intelectual y práctica. Creo que la filosofía Chan merece un tratamiento que respete su rigor sin imponer su religión. Y creo que hay personas — quizás tú — que quieren el rigor sin el incienso.',
              '我的背景不是寺院。是智识的、实践的。我相信禅的哲学值得一种尊重其严谨而不强加其宗教的对待。我也相信，有人——也许就是你——想要那份严谨，却不愿点香。',
            )}
          </p>

          <h2>{tr('The Mission', 'La Misión', '使命')}</h2>
          <p>
            {tr(
              'canchan.com exists to do three things: First, to present Chan as what it functionally is — a system of cognitive tools, not a faith. Second, to offer a structured reading path, chapter by chapter, so you can build a real intellectual understanding, not a collection of quotes. Third, to curate retreats and objects that embody Chan principles — not as spiritual merchandise but as infrastructure for practice.',
              'canchan.com existe para hacer tres cosas: Primero, presentar Chan como lo que funcionalmente es — un sistema de herramientas cognitivas, no una fe. Segundo, ofrecer un camino de lectura estructurado, capítulo por capítulo, para que puedas construir una comprensión intelectual real, no una colección de citas. Tercero, curar retiros y objetos que encarnan los principios Chan — no como mercancía espiritual sino como infraestructura para la práctica.',
              'canchan.com只做三件事：第一，将禅呈现为其功能上的本来面目——一套认知工具，不是信仰。第二，提供一条结构化的阅读路径，逐章展开，让你能建立真正的智识理解，而非语录集。第三，甄选体现禅之原则的禅修与器物——不是灵性商品，而是修行的基础设施。',
            )}
          </p>

          <blockquote>
            {tr(
              'We surf the source, not the wave. The wave is the aesthetic. The source is the function.',
              'Surfeamos la fuente, no la ola. La ola es la estética. La fuente es la función.',
              '我们冲浪于源头，而非浪尖。浪是美学。源是功能。',
            )}
          </blockquote>

          <h2>{tr('Contact', 'Contacto', '联系')}</h2>
          <p>
            {tr(
              'For collaborations, editorial inquiries, or just to say hello, write to us at ',
              'Para colaboraciones, preguntas editoriales, o simplemente para decir hola, escríbenos a ',
              '合作、编辑咨询，或只是打个招呼，请写信至 ',
            )}
            <a href="mailto:hello@canchan.com" className="text-gold link-underline">hello@canchan.com</a>.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-divider text-center">
          <Link to={`${prefix}/subscribe`} className="btn-gold">
            {tr('Join the quiet circle', 'Únete al círculo silencioso', '加入静默之圈')}
          </Link>
        </div>
      </article>
    </div>
  );
}
