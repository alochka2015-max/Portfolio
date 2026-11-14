import Stage from './Stage'
import PageTabs from './PageTabs'
import { Lines, useLang } from '../i18n'

export const CERT_PDF = '/cert/Alla_Kulykova_GoIT_UX-UI_Design_Certificate.pdf'

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

        <a className="cert" href={CERT_PDF} target="_blank" rel="noreferrer">
          <img className="cert__img" src="/assets/cert.jpg" alt={t('path.certAlt')} width={440} height={311} />
          <span className="cert__caption">{t('path.cert')}</span>
          <span className="cert__link">{t('path.certLink')}</span>
        </a>
        <a className="cert cert--ai" href="/assets/cert-ai.jpg" target="_blank" rel="noreferrer">
          <img className="cert__img" src="/assets/cert-ai.jpg" alt={t('path.cert2Alt')} width={230} height={229} />
          <span className="cert__caption">{t('path.cert2')}</span>
        </a>
        <img className="pin cert__pin" src="/assets/pin.png" alt="" width={18} height={18} />
      </div>
    </Stage>
  )
}
