import type { CSSProperties } from 'react'
import Stage from './Stage'
import { Lines, useLang } from '../i18n'

const LINKS = [
  { label: 'EMAIL', text: 'alochka2015@gmail.com', href: 'mailto:alochka2015@gmail.com', tone: 'magenta' },
  { label: 'LINKEDIN', text: 'alla-kulykova-designer', href: 'https://www.linkedin.com/in/alla-kulykova-designer/', tone: 'ink' },
  { label: 'BEHANCE', text: 'alla-kulykova', href: 'https://www.behance.net/alla-kulykova', tone: 'orange' },
]

export function Postcard({ style }: { style?: CSSProperties }) {
  const { t } = useLang()
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
        <Lines text={t('card.postmark')} />
      </p>

      <p className="postcard__to">{t('card.to')}</p>
      <h3 className="postcard__hello">{t('card.hello')}</h3>

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
  const { t } = useLang()
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
          <span className="eyebrow__label">{t('contact.eyebrow')}</span>
        </p>

        <h2 className="contact-title">
          {t('contact.title')
            .split('\n')
            .map((line, i) => (
              <span key={i} className={i === 2 ? 'contact-title__accent' : undefined}>
                {line}
              </span>
            ))}
        </h2>

        <p className="contact-text">{t('contact.text')}</p>

        <div className="cv-buttons">
          <a className="cv-btn cv-btn--primary" href="/cv/Alla_Kulykova_UIUX_CV.pdf" download>
            {t('contact.cvEn')}
          </a>
          <a className="cv-btn cv-btn--ghost" href="/cv/Alla_Kulykova_UIUX_CV_ES.pdf" download>
            {t('contact.cvEs')}
          </a>
        </div>

        <Postcard />
        <img className="postcard-pin" src="/assets/pin-magenta.png" alt="" width={18} height={18} />
      </div>

      <footer className="site-footer">
        <p>{t('footer.copy')}</p>
        <nav aria-label="Social links">
          <a href="https://www.linkedin.com/in/alla-kulykova-designer/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.behance.net/alla-kulykova" target="_blank" rel="noreferrer">Behance</a>
          <a href="mailto:alochka2015@gmail.com">Email</a>
        </nav>
        <a href="#home">{t('footer.top')}</a>
      </footer>
    </Stage>
  )
}
