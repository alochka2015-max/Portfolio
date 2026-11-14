import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'ua' | 'es'
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ua', label: 'UA' },
  { code: 'es', label: 'ES' },
]
const IDX: Record<Lang, number> = { en: 0, ua: 1, es: 2 }

/** [English, Ukrainian, Spanish]; "\n" is a line break */
const D: Record<string, [string, string, string]> = {
  // navigation + hero
  'tab.home': ['HOME', 'ГОЛОВНА', 'INICIO'],
  'tab.projects': ['PROJECTS', 'ПРОЄКТИ', 'PROYECTOS'],
  'tab.about': ['ABOUT', 'ПРО МЕНЕ', 'SOBRE MÍ'],
  'tab.contact': ['CONTACT', 'КОНТАКТИ', 'CONTACTO'],
  'name.1': ['ALLA', 'АЛЛА', 'ALLA'],
  'name.2': ['KULYKOVA', 'КУЛИКОВА', 'KULYKOVA'],
  'footer.copy': ['© 2026 Alla Kulykova', '© 2026 Алла Куликова', '© 2026 Alla Kulykova'],
  'hero.role': ['UX/UI DESIGNER', 'UX/UI ДИЗАЙНЕРКА', 'DISEÑADORA UX/UI'],
  'hero.lead': [
    'I design user-friendly and visually distinctive interfaces for businesses and product teams — easy to use and easy to recognise.',
    'Проєктую зручні та візуально виразні інтерфейси для бізнесу й продуктових команд — щоб ними було легко користуватися і легко впізнати серед інших.',
    'Diseño interfaces fáciles de usar y visualmente distintivas para empresas y equipos de producto: sencillas de usar y fáciles de reconocer.',
  ],
  'hero.email': ['Email me', 'Написати мені', 'Escríbeme'],
  'hero.projects': ['Projects', 'Проєкти', 'Proyectos'],
  'hero.basedIn': ['BASED IN', 'ПРОЖИВАЮ В', 'VIVO EN'],
  'hero.spain': ['Spain', 'Іспанії', 'España'],
  'hero.languages': ['LANGUAGES', 'МОВИ', 'IDIOMAS'],
  'hero.badge': ['OPEN TO\nJUNIOR ROLES', 'ГОТОВА ДО\nJUNIOR-РОЛЕЙ', 'ABIERTA A\nPUESTOS JUNIOR'],
  // my path
  'path.eyebrow': ['MY PATH', 'МІЙ ШЛЯХ', 'MI CAMINO'],
  'path.l1': ['IT ALL STARTED', 'ВСЕ ПОЧАЛОСЯ', 'TODO EMPEZÓ'],
  'path.l2a': ['WITH A ', 'ЗІ ', 'CON UN '],
  'path.l2b': ['NOTEBOOK', 'ЗОШИТА', 'CUADERNO'],
  'path.text': [
    'I got into design after moving to Spain. While learning Spanish, I wanted to create a workbook for myself — and designing it turned out to be the part I loved most. That’s why this portfolio is a notebook too.',
    'Я прийшла в дизайн після переїзду до Іспанії. Вивчаючи іспанську, я захотіла створити зошит для себе — і саме його дизайн виявився тим, що сподобалося найбільше. Тому це портфоліо теж зошит.',
    'Llegué al diseño después de mudarme a España. Mientras aprendía español quise crear un cuaderno para mí, y diseñarlo resultó ser lo que más me gustó. Por eso este portfolio también es un cuaderno.',
  ],
  'path.note': [
    'All projects here are study\nand concept work.',
    'Усі проєкти тут — навчальні\nта концептуальні.',
    'Todos los proyectos son\ntrabajos de estudio y conceptuales.',
  ],
  'path.noteM': [
    'All projects here are study and concept work.',
    'Усі проєкти тут — навчальні та концептуальні.',
    'Todos los proyectos son de estudio y conceptuales.',
  ],
  'path.vol': ['VOL. 1 · MY OWN WORKBOOK', 'ТОМ 1 · МІЙ ВЛАСНИЙ ЗОШИТ', 'VOL. 1 · MI PROPIO CUADERNO'],
  'word.hello': ['hello', 'привіт', 'hello'],
  'word.book': ['book', 'книга', 'book'],
  'word.notebook': ['notebook', 'зошит', 'notebook'],
  'word.design': ['design', 'дизайн', 'design'],
  'path.today': ['TODAY', 'СЬОГОДНІ', 'HOY'],
  'path.sticky': [
    'I design interfaces for web and mobile — from user scenarios to adaptive layouts.',
    'Проєктую інтерфейси для вебу й мобільних — від сценаріїв користувачів до адаптивних макетів.',
    'Diseño interfaces para web y móvil: desde escenarios de usuario hasta layouts adaptables.',
  ],
  // projects
  'proj.eyebrow': ['SELECTED PROJECTS', 'ОБРАНІ ПРОЄКТИ', 'PROYECTOS DESTACADOS'],
  'proj.title': ['SELECTED PROJECTS', 'ОБРАНІ ПРОЄКТИ', 'PROYECTOS'],
  'proj.titleM': ['SELECTED\nPROJECTS', 'ОБРАНІ\nПРОЄКТИ', 'PROYECTOS\nDESTACADOS'],
  'proj.lead': [
    'Five projects — two mobile apps and three websites. Each opens a short case: concept, research or goal, key decisions and final screens.',
    'П’ять проєктів — два мобільні застосунки та три вебсайти. Кожен відкриває короткий кейс: концепція, дослідження або мета, ключові рішення та фінальні екрани.',
    'Cinco proyectos: dos apps móviles y tres sitios web. Cada uno abre un caso breve: concepto, investigación u objetivo, decisiones clave y pantallas finales.',
  ],
  'proj.leadM': [
    'Five projects — two mobile apps and three websites. Each opens a short case.',
    'П’ять проєктів — два мобільні застосунки та три вебсайти. Кожен відкриває короткий кейс.',
    'Cinco proyectos: dos apps móviles y tres sitios web. Cada uno abre un caso breve.',
  ],
  'filter.all': ['ALL · 5', 'УСІ · 5', 'TODOS · 5'],
  'filter.web': ['WEB · 3', 'ВЕБ · 3', 'WEB · 3'],
  'filter.mobile': ['MOBILE · 2', 'МОБІЛЬНІ · 2', 'MÓVIL · 2'],
  'filter.ux': ['UX RESEARCH · 1', 'UX-РЕСЕРЧ · 1', 'UX · 1'],
  'kind.app': ['Mobile app', 'Мобільний застосунок', 'App móvil'],
  'kind.web': ['Website', 'Вебсайт', 'Sitio web'],
  'badge.concept': ['CONCEPT', 'КОНЦЕПТ', 'CONCEPTO'],
  'badge.study': ['STUDY PROJECT', 'НАВЧАЛЬНИЙ ПРОЄКТ', 'PROYECTO DE ESTUDIO'],
  'badge.research': ['UX RESEARCH + UI', 'UX-ДОСЛІДЖЕННЯ + UI', 'INVESTIGACIÓN UX + UI'],
  'p1.text': [
    'A mobile assistant that keeps receipts in one place, tracks return and warranty terms, and reminds you before they expire.',
    'Мобільний помічник, що зберігає чеки в одному місці, відстежує терміни повернення та гарантії й нагадує, поки вони не закінчилися.',
    'Un asistente móvil que guarda los recibos en un solo lugar, controla los plazos de devolución y garantía y te avisa antes de que caduquen.',
  ],
  'p2.text': [
    'A gastrobar website with expressive visual storytelling — typography, page composition and a strong visual hierarchy.',
    'Вебсайт гастробару з виразним візуальним сторітелінгом — типографіка, композиція сторінок і чітка візуальна ієрархія.',
    'Un sitio web para un gastrobar con una narrativa visual expresiva: tipografía, composición de página y una fuerte jerarquía visual.',
  ],
  'p3.text': [
    'A website built on one visual concept across every page, with a consistent UI system and adaptive layouts.',
    'Вебсайт на одній візуальній концепції для всіх сторінок, з послідовною UI-системою та адаптивними макетами.',
    'Un sitio web construido sobre un único concepto visual en todas las páginas, con un sistema de UI coherente y layouts adaptables.',
  ],
  'p4.text': [
    'A premium website and brand identity for a dental implant clinic — a clear page structure and a calm, trustworthy visual system.',
    'Преміальний вебсайт і айдентика для клініки зубної імплантації — чітка структура сторінок і спокійна візуальна система, якій довіряєш.',
    'Un sitio web premium e identidad de marca para una clínica de implantes dentales: estructura de página clara y un sistema visual sereno y confiable.',
  ],
  'p5.text': [
    'A social reading app with book clubs, shared deadlines and gentle motivation — from persona and competitor analysis to user flow and UI.',
    'Соціальний застосунок для читання з книжковими клубами, спільними дедлайнами та м’якою мотивацією — від персони й аналізу конкурентів до юзер-флоу та UI.',
    'Una app social de lectura con clubes de libros, plazos compartidos y motivación suave: desde la persona y el análisis de competidores hasta el user flow y la UI.',
  ],
  'proj.viewCase': ['View case →', 'Дивитися кейс →', 'Ver caso →'],
  'proj.stickyLabel': ['FULL UX PROCESS', 'ПОВНИЙ UX-ПРОЦЕС', 'PROCESO UX COMPLETO'],
  'proj.stickyText': [
    'PERSONA → COMPETITORS → USER FLOW → UI',
    'ПЕРСОНА → КОНКУРЕНТИ → ЮЗЕР-ФЛОУ → UI',
    'PERSONA → COMPETIDORES → USER FLOW → UI',
  ],
  'proj.all': ['ALL PROJECTS →', 'УСІ ПРОЄКТИ →', 'TODOS LOS PROYECTOS →'],
  // skills
  'skills.eyebrow': ['SKILLS & TOOLS', 'НАВИЧКИ Й ІНСТРУМЕНТИ', 'HABILIDADES Y HERRAMIENTAS'],
  'skills.title': ['WHAT I BRING', 'ЩО Я ПРИНОШУ', 'LO QUE APORTO'],
  'skills.skills': ['SKILLS', 'НАВИЧКИ', 'HABILIDADES'],
  'skills.tools': ['TOOLS', 'ІНСТРУМЕНТИ', 'HERRAMIENTAS'],
  'skill.1': ['UX/UI DESIGN', 'UX/UI ДИЗАЙН', 'DISEÑO UX/UI'],
  'skill.2': ['USER SCENARIOS', 'СЦЕНАРІЇ КОРИСТУВАЧІВ', 'ESCENARIOS DE USUARIO'],
  'skill.3': ['INTERFACE STRUCTURE', 'СТРУКТУРА ІНТЕРФЕЙСУ', 'ESTRUCTURA DE INTERFAZ'],
  'skill.4': ['VISUAL HIERARCHY', 'ВІЗУАЛЬНА ІЄРАРХІЯ', 'JERARQUÍA VISUAL'],
  'skill.5': ['COMPOSITION', 'КОМПОЗИЦІЯ', 'COMPOSICIÓN'],
  'skill.6': ['TYPOGRAPHY', 'ТИПОГРАФІКА', 'TIPOGRAFÍA'],
  'skill.7': ['ADAPTIVE DESIGN', 'АДАПТИВНИЙ ДИЗАЙН', 'DISEÑO ADAPTABLE'],
  'skills.figmaSub': ['DESIGN & PROTOTYPING', 'ДИЗАЙН І ПРОТОТИПИ', 'DISEÑO Y PROTOTIPOS'],
  'skills.aiSub': ['IDEAS & SPEED', 'ІДЕЇ ТА ШВИДКІСТЬ', 'IDEAS Y VELOCIDAD'],
  'skills.noteLabel': ['ALWAYS LEARNING', 'ЗАВЖДИ ВЧУСЬ', 'SIEMPRE APRENDIENDO'],
  'skills.noteText': [
    'Every project in this portfolio is a step in learning UX/UI — from structure to final screens.',
    'Кожен проєкт у цьому портфоліо — крок у вивченні UX/UI: від структури до фінальних екранів.',
    'Cada proyecto de este portfolio es un paso en mi aprendizaje de UX/UI: de la estructura a las pantallas finales.',
  ],
  // contact
  'contact.eyebrow': ['CONTACT', 'КОНТАКТИ', 'CONTACTO'],
  'contact.title': [
    'LET’S TALK\nABOUT YOUR\nPRODUCT\nOR ROLE',
    'ПОГОВОРИМО\nПРО ВАШ\nПРОДУКТ\nАБО РОЛЬ',
    'HABLEMOS\nDE TU\nPRODUCTO\nO PUESTO',
  ],
  'contact.text': [
    'Open to UX/UI roles and freelance projects. Email is the fastest way to reach me.',
    'Відкрита до UX/UI-ролей і фріланс-проєктів. Найшвидше — написати на пошту.',
    'Abierta a puestos UX/UI y proyectos freelance. El email es la forma más rápida de contactarme.',
  ],
  'contact.cvEn': ['Download CV · EN', 'Завантажити CV · EN', 'Descargar CV · EN'],
  'contact.cvEs': ['CV · ES', 'CV · ES', 'CV · ES'],
  'card.to': ['TO: ALLA KULYKOVA', 'ДО: АЛЛА КУЛИКОВА', 'PARA: ALLA KULYKOVA'],
  'card.hello': ['SAY HELLO', 'ПРИВІТ', 'SALUDA'],
  'card.postmark': ['SPAIN\n2026', 'ІСПАНІЯ\n2026', 'ESPAÑA\n2026'],
  'footer.top': ['Back to top ↑', 'Нагору ↑', 'Volver arriba ↑'],
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }
const LangCtx = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: (k) => k })

function initial(): Lang {
  try {
    const s = localStorage.getItem('lang')
    if (s === 'en' || s === 'ua' || s === 'es') return s
  } catch { /* storage may be unavailable */ }
  const n = (navigator.language || 'en').toLowerCase()
  if (n.startsWith('uk')) return 'ua'
  if (n.startsWith('es')) return 'es'
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, set] = useState<Lang>(initial)
  const setLang = useCallback((l: Lang) => {
    set(l)
    try { localStorage.setItem('lang', l) } catch { /* ignore */ }
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang
  }, [lang])
  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (k) => (D[k] ? D[k][IDX[lang]] : k) }),
    [lang, setLang],
  )
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)

/** text with "\n" line breaks */
export function Lines({ text }: { text: string }) {
  const parts = text.split('\n')
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}
