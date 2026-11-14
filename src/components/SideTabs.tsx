import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

const DESIGN_W = 1440
const DESIGN_H = 1024

const TABS = [
  { key: 'tab.home', cls: 'tab--home', href: '#home', section: 'home' },
  { key: 'tab.projects', cls: 'tab--projects', href: '#projects', section: 'projects' },
  { key: 'tab.about', cls: 'tab--about', href: '#intro', section: 'intro' },
  { key: 'tab.contact', cls: 'tab--contact', href: '#contact', section: 'contact' },
]
// which tab is lit for each section on the page
const TAB_FOR: Record<string, string> = {
  home: 'home', intro: 'intro', projects: 'projects', skills: 'intro', contact: 'contact',
}

function useScale() {
  const calc = () => Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H)
  const [s, setS] = useState(calc)
  useEffect(() => {
    const on = () => setS(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return s
}

/** The side tabs stay on screen while the page scrolls, so every section is one click away. */
export default function SideTabs() {
  const { t } = useLang()
  const scale = useScale()
  const [active, setActive] = useState('home')

  useEffect(() => {
    const ids = Object.keys(TAB_FOR)
    const on = () => {
      const mid = window.innerHeight * 0.45
      let cur = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) cur = id
      }
      setActive(TAB_FOR[cur])
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])

  return (
    <div
      className="side-tabs"
      style={{ left: `calc(50% - ${(DESIGN_W * scale) / 2}px)`, transform: `scale(${scale})` }}
    >
      <nav className="tabs" aria-label="Main">
        {TABS.map((tb) => (
          <a
            key={tb.key}
            className={`tab ${tb.cls}${tb.section === active ? ' is-current' : ''}`}
            href={tb.href}
            aria-current={tb.section === active ? 'true' : undefined}
          >
            <span>{t(tb.key)}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
