import Stage from './Stage'
import PageTabs from './PageTabs'
import { useLang } from '../i18n'

const SKILLS = [
  { key: 'skill.1', tone: 'magenta' },
  { key: 'skill.2', tone: 'ink' },
  { key: 'skill.3', tone: 'ink' },
  { key: 'skill.4', tone: 'ink' },
  { key: 'skill.5', tone: 'orange' },
  { key: 'skill.6', tone: 'ink' },
  { key: 'skill.7', tone: 'ink' },
]

export default function Skills() {
  const { t } = useLang()
  return (
    <Stage id="skills" height={990}>
      <PageTabs current="about" />
      <div className="skills-back" aria-hidden="true" />

      <div className="sheet sheet--skills">
        <div className="sheet__grid" aria-hidden="true" />
        <div className="sheet__margin sheet__margin--skills" aria-hidden="true" />

        {[149, 379, 609].map((top) => (
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
          <span>04</span>
          <span className="eyebrow__label">{t('skills.eyebrow')}</span>
        </p>

        <h2 className="skills-title">{t('skills.title')}</h2>

        <div className="skills-list">
          <p className="skills-label">{t('skills.skills')}</p>
          <ul>
            {SKILLS.map((s) => (
              <li key={s.key} className="skill">
                <span className={`skill__box tone-${s.tone}`} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M4.2 9.4l3.3 3.3 6.3-7.4"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="skill__label">{t(s.key)}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="skills-label tools-label">{t('skills.tools')}</p>

        <div className="sticker sticker--figma">
          <span className="sticker__ring" aria-hidden="true" />
          <div className="sticker__text">
            <p className="sticker__title">FIGMA</p>
            <p className="sticker__sub">{t('skills.figmaSub')}</p>
          </div>
        </div>

        <div className="sticker sticker--ai">
          <span className="sticker__ring" aria-hidden="true" />
          <div className="sticker__text">
            <p className="sticker__title">AI TOOLS</p>
            <p className="sticker__sub">{t('skills.aiSub')}</p>
          </div>
        </div>

        <div className="skills-note">
          <p className="skills-note__title">{t('skills.noteLabel')}</p>
          <p className="skills-note__text">{t('skills.noteText')}</p>
        </div>
        <img className="skills-pin" src="/assets/pin.png" alt="" width={16} height={16} />
      </div>
    </Stage>
  )
}
