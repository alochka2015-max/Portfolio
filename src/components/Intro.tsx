import Stage from './Stage'

const WORDS = [
  { es: 'hola', en: 'hello' },
  { es: 'libro', en: 'book' },
  { es: 'cuaderno', en: 'notebook' },
  { es: 'diseño', en: 'design', accent: true },
]

export default function Intro() {
  return (
    <Stage id="intro" height={860}>
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
          <span className="eyebrow__label">MY PATH</span>
        </p>

        <h2 className="statement">
          <span>IT ALL STARTED</span>
          <span>
            WITH A <em>NOTEBOOK</em>
          </span>
        </h2>

        <div className="intro-text">
          <p>
            I got into design after moving to Spain. While learning Spanish, I
            wanted to create a workbook for myself — and designing it turned out
            to be the part I loved most. That’s why this portfolio is a notebook
            too.
          </p>
          <div className="note">
            <img src="/assets/note-dot.png" alt="" width={10} height={10} />
            <p>
              All projects here are study
              <br />
              and concept work.
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
          <p className="workbook__vol">VOL. 1 · MY OWN WORKBOOK</p>
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="workbook__rule" style={{ top: 183 + i * 24 }} />
          ))}
          {WORDS.map((w, i) => (
            <p
              key={w.es}
              className={`workbook__word${w.accent ? ' is-accent' : ''}`}
              style={{ top: 167 + i * 48 }}
            >
              {w.es}&nbsp;&nbsp;—&nbsp;&nbsp;{w.en}
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
          <p className="sticky__label">TODAY</p>
          <p className="sticky__text">
            I design interfaces for web and mobile — from user scenarios to
            adaptive layouts.
          </p>
        </div>

        <img className="pin" src="/assets/pin.png" alt="" width={18} height={18} />
      </div>
    </Stage>
  )
}
