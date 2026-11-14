import type { CSSProperties } from 'react'
import Stage from './Stage'

const LINKS = [
  { label: 'EMAIL', text: 'alochka2015@gmail.com', href: 'mailto:alochka2015@gmail.com', tone: 'magenta' },
  { label: 'LINKEDIN', text: 'alla-kulykova-designer', href: 'https://www.linkedin.com/in/alla-kulykova-designer/', tone: 'ink' },
  { label: 'BEHANCE', text: 'alla-kulykova', href: 'https://www.behance.net/alla-kulykova', tone: 'orange' },
]

export function Postcard({ style }: { style?: CSSProperties }) {
  return (
    <div className="postcard" style={style}>
      <div className="postcard__stripe" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span
            key={i}
            className={i % 2 ? 'is-orange' : 'is-magenta'}
            style={{ left: -24.96 + 26 * i }}
          />
        ))}
      </div>

      <div className="postcard__stamp" aria-hidden="true">
        <img src="/assets/portrait.png" alt="" />
      </div>
      <div className="postcard__postmark" aria-hidden="true" />
      <p className="postcard__postmark-text" aria-hidden="true">
        SPAIN
        <br />
        2026
      </p>

      <p className="postcard__to">TO: ALLA KULYKOVA</p>
      <h3 className="postcard__hello">SAY HELLO</h3>

      <ul className="postcard__links">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              className="contact-link"
              href={l.href}
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="contact-link__text">
                <span className="contact-link__label">{l.label}</span>
                <span className="contact-link__value">{l.text}</span>
              </span>
              <span className={`contact-link__arrow tone-${l.tone}`} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M6 14L14 6M7 6h7v7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Contact() {
  return (
    <Stage id="contact" height={1000}>
      <div className="contact-back" aria-hidden="true" />

      <div className="sheet sheet--contact">
        <div className="sheet__grid" aria-hidden="true" />
        <div className="sheet__margin sheet__margin--contact" aria-hidden="true" />

        {[149, 389, 629].map((top) => (
          <img
            key={top}
            className="hole"
            style={{ top }}
            src="/assets/hole.png"
            alt=""
            width={18}
            height={18}
          />
        ))}

        <p className="eyebrow">
          <span>05</span>
          <span className="eyebrow__label">CONTACT</span>
        </p>

        <h2 className="contact-title">
          <span>LET’S TALK</span>
          <span>ABOUT YOUR</span>
          <span className="contact-title__accent">PRODUCT</span>
          <span>OR ROLE</span>
        </h2>

        <p className="contact-text">
          Open to UX/UI roles and freelance projects. Email is the fastest way to
          reach me.
        </p>

        <div className="cv-buttons">
          <a className="cv-btn cv-btn--primary" href="/cv/Alla_Kulykova_UIUX_CV.pdf" download>
            Download CV · EN
          </a>
          <a className="cv-btn cv-btn--ghost" href="/cv/Alla_Kulykova_UIUX_CV_ES.pdf" download>
            CV · ES
          </a>
        </div>

        <Postcard />
        <img className="postcard-pin" src="/assets/pin-magenta.png" alt="" width={18} height={18} />
      </div>

      <footer className="site-footer">
        <p>© 2026 Alla Kulykova</p>
        <nav aria-label="Social links">
          <a href="https://www.linkedin.com/in/alla-kulykova-designer/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.behance.net/alla-kulykova" target="_blank" rel="noreferrer">Behance</a>
          <a href="mailto:alochka2015@gmail.com">Email</a>
        </nav>
        <a href="#home">Back to top ↑</a>
      </footer>
    </Stage>
  )
}
