import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { matchesFilter } from '../filters'
import { CASE_URL } from '../cases'
import { CERT_PDF } from './Intro'
import { Postcard } from './Contact'
import { LANGS, Lines, useLang } from '../i18n'

const W = 390

export const MOBILE_MAX = 700

/** true on phones: the site then switches to the dedicated 390px layout */
export function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < MOBILE_MAX)
  useEffect(() => {
    const on = () => setM(window.innerWidth < MOBILE_MAX)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return m
}

const TABS = [
  { key: 'tab.home', href: '#home', cls: 'm-tab--home' },
  { key: 'tab.about', href: '#intro', cls: 'm-tab--about' },
  { key: 'tab.projects', href: '#projects', cls: 'm-tab--projects' },
  { key: 'tab.contact', href: '#contact', cls: 'm-tab--contact' },
]

type Project = {
  n: string; kind: string; badge: string
  numberTone: string; badgeTone: string
  title: string; text: string; image: string; alt: string
  pin: 'magenta' | 'orange' | 'ink'
}
const PROJECTS: Project[] = [
  { n: '01', kind: 'kind.app', badge: 'badge.concept', numberTone: 'magenta', badgeTone: 'magenta', title: 'NEVER LOSE YOUR RECEIPT', text: 'p1.text', image: '/assets/project-1.png', alt: 'Never Lose Your Receipt app screens', pin: 'magenta' },
  { n: '02', kind: 'kind.web', badge: 'badge.study', numberTone: 'orange', badgeTone: 'orange', title: 'MATHUR GASTROBAR', text: 'p2.text', image: '/assets/project-2.png', alt: 'Mathur Gastrobar website', pin: 'orange' },
  { n: '03', kind: 'kind.web', badge: 'badge.study', numberTone: 'rose', badgeTone: 'orange', title: 'OLGA', text: 'p3.text', image: '/assets/project-3.png', alt: 'Olga website', pin: 'ink' },
  { n: '04', kind: 'kind.web', badge: 'badge.study', numberTone: 'ink', badgeTone: 'orange', title: 'AURUM', text: 'p4.text', image: '/assets/project-4.png', alt: 'Aurum dental clinic website', pin: 'ink' },
  { n: '05', kind: 'kind.app', badge: 'badge.research', numberTone: 'magenta', badgeTone: 'rose', title: 'BOOK MOOD', text: 'p5.text', image: '/assets/project-5.png', alt: 'Book Mood reading app screens', pin: 'magenta' },
]
const BEHANCE = 'https://www.behance.net/alla-kulykova'
const FOLDER_COLORS = ['#8f7ae0', '#fda009', '#e8608f', '#7a4a43', '#b520cc']
const TILTS = [-2, 2.2, -1.6, 1.8, -2.2]
const CARD_ROT = [1.2, -1, 1, -1.2, 1]
const FILTERS = ['filter.all', 'filter.web', 'filter.mobile', 'filter.ux']
const PIN_SRC = { magenta: '/assets/pin-magenta.png', orange: '/assets/pin-orange.png', ink: '/assets/pin.png' }

const SKILLS = [
  ['skill.1', 'magenta'], ['skill.2', 'ink'], ['skill.3', 'ink'],
  ['skill.4', 'ink'], ['skill.5', 'orange'], ['skill.6', 'ink'], ['skill.7', 'ink'],
]

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4.2 9.4l3.3 3.3 6.3-7.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Back({ rot, shift = 0 }: { rot: number; shift?: number }) {
  return <div className="m-back" style={{ '--rot': `${rot}deg`, '--shift': `${shift}px` } as CSSProperties} aria-hidden="true" />
}

function Eyebrow({ n, label }: { n: string; label: string }) {  // label is already translated
  return (
    <p className="m-eyebrow">
      <span>{n}</span>
      <span className="m-eyebrow__label">{label}</span>
    </p>
  )
}

const NAV_FOR: Record<string, string> = { home: 'home', intro: 'intro', projects: 'projects', skills: 'intro', contact: 'contact' }

/** Compact bar that stays on screen once the hero tabs have scrolled away. */
function StickyNav() {
  const { t } = useLang()
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const ids = ['home', 'intro', 'projects', 'skills', 'contact']
    const on = () => {
      setShow(window.scrollY > 160)
      let cur = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = id
      }
      setActive(NAV_FOR[cur])
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  return (
    <nav className={`m-nav${show ? ' is-shown' : ''}`} aria-label="Sections" aria-hidden={!show}>
      {TABS.map((tb) => (
        <a key={tb.key} href={tb.href} tabIndex={show ? undefined : -1} className={`m-nav__a ${tb.cls.replace('m-tab--', 'm-nav--')}${NAV_FOR[tb.href.slice(1)] === active ? ' is-current' : ''}`}>
          {t(tb.key)}
        </a>
      ))}
    </nav>
  )
}

export default function MobileSite() {
  const { lang, setLang, t } = useLang()
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(() => window.innerWidth / W)
  const [h, setH] = useState(0)
  const [flt, setFlt] = useState(0)
  const cards = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => setScale(window.innerWidth / W)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  useLayoutEffect(() => {
    const el = inner.current
    if (!el) return
    const measure = () => setH(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <main className="m-root" style={{ height: h * scale }}>
      <StickyNav />
      <div ref={inner} className="m-inner" style={{ transform: `scale(${scale})` }}>
        {/* ---------- Hero ---------- */}
        <section id="home" className="m-sec m-hero">
          <nav className="m-tabs" aria-label="Sections">
            {TABS.map((tb) => (
              <a key={tb.key} href={tb.href} className={`m-tab ${tb.cls}`}><span>{t(tb.key)}</span></a>
            ))}
          </nav>
          <Back rot={1} />
          <div className="m-sheet" style={{ top: 64, height: 907 }}>
            <div className="m-grid" />
            <div className="m-margin" />
            <p className="m-lang">
              {LANGS.map((l) => (
                <button key={l.code} type="button" className={l.code === lang ? 'is-on' : ''} aria-pressed={l.code === lang} onClick={() => setLang(l.code)}>{l.label}</button>
              ))}
            </p>
            <div className="m-pill-wrap"><span className="m-pill-tag">{t('hero.role')}</span></div>
            <h1 className="m-name">{t('name.1')}<br />{t('name.2')}</h1>
            <div className="m-photo"><img src="/assets/portrait.png" alt="Alla Kulykova" /></div>
            <div className="m-badge"><i /><p><Lines text={t('hero.badge')} /></p></div>
            <div className="m-flow">
              <p className="m-lead">{t('hero.lead')}</p>
            <div className="m-buttons">
              <a className="m-btn m-btn--primary" href="mailto:alochka2015@gmail.com">{t('hero.email')}</a>
              <a className="m-btn m-btn--ghost" href="#projects">{t('hero.projects')}</a>
            </div>
            <div className="m-facts">
              <div><p>{t('hero.basedIn')}</p><b>{t('hero.spain')}</b></div>
              <div><p>{t('hero.languages')}</p><b>EN · UA · ES</b></div>
            </div>
            </div>
          </div>
        </section>

        {/* ---------- My path ---------- */}
        <section id="intro" className="m-sec m-path">
          <Back rot={1} />
          <div className="m-sheet m-sheet--flow m-path__sheet">
            <div className="m-grid" />
            <div className="m-margin" />
            <Eyebrow n="02" label={t('path.eyebrow')} />
            <h2 className="m-h2" style={{ fontSize: 58 }}>{t('path.l1')}<br />{t('path.l2a')}<em>{t('path.l2b')}</em></h2>
            <div className="m-path__body">
              <p className="m-text">{t('path.text')}</p>
              <a className="m-cert" href={CERT_PDF} target="_blank" rel="noreferrer">
                <img src="/assets/cert.jpg" alt={t('path.certAlt')} width={440} height={311} />
                <span>{t('path.cert')}</span>
                <b>{t('path.certLink')}</b>
              </a>
              <a className="m-cert m-cert--ai" href="/assets/cert-ai.jpg" target="_blank" rel="noreferrer">
                <img src="/assets/cert-ai.jpg" alt={t('path.cert2Alt')} width={200} height={199} />
                <span>{t('path.cert2')}</span>
              </a>
              <p className="m-note"><img src="/assets/note-dot.png" alt="" />{t('path.noteM')}</p>
            </div>
          </div>
        </section>

        {/* ---------- Selected projects ---------- */}
        <section id="projects" className="m-sec m-projects">
          <Back rot={1} />
          <div className="m-sheet m-sheet--flow">
            <div className="m-grid" />
            <div className="m-margin" />
            <div className="m-projects__head">
              <Eyebrow n="03" label={t('proj.eyebrow')} />
              <h2 className="m-h2 m-projects__title" style={{ fontSize: 72, lineHeight: 0.9 }}><Lines text={t('proj.titleM')} /></h2>
              <span className="m-count">(5)</span>
              <div className="m-projects__body">
                <p className="m-text m-projects__lead">{t('proj.leadM')}</p>
                <div className="m-filters">
                  {FILTERS.map((f, i) => <button key={f} type="button" aria-pressed={i === flt} className={i === flt ? 'is-on' : ''} onClick={() => { setFlt(i); cards.current?.scrollTo({ left: 0 }) }}>{t(f)}</button>)}
                </div>
              </div>
            </div>
            <div className="m-cards" ref={cards}>
              {PROJECTS.map((p, i) => matchesFilter(flt, p) && (
                <article
                  key={p.n}
                  className="folder m-card"
                  style={{ '--fc': FOLDER_COLORS[i], '--tilt': `${TILTS[i]}deg`, transform: `rotate(${CARD_ROT[i]}deg)` } as CSSProperties}
                >
                  <div className="folder__back" />
                  <div className="folder__sheet folder__sheet--a" />
                  <div className="folder__sheet folder__sheet--b" />
                  <img className="card__media" src={p.image} alt={p.alt} />
                  <img className="pin folder__pin" src={PIN_SRC[p.pin]} alt="" width={18} height={18} />
                  <div className="folder__front">
                    <div className="card__body">
                      <div className="card__meta">
                        <span className={`card__number tone-${p.numberTone}`}>{p.n}</span>
                        <span className="card__kind">{t(p.kind)}</span>
                        <span className={`card__badge tone-${p.badgeTone}`}>{t(p.badge)}</span>
                      </div>
                      <h3 className="card__title">{p.title}</h3>
                      <p className="card__text">{t(p.text)}</p>
                      <a className="card__link" href={CASE_URL[p.n] ?? BEHANCE} target="_blank" rel="noreferrer">{t('proj.viewCase')}</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a className="m-btn m-btn--ghost m-all" href={BEHANCE} target="_blank" rel="noreferrer">{t('proj.all')}</a>
          </div>
        </section>

        {/* ---------- Skills ---------- */}
        <section id="skills" className="m-sec m-skills">
          <Back rot={-1} />
          <div className="m-sheet" style={{ top: 16, height: 788 }}>
            <div className="m-grid" />
            <div className="m-margin" />
            <Eyebrow n="04" label={t('skills.eyebrow')} />
            <h2 className="m-h2" style={{ fontSize: 64, lineHeight: 1.2 }}>{t('skills.title')}</h2>
            <ul className="m-checks">
              {SKILLS.map(([key, tone]) => (
                <li key={key}>
                  <span className={`m-check tone-${tone}`}><Check /></span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <div className="m-sticker m-sticker--figma">
              <i /><b>FIGMA</b><span>{t('skills.figmaSub')}</span>
            </div>
            <div className="m-sticker m-sticker--ai">
              <i /><b>AI TOOLS</b><span>{t('skills.aiSub')}</span>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="m-sec m-contact">
          <Back rot={1} />
          <div className="m-sheet" style={{ top: 16, height: 881 }}>
            <div className="m-grid" />
            <div className="m-margin" />
            <Eyebrow n="05" label={t('contact.eyebrow')} />
            <h2 className="m-h2" style={{ fontSize: 72, lineHeight: 0.86 }}>
              {t('contact.title').split('\n').map((line, i) => (
                <span key={i} className={i === 2 ? 'm-accent' : undefined}>{line}<br /></span>
              ))}
            </h2>
            <p className="m-text" style={{ top: 340 }}>{t('contact.text')}</p>
            <div className="m-postcard">
              <Postcard style={{ position: 'static', transform: 'rotate(-2deg)' }} />
            </div>
            <div className="m-cv">
              <a className="m-btn m-btn--primary" href="/cv/Alla_Kulykova_UIUX_CV.pdf" download>{t('contact.cvEn')}</a>
              <a className="m-btn m-btn--ghost" href="/cv/Alla_Kulykova_UIUX_CV_ES.pdf" download>{t('contact.cvEs')}</a>
            </div>
          </div>
        </section>

        {/* ---------- Footer ---------- */}
        <footer className="m-footer">
          <nav aria-label="Social links">
            <a href="https://www.linkedin.com/in/alla-kulykova-designer/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.behance.net/alla-kulykova" target="_blank" rel="noreferrer">Behance</a>
            <a href="mailto:alochka2015@gmail.com">Email</a>
          </nav>
          <div><p>{t('footer.copy')}</p><a href="#home">{t('footer.top')}</a></div>
        </footer>
      </div>
    </main>
  )
}
