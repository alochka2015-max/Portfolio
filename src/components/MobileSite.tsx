import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Postcard } from './Contact'

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
  { label: 'HOME', href: '#home', cls: 'm-tab--home' },
  { label: 'PROJECTS', href: '#projects', cls: 'm-tab--projects' },
  { label: 'ABOUT', href: '#intro', cls: 'm-tab--about' },
  { label: 'CONTACT', href: '#contact', cls: 'm-tab--contact' },
]

type Project = {
  n: string; kind: string; badge: string
  numberTone: string; badgeTone: string
  title: string; text: string; image: string; alt: string
  pin: 'magenta' | 'orange' | 'ink'
}
const PROJECTS: Project[] = [
  { n: '01', kind: 'Mobile app', badge: 'CONCEPT', numberTone: 'magenta', badgeTone: 'magenta', title: 'NEVER LOSE YOUR RECEIPT', text: 'A mobile assistant that keeps receipts in one place, tracks return and warranty terms, and reminds you before they expire.', image: '/assets/project-1.png', alt: 'Never Lose Your Receipt app screens', pin: 'magenta' },
  { n: '02', kind: 'Website', badge: 'STUDY PROJECT', numberTone: 'orange', badgeTone: 'orange', title: 'MATHUR GASTROBAR', text: 'A gastrobar website with expressive visual storytelling — typography, page composition and a strong visual hierarchy.', image: '/assets/project-2.png', alt: 'Mathur Gastrobar website', pin: 'orange' },
  { n: '03', kind: 'Website', badge: 'STUDY PROJECT', numberTone: 'rose', badgeTone: 'orange', title: 'OLGA', text: 'A website built on one visual concept across every page, with a consistent UI system and adaptive layouts.', image: '/assets/project-3.png', alt: 'Olga website', pin: 'ink' },
  { n: '04', kind: 'Website', badge: 'STUDY PROJECT', numberTone: 'ink', badgeTone: 'orange', title: 'AURUM', text: 'A premium website and brand identity for a dental implant clinic — a clear page structure and a calm, trustworthy visual system.', image: '/assets/project-4.png', alt: 'Aurum dental clinic website', pin: 'ink' },
  { n: '05', kind: 'Mobile app', badge: 'UX RESEARCH + UI', numberTone: 'magenta', badgeTone: 'rose', title: 'BOOK MOOD', text: 'A social reading app with book clubs, shared deadlines and gentle motivation — from persona and competitor analysis to user flow and UI.', image: '/assets/project-5.png', alt: 'Book Mood reading app screens', pin: 'magenta' },
]
const FOLDER_COLORS = ['#8f7ae0', '#fda009', '#e8608f', '#7a4a43', '#b520cc']
const TILTS = [-2, 2.2, -1.6, 1.8, -2.2]
const CARD_ROT = [1.2, -1, 1, -1.2, 1]
const FILTERS = ['ALL · 5', 'WEB · 3', 'MOBILE · 2', 'UX RESEARCH · 1']
const PIN_SRC = { magenta: '/assets/pin-magenta.png', orange: '/assets/pin-orange.png', ink: '/assets/pin.png' }

const SKILLS = [
  ['UX/UI DESIGN', 'magenta'], ['USER SCENARIOS', 'ink'], ['INTERFACE STRUCTURE', 'ink'],
  ['VISUAL HIERARCHY', 'ink'], ['COMPOSITION', 'orange'], ['TYPOGRAPHY', 'ink'], ['ADAPTIVE DESIGN', 'ink'],
]

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4.2 9.4l3.3 3.3 6.3-7.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Back({ rot, shift = 0 }: { rot: number; shift?: number }) {
  return <div className="m-back" style={{ '--rot': `${rot}deg`, '--shift': `${shift}px` } as CSSProperties} aria-hidden="true" />
}

function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <p className="m-eyebrow">
      <span>{n}</span>
      <span className="m-eyebrow__label">{label}</span>
    </p>
  )
}

