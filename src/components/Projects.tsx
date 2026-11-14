import type { CSSProperties } from 'react'
import Stage from './Stage'

type Tone = 'magenta' | 'orange' | 'rose' | 'ink'

type Project = {
  n: string
  kind: string
  badge: string
  numberTone: Tone
  badgeTone: Tone
  title: string
  text: string
  image: string
  alt: string
  /** Behance case link; falls back to the profile */
  href?: string
  /** card center inside the sheet and its tilt, from the Figma frame */
  x: number
  y: number
  rotate: number
  pin: { x: number; y: number; tone: 'magenta' | 'orange' | 'ink' }
}

const PROJECTS: Project[] = [
  {
    n: '01',
    kind: 'Mobile app',
    badge: 'CONCEPT',
    numberTone: 'magenta',
    badgeTone: 'magenta',
    title: 'NEVER LOSE YOUR RECEIPT',
    text: 'A mobile assistant that keeps receipts in one place, tracks return and warranty terms, and reminds you before they expire.',
    image: '/assets/project-1.png',
    alt: 'Never Lose Your Receipt app screens',
    x: 325.74,
    y: 700.57,
    rotate: 1.2,
    pin: { x: 316.74, y: 395, tone: 'magenta' },
  },
  {
    n: '02',
    kind: 'Website',
    badge: 'STUDY PROJECT',
    numberTone: 'orange',
    badgeTone: 'orange',
    title: 'MATHUR GASTROBAR',
    text: 'A gastrobar website with expressive visual storytelling — typography, page composition and a strong visual hierarchy.',
    image: '/assets/project-2.png',
    alt: 'Mathur Gastrobar website',
    x: 882.94,
    y: 719.68,
    rotate: -1,
    pin: { x: 873.94, y: 426.45, tone: 'orange' },
  },
  {
    n: '03',
    kind: 'Website',
    badge: 'STUDY PROJECT',
    numberTone: 'rose',
    badgeTone: 'orange',
    title: 'OLGA',
    text: 'A website built on one visual concept across every page, with a consistent UI system and adaptive layouts.',
    image: '/assets/project-3.png',
    alt: 'Olga website',
    x: 336.94,
    y: 1379.68,
    rotate: -1,
    pin: { x: 327.94, y: 1086.45, tone: 'ink' },
  },
  {
    n: '04',
    kind: 'Website',
    badge: 'STUDY PROJECT',
    numberTone: 'ink',
    badgeTone: 'orange',
    title: 'AURUM',
    text: 'A premium website and brand identity for a dental implant clinic — a clear page structure and a calm, trustworthy visual system.',
    image: '/assets/project-4.png',
    alt: 'Aurum dental clinic website',
    x: 872.22,
    y: 1440.57,
    rotate: 1.2,
    pin: { x: 862.98, y: 1135, tone: 'ink' },
  },
  {
    n: '05',
    kind: 'Mobile app',
    badge: 'UX RESEARCH + UI',
    numberTone: 'magenta',
    badgeTone: 'rose',
    title: 'BOOK MOOD',
    text: 'A social reading app with book clubs, shared deadlines and gentle motivation — from persona and competitor analysis to user flow and UI.',
    image: '/assets/project-5.png',
    alt: 'Book Mood reading app screens',
    x: 326.79,
    y: 2099.73,
    rotate: 1,
    pin: { x: 317.79, y: 1795, tone: 'magenta' },
  },
]

/** glass folder tint and cover tilt for each project */
const FOLDER_COLORS = ['#8f7ae0', '#fda009', '#e8608f', '#7a4a43', '#b520cc']
const TILTS = [-2, 2.2, -1.6, 1.8, -2.2]

const FILTERS = ['ALL · 5', 'WEB · 3', 'MOBILE · 2', 'UX RESEARCH · 1']

/** until each case has its own Behance link, cards open the Behance profile */
const BEHANCE = 'https://www.behance.net/alla-kulykova'

const PIN_SRC = {
  magenta: '/assets/pin-magenta.png',
  orange: '/assets/pin-orange.png',
  ink: '/assets/pin.png',
}

export default function Projects() {
  return (
    <Stage id="projects" height={2742}>
      <div className="projects-back" aria-hidden="true" />

      <div className="sheet sheet--projects">
        <div className="sheet__grid sheet__grid--partial" aria-hidden="true" />
        <div className="sheet__margin sheet__margin--projects" aria-hidden="true" />

        {[159, 459, 759, 1059, 1359].map((top) => (
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
          <span>03</span>
          <span className="eyebrow__label">SELECTED PROJECTS</span>
        </p>

        <h2 className="projects-title">SELECTED PROJECTS</h2>
        <span className="projects-count" aria-hidden="true">
          (5)
        </span>

        <p className="projects-lead">
          Five projects — two mobile apps and three websites. Each opens a short
          case: concept, research or goal, key decisions and final screens.
        </p>

        <div className="filters" aria-hidden="true">
          {FILTERS.map((f, i) => (
            <span key={f} className={`filter${i === 0 ? ' is-active' : ''}`}>
              {f}
            </span>
          ))}
        </div>

        {PROJECTS.map((p, i) => (
          <article
            key={p.n}
            className="card folder"
            style={
              {
                left: p.x,
                top: p.y,
                transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
                '--fc': FOLDER_COLORS[i],
                '--tilt': `${TILTS[i]}deg`,
              } as CSSProperties
            }
          >
            <div className="folder__back" aria-hidden="true" />
            <div className="folder__sheet folder__sheet--a" aria-hidden="true" />
            <div className="folder__sheet folder__sheet--b" aria-hidden="true" />
            <img className="card__media" src={p.image} alt={p.alt} width={458} height={320} />
            <img
              className="pin folder__pin"
              src={PIN_SRC[p.pin.tone]}
              alt=""
              width={18}
              height={18}
            />
            <div className="folder__front">
              <div className="card__body">
                <div className="card__meta">
                  <span className={`card__number tone-${p.numberTone}`}>{p.n}</span>
                  <span className="card__kind">{p.kind}</span>
                  <span className={`card__badge tone-${p.badgeTone}`}>{p.badge}</span>
                </div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__text">{p.text}</p>
                <a className="card__link" href={p.href ?? BEHANCE} target="_blank" rel="noreferrer">
                  View case →
                </a>
              </div>
            </div>
          </article>
        ))}

        <div className="sticky-note">
          <p className="sticky-note__label">FULL UX PROCESS</p>
          <p className="sticky-note__text">PERSONA → COMPETITORS → USER FLOW → UI</p>
        </div>
        <img
          className="pin"
          style={{ left: 844.61, top: 1899.3 }}
          src="/assets/pin.png"
          alt=""
          width={18}
          height={18}
        />

        <a className="all-projects" href={BEHANCE} target="_blank" rel="noreferrer">
          ALL PROJECTS →
        </a>
      </div>
    </Stage>
  )
}
