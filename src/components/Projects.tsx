import type { CSSProperties } from 'react'
import PageTabs from './PageTabs'
import Stage from './Stage'
import { useLang } from '../i18n'

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
    kind: 'kind.app',
    badge: 'badge.concept',
    numberTone: 'magenta',
    badgeTone: 'magenta',
    title: 'NEVER LOSE YOUR RECEIPT',
    text: 'p1.text',
    image: '/assets/project-1.png',
    alt: 'Never Lose Your Receipt app screens',
    x: 325.74,
    y: 700.57,
    rotate: 1.2,
    pin: { x: 316.74, y: 395, tone: 'magenta' },
  },
  {
    n: '02',
    kind: 'kind.web',
    badge: 'badge.study',
    numberTone: 'orange',
    badgeTone: 'orange',
    title: 'MATHUR GASTROBAR',
    text: 'p2.text',
    image: '/assets/project-2.png',
    alt: 'Mathur Gastrobar website',
    x: 882.94,
    y: 719.68,
    rotate: -1,
    pin: { x: 873.94, y: 426.45, tone: 'orange' },
  },
  {
    n: '03',
    kind: 'kind.web',
    badge: 'badge.study',
    numberTone: 'rose',
    badgeTone: 'orange',
    title: 'OLGA',
    text: 'p3.text',
    image: '/assets/project-3.png',
    alt: 'Olga website',
    x: 336.94,
    y: 1379.68,
    rotate: -1,
    pin: { x: 327.94, y: 1086.45, tone: 'ink' },
  },
  {
    n: '04',
    kind: 'kind.web',
    badge: 'badge.study',
    numberTone: 'ink',
    badgeTone: 'orange',
    title: 'AURUM',
    text: 'p4.text',
    image: '/assets/project-4.png',
    alt: 'Aurum dental clinic website',
    x: 872.22,
    y: 1440.57,
    rotate: 1.2,
    pin: { x: 862.98, y: 1135, tone: 'ink' },
  },
  {
    n: '05',
    kind: 'kind.app',
    badge: 'badge.research',
    numberTone: 'magenta',
    badgeTone: 'rose',
    title: 'BOOK MOOD',
    text: 'p5.text',
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

const FILTERS = ['filter.all', 'filter.web', 'filter.mobile', 'filter.ux']

/** until each case has its own Behance link, cards open the Behance profile */
const BEHANCE = 'https://www.behance.net/alla-kulykova'

const PIN_SRC = {
  magenta: '/assets/pin-magenta.png',
  orange: '/assets/pin-orange.png',
  ink: '/assets/pin.png',
}

export default function Projects() {
  const { t } = useLang()
  return (
    <Stage id="projects" height={2742}>
      <PageTabs current="projects" tops={[140, 940, 1740]} />
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
          <span className="eyebrow__label">{t('proj.eyebrow')}</span>
        </p>

        <h2 className="projects-title">{t('proj.title')}</h2>
        <span className="projects-count" aria-hidden="true">
          (5)
        </span>

        <p className="projects-lead">{t('proj.lead')}</p>

        <div className="filters" aria-hidden="true">
          {FILTERS.map((f, i) => (
            <span key={f} className={`filter${i === 0 ? ' is-active' : ''}`}>
              {t(f)}
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
                  <span className="card__kind">{t(p.kind)}</span>
                  <span className={`card__badge tone-${p.badgeTone}`}>{t(p.badge)}</span>
                </div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__text">{t(p.text)}</p>
                <a className="card__link" href={p.href ?? BEHANCE} target="_blank" rel="noreferrer">
                  {t('proj.viewCase')}
                </a>
              </div>
            </div>
          </article>
        ))}

        <div className="sticky-note">
          <p className="sticky-note__label">{t('proj.stickyLabel')}</p>
          <p className="sticky-note__text">{t('proj.stickyText')}</p>
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
          {t('proj.all')}
        </a>
      </div>
    </Stage>
  )
}