export default function MobileSite() {
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(() => window.innerWidth / W)
  const [h, setH] = useState(0)

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
      <div ref={inner} className="m-inner" style={{ transform: `scale(${scale})` }}>
        {/* ---------- Hero ---------- */}
        <section id="home" className="m-sec m-hero">
          <nav className="m-tabs" aria-label="Sections">
            {TABS.map((t) => (
              <a key={t.label} href={t.href} className={`m-tab ${t.cls}`}><span>{t.label}</span></a>
            ))}
          </nav>
          <Back rot={1} />
          <div className="m-sheet" style={{ top: 64, height: 907 }}>
            <div className="m-grid" />
            <div className="m-margin" />
            <p className="m-lang"><span>EN</span><span>UA</span><span>ES</span></p>
            <div className="m-pill-wrap"><span className="m-pill-tag">UX/UI DESIGNER</span></div>
            <h1 className="m-name">ALLA<br />KULYKOVA</h1>
            <div className="m-photo"><img src="/assets/portrait.png" alt="Alla Kulykova" /></div>
            <div className="m-badge"><i /><p>OPEN TO<br />JUNIOR ROLES</p></div>
            <p className="m-lead">I design user-friendly and visually distinctive interfaces for businesses and product teams — easy to use and easy to recognise.</p>
            <div className="m-buttons">
              <a className="m-btn m-btn--primary" href="mailto:alochka2015@gmail.com">Email me</a>
              <a className="m-btn m-btn--ghost" href="#projects">Projects</a>
            </div>
            <div className="m-facts">
              <div><p>BASED IN</p><b>SPAIN</b></div>
              <div><p>LANGUAGES</p><b>EN · UA · ES</b></div>
            </div>
          </div>
        </section>

        {/* ---------- My path ---------- */}
        <section id="intro" className="m-sec m-path">
          <Back rot={1} />
          <div className="m-sheet" style={{ top: 16, height: 892 }}>
            <div className="m-grid" />
            <div className="m-margin" />
            <Eyebrow n="02" label="MY PATH" />
            <h2 className="m-h2" style={{ fontSize: 58 }}>IT ALL STARTED<br />WITH A <em>NOTEBOOK</em></h2>
            <p className="m-text" style={{ top: 195 }}>I got into design after moving to Spain. While learning Spanish, I wanted to create a workbook for myself — and designing it turned out to be the part I loved most. That’s why this portfolio is a notebook too.</p>
            <div className="m-workbook" aria-hidden="true">
              <div className="m-workbook__cover">
                <b>CUADERNO<br />DE ESPAÑOL</b>
                <span>VOL. 1 · MY OWN WORKBOOK</span>
              </div>
              {['hola  —  hello', 'libro  —  book', 'cuaderno  —  notebook', 'diseño  —  design'].map((t, i) => (
                <p key={t} className={i === 3 ? 'is-hot' : ''} style={{ top: 130.26 + 37.44 * i }}>{t}</p>
              ))}
              {Array.from({ length: 8 }, (_, i) => <i key={i} className="m-workbook__line" style={{ top: 142.74 + 18.72 * i }} />)}
              {Array.from({ length: 6 }, (_, i) => <img key={i} className="m-workbook__dot" src="/assets/workbook-dot.png" alt="" style={{ top: 136.5 + 23.4 * i }} />)}
            </div>
            <div className="m-today">
              <div>
                <p>TODAY</p>
                <p>I design interfaces for web and mobile — from user scenarios to adaptive layouts.</p>
              </div>
            </div>
            <img className="m-today-pin" src="/assets/pin.png" alt="" />
            <p className="m-note"><img src="/assets/note-dot.png" alt="" />All projects here are study and concept work.</p>
          </div>
        </section>

        {/* ---------- Selected projects ---------- */}
        <section id="projects" className="m-sec m-projects">
          <Back rot={1} />
          <div className="m-sheet m-sheet--flow">
            <div className="m-grid" />
            <div className="m-margin" />
            <div className="m-projects__head">
              <Eyebrow n="03" label="SELECTED PROJECTS" />
              <h2 className="m-h2 m-projects__title" style={{ fontSize: 72, lineHeight: 0.9 }}>SELECTED<br />PROJECTS</h2>
              <span className="m-count">(5)</span>
              <p className="m-text m-projects__lead">Five projects — two mobile apps and three websites. Each opens a short case.</p>
              <div className="m-filters">
                {FILTERS.map((f, i) => <span key={f} className={i === 0 ? 'is-on' : ''}>{f}</span>)}
              </div>
            </div>
            <div className="m-cards">
              {PROJECTS.map((p, i) => (
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
                        <span className="card__kind">{p.kind}</span>
                        <span className={`card__badge tone-${p.badgeTone}`}>{p.badge}</span>
                      </div>
                      <h3 className="card__title">{p.title}</h3>
                      <p className="card__text">{p.text}</p>
                      <a className="card__link" href="#projects">View case →</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a className="m-btn m-btn--ghost m-all" href="#projects">ALL PROJECTS →</a>
          </div>
        </section>

        {/* ---------- Skills ---------- */}
        <section id="skills" className="m-sec m-skills">
          <Back rot={-1} />
          <div className="m-sheet" style={{ top: 16, height: 788 }}>
            <div className="m-grid" />
            <div className="m-margin" />
            <Eyebrow n="04" label="SKILLS & TOOLS" />
            <h2 className="m-h2" style={{ fontSize: 64, lineHeight: 1.2 }}>WHAT I BRING</h2>
            <ul className="m-checks">
              {SKILLS.map(([label, tone]) => (
                <li key={label}>
                  <span className={`m-check tone-${tone}`}><Check /></span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <div className="m-sticker m-sticker--figma">
              <i /><b>FIGMA</b><span>DESIGN &amp; PROTOTYPING</span>
            </div>
            <div className="m-sticker m-sticker--ai">
              <i /><b>AI TOOLS</b><span>IDEAS &amp; SPEED</span>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="m-sec m-contact">
          <Back rot={1} />
          <div className="m-sheet" style={{ top: 16, height: 881 }}>
            <div className="m-grid" />
            <div className="m-margin" />
            <Eyebrow n="05" label="CONTACT" />
            <h2 className="m-h2" style={{ fontSize: 72, lineHeight: 0.86 }}>
              LET’S TALK<br />ABOUT YOUR<br /><em>PRODUCT</em><br />OR ROLE
            </h2>
            <p className="m-text" style={{ top: 340 }}>Open to UX/UI roles and freelance projects. Email is the fastest way to reach me.</p>
            <div className="m-postcard">
              <Postcard style={{ position: 'static', transform: 'rotate(-2deg)' }} />
            </div>
            <div className="m-cv">
              <a className="m-btn m-btn--primary" href="/cv/Alla_Kulykova_UIUX_CV.pdf" download>Download CV · EN</a>
              <a className="m-btn m-btn--ghost" href="/cv/Alla_Kulykova_UIUX_CV_ES.pdf" download>CV · ES</a>
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
          <div><p>© 2026 Alla Kulykova</p><a href="#home">Back to top ↑</a></div>
        </footer>
      </div>
    </main>
  )
}
