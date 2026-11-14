import { useLang } from '../i18n'

const TABS = [
  { key: 'tab.home', cls: 'tab--home', href: '#home', section: 'home' },
  { key: 'tab.about', cls: 'tab--about', href: '#intro', section: 'about' },
  { key: 'tab.projects', cls: 'tab--projects', href: '#projects', section: 'projects' },
  { key: 'tab.contact', cls: 'tab--contact', href: '#contact', section: 'contact' },
]

type Props = {
  /** which tab belongs to this page (it slides out a little) */
  current: 'home' | 'projects' | 'about' | 'contact'
  /** y positions of the tab sets inside the page; long pages repeat them */
  tops?: number[]
}

/** Index tabs tucked behind the sheet of one page. Render this before the sheet. */
export default function PageTabs({ current, tops = [140] }: Props) {
  const { t } = useLang()
  return (
    <>
      {tops.map((top, i) => (
        <nav key={top} className="tabs" style={{ top }} aria-label={i === 0 ? 'Main' : undefined} aria-hidden={i === 0 ? undefined : true}>
          {TABS.map((tb) => (
            <a
              key={tb.key}
              className={`tab ${tb.cls}${tb.section === current ? ' is-current' : ''}`}
              href={tb.href}
              tabIndex={i === 0 ? undefined : -1}
              aria-current={tb.section === current ? 'true' : undefined}
            >
              <span>{t(tb.key)}</span>
            </a>
          ))}
        </nav>
      ))}
    </>
  )
}
