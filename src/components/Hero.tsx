import Stage from './Stage'
import { LANGS, Lines, useLang } from '../i18n'

export default function Hero() {
  const { lang, setLang, t } = useLang()
  return (
    <Stage id="home" height={1024}>
        <div className="sheet-back" aria-hidden="true" />

        <section className="sheet">
          <div className="sheet__grid" aria-hidden="true" />
          <div className="sheet__margin" aria-hidden="true" />

          <ul className="lang" aria-label="Language">
            {LANGS.map((l) => (
              <li key={l.code} className={l.code === lang ? 'is-active' : ''}>
                <button type="button" onClick={() => setLang(l.code)} aria-pressed={l.code === lang}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <span className="role-pill">{t('hero.role')}</span>
          <h1 className="name">{t('name.1')} {t('name.2')}</h1>

          <img
            className="portrait"
            src="/assets/portrait.png"
            alt="Alla Kulykova"
            width={679}
            height={679}
          />

          <div className="intro">
            <p>{t('hero.lead')}</p>
            <div className="buttons">
              <a className="btn btn--primary" href="mailto:alochka2015@gmail.com">
                {t('hero.email')}
              </a>
              <a className="btn btn--ghost" href="#projects">
                {t('hero.projects')}
              </a>
            </div>
          </div>

          <dl className="facts">
            <dt>{t('hero.basedIn')}</dt>
            <dd>{t('hero.spain')}</dd>
            <dt>{t('hero.languages')}</dt>
            <dd>EN · UA · ES</dd>
          </dl>

          <div className="badge" role="img" aria-label={t('hero.badge').replace('\n', ' ')}>
            <i aria-hidden="true" />
            <p aria-hidden="true">
              <Lines text={t('hero.badge')} />
            </p>
          </div>
        </section>

        <div className="spiral" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <img key={i} src="/assets/spiral-ring.png" alt="" width={26} height={64} />
          ))}
        </div>
    </Stage>
  )
}
