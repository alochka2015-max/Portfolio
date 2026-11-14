import Stage from './Stage'

const SKILLS = [
  { label: 'UX/UI DESIGN', tone: 'magenta' },
  { label: 'USER SCENARIOS', tone: 'ink' },
  { label: 'INTERFACE STRUCTURE', tone: 'ink' },
  { label: 'VISUAL HIERARCHY', tone: 'ink' },
  { label: 'COMPOSITION', tone: 'orange' },
  { label: 'TYPOGRAPHY', tone: 'ink' },
  { label: 'ADAPTIVE DESIGN', tone: 'ink' },
]

export default function Skills() {
  return (
    <Stage id="skills" height={990}>
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
          <span className="eyebrow__label">SKILLS &amp; TOOLS</span>
        </p>

        <h2 className="skills-title">WHAT I BRING</h2>

        <div className="skills-list">
          <p className="skills-label">SKILLS</p>
          <ul>
            {SKILLS.map((s) => (
              <li key={s.label} className="skill">
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
                <span className="skill__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="skills-label tools-label">TOOLS</p>

        <div className="sticker sticker--figma">
          <span className="sticker__ring" aria-hidden="true" />
          <div className="sticker__text">
            <p className="sticker__title">FIGMA</p>
            <p className="sticker__sub">DESIGN &amp; PROTOTYPING</p>
          </div>
        </div>

        <div className="sticker sticker--ai">
          <span className="sticker__ring" aria-hidden="true" />
          <div className="sticker__text">
            <p className="sticker__title">AI TOOLS</p>
            <p className="sticker__sub">IDEAS &amp; SPEED</p>
          </div>
        </div>

        <div className="skills-note">
          <p className="skills-note__title">ALWAYS LEARNING</p>
          <p className="skills-note__text">
            Every project in this portfolio is a step in learning UX/UI — from
            structure to final screens.
          </p>
        </div>
        <img className="skills-pin" src="/assets/pin.png" alt="" width={16} height={16} />
      </div>
    </Stage>
  )
}
