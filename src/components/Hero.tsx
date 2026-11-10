import { useEffect, useState } from 'react'

const DESIGN_W = 1440
const DESIGN_H = 1024

const TABS = [
  { label: 'HOME', cls: 'tab--home', href: '#home' },
  { label: 'PROJECTS', cls: 'tab--projects', href: '#projects' },
  { label: 'ABOUT', cls: 'tab--about', href: '#about' },
  { label: 'CONTACT', cls: 'tab--contact', href: '#contact' },
]

const LANGS = ['EN', 'UA', 'ES']

/** Fits the 1440×1024 desktop composition into the window and centers it. */
function useStageFit() {
  const [fit, setFit] = useState({ scale: 1, left: 0, top: 0 })
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const scale = Math.min(w / DESIGN_W, h / DESIGN_H)
      setFit({
        scale,
        left: (w - DESIGN_W * scale) / 2,
        top: (h - DESIGN_H * scale) / 2,
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return fit
}

export default function Hero() {
  const { scale, left, top } = useStageFit()

  return (
    <main id="home" className="viewport">
      <div
        className="stage"
        style={{ left, top, transform: `scale(${scale})` }}
      >
        <nav className="tabs" aria-label="Main">
          {TABS.map((t) => (
            <a key={t.label} className={`tab ${t.cls}`} href={t.href}>
              <span>{t.label}</span>
            </a>
          ))}
        </nav>

        <div className="sheet-back" aria-hidden="true" />

        <section className="sheet">
          <div className="sheet__grid" aria-hidden="true" />
          <div className="sheet__margin" aria-hidden="true" />

          <ul className="lang" aria-label="Language">
            {LANGS.map((l, i) => (
              <li key={l} className={i === 0 ? 'is-active' : ''}>
                {l}
              </li>
            ))}
          </ul>

          <span className="role-pill">UX/UI DESIGNER</span>
          <h1 className="name">ALLA KULYKOVA</h1>

          <img
            className="portrait"
            src="/assets/portrait.png"
            alt="Alla Kulykova"
            width={679}
            height={679}
          />

          <div className="intro">
            <p>
              I design user-friendly and visually distinctive interfaces for
              businesses and product teams — easy to use and easy to recognise.
            </p>
            <div className="buttons">
              <a className="btn btn--primary" href="mailto:alochka2015@gmail.com">
                Email me
              </a>
              <a className="btn btn--ghost" href="#projects">
                Projects
              </a>
            </div>
          </div>

          <dl className="facts">
            <dt>BASED IN</dt>
            <dd>Spain</dd>
            <dt>LANGUAGES</dt>
            <dd>EN · UA · ES</dd>
          </dl>

          <img
            className="badge"
            src="/assets/badge.png"
            alt="Open to junior roles"
            width={153}
            height={153}
          />
        </section>

        <div className="spiral" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <img key={i} src="/assets/spiral-ring.png" alt="" width={26} height={64} />
          ))}
        </div>
      </div>
    </main>
  )
}
