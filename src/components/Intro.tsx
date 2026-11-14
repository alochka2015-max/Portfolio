import Stage from './Stage'
import PageTabs from './PageTabs'
import { Lines, useLang } from '../i18n'

const WORDS = [
  { es: 'hola', key: 'word.hello' },
  { es: 'libro', key: 'word.book' },
  { es: 'cuaderno', key: 'word.notebook' },
  { es: 'diseño', key: 'word.design', accent: true },
]

export default function Intro() {
  const { t } = useLang()
  return (
    <Stage id="intro" height={860}>
      <PageTabs current="about" />
      <div className="intro-back" aria-hidden="true" />

      <div className="sheet sheet--intro">
        <div className="sheet__grid" aria-hidden="true" />
        <div className="sheet__margin sheet__margin--intro" aria-hidden="true" />

        {[139, 359, 579].map((top) => (
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
          <span>02</span>
          <span className="eyebrow__label">{t('path.eyebrow')}</span>
        </p>

        <h2 className="statement">
          <span>{t('path.l1')}</span>
          <span>
            {t('path.l2a')}<em>{t('path.l2b')}</em>
          </span>
        </h2>

        <div className="intro-text">
          <p>{t('path.text')}</p>
          <div className="note">
            <img src="/assets/note-dot.png" alt="" width={10} height={10} />
            <p>
              <Lines text={t('path.note')} />
            </p>
          </div>
        </div>

        <div className="workbook" aria-label="Cuaderno de español, vol. 1">
          <div className="workbook__cover" />
          <p className="workbook__title">
            CUADERNO
            <br />
            DE ESPAÑOL
          </p>
          <p className="workbook__vol">{t('path.vol')}</p>
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="workbook__rule" style={{ top: 183 + i * 24 }} />
          ))}
          {WORDS.map((w, i) => (
            <p
              key={w.es}
              className={`workbook__word${w.accent ? ' is-accent' : ''}`}
              style={{ top: 167 + i * 48 }}
            >
              {w.es}&nbsp;&nbsp;—&nbsp;&nbsp;{t(w.key)}
            </p>
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <img
              key={i}
              className="workbook__dot"
              style={{ top: 175 + i * 30 }}
              src="/assets/workbook-dot.png"
              alt=""
              width={10}
              height={10}
            />
          ))}
        </div>

        <div className="sticky">
          <p className="sticky__label">{t('path.today')}</p>
          <p className="sticky__text">{t('path.sticky')}</p>
        </div>

        <img className="pin" src="/assets/pin.png" alt="" width={18} height={18} />
      </div>
    </Stage>
  )
}
