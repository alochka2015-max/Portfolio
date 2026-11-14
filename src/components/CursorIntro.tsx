import { useEffect, useRef } from 'react'

/**
 * Agent-cursor intro: five labelled cursors swirl, fly to page elements, draw a
 * Figma-style selection frame around each one, and the element appears.
 * Hero and the "My path" section play on load; the project cards play as the
 * page is scrolled. Does nothing when the visitor prefers reduced motion.
 */

type Target = { sel: string; index?: number; also?: Target[] }
type Job = { agent: number; targets: Target[]; delay?: number }
type Group = { id: string; trigger: Target; jobs: Job[]; swirls: number }

const AGENTS = [
  { name: 'UI', color: '#fda009', on: '#1f1615' },
  { name: 'Research', color: '#b520cc', on: '#ffffff' },
  { name: 'Layout', color: '#e8608f', on: '#1f1615' },
  { name: 'Copy', color: '#7a4a43', on: '#ffffff' },
  { name: 'Prototype', color: '#1f1615', on: '#ffffff' },
]

const t = (sel: string, index?: number, also?: Target[]): Target => ({ sel, index, also })
/** project folder i (its pin is part of the folder) */
const card = (i: number): Target => t('#projects .card', i)

const GROUPS: Group[] = [
  {
    id: 'hero',
    trigger: t('#home'),
    swirls: 3,
    jobs: [
      { agent: 0, targets: [t('#home .name'), t('#home .badge')] },
      { agent: 1, delay: 150, targets: [t('#home .role-pill'), t('#home .facts')] },
      { agent: 2, delay: 300, targets: [t('#home .portrait')] },
      { agent: 3, delay: 450, targets: [t('#home .intro > p'), t('#home .lang')] },
      { agent: 4, delay: 600, targets: [t('#home .buttons'), t('#home .tabs')] },
    ],
  },
  {
    id: 'path',
    trigger: t('#intro'),
    swirls: 1,
    jobs: [
      { agent: 0, targets: [t('#intro .statement')] },
      { agent: 1, delay: 150, targets: [t('#intro .eyebrow'), t('#intro .sticky', 0, [t('#intro .pin')])] },
      { agent: 2, delay: 300, targets: [t('#intro .workbook')] },
      { agent: 3, delay: 450, targets: [t('#intro .intro-text > p')] },
      { agent: 4, delay: 600, targets: [t('#intro .note')] },
    ],
  },
  {
    id: 'projects-head',
    trigger: t('#projects .eyebrow'),
    swirls: 1,
    jobs: [
      { agent: 1, targets: [t('#projects .eyebrow')] },
      { agent: 0, delay: 120, targets: [t('#projects .projects-title', 0, [t('#projects .projects-count')])] },
      { agent: 3, delay: 240, targets: [t('#projects .projects-lead')] },
      { agent: 2, delay: 360, targets: [t('#projects .filters')] },
    ],
  },
  {
    id: 'cards-1',
    trigger: t('#projects .card', 0),
    swirls: 1,
    jobs: [
      { agent: 0, targets: [card(0)] },
      { agent: 2, delay: 200, targets: [card(1)] },
    ],
  },
  {
    id: 'cards-2',
    trigger: t('#projects .card', 2),
    swirls: 1,
    jobs: [
      { agent: 3, targets: [card(2)] },
      { agent: 4, delay: 200, targets: [card(3)] },
    ],
  },
  {
    id: 'cards-3',
    trigger: t('#projects .card', 4),
    swirls: 1,
    jobs: [
      { agent: 1, targets: [card(4)] },
      { agent: 0, delay: 200, targets: [t('#projects .sticky-note', 0, [t('#projects .pin', 5)])] },
      { agent: 2, delay: 400, targets: [t('#projects .all-projects')] },
    ],
  },
  {
    id: 'skills',
    trigger: t('#skills .eyebrow'),
    swirls: 1,
    jobs: [
      { agent: 1, targets: [t('#skills .eyebrow'), t('#skills .skills-title')] },
      { agent: 0, delay: 200, targets: [t('#skills .skills-note', 0, [t('#skills .skills-pin')])] },
      { agent: 3, delay: 300, targets: [t('#skills .skills-list')] },
      { agent: 2, delay: 450, targets: [t('#skills .sticker--figma'), t('#skills .sticker--ai')] },
    ],
  },
  {
    id: 'contact',
    trigger: t('#contact .eyebrow'),
    swirls: 1,
    jobs: [
      { agent: 1, targets: [t('#contact .eyebrow'), t('#contact .contact-title')] },
      { agent: 3, delay: 200, targets: [t('#contact .contact-text')] },
      { agent: 4, delay: 350, targets: [t('#contact .cv-buttons')] },
      { agent: 2, delay: 300, targets: [t('#contact .postcard', 0, [t('#contact .postcard-pin')])] },
      { agent: 0, delay: 500, targets: [t('#contact .site-footer')] },
    ],
  },
]

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
const resolve = (tg: Target) =>
  document.querySelectorAll<HTMLElement>(tg.sel)[tg.index ?? 0] ?? null

function eachTarget(tg: Target, fn: (el: HTMLElement) => void) {
  const el = resolve(tg)
  if (el) fn(el)
  tg.also?.forEach((a) => eachTarget(a, fn))
}

export default function CursorIntro() {
  const layerRef = useRef<HTMLDivElement>(null)
  const replayRef = useRef<() => void>(() => {})

  useEffect(() => {
    const layer = layerRef.current
    const main = layer?.parentElement
    if (!layer || !main) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let dead = false
    let runId = 0
    let running = false
    let hurry = false // a later block is already on screen: finish the current one instantly
    const started = new Set<string>()
    /** phones show several blocks at once, so everything plays faster there */
    const T = (ms: number) => ms * (window.innerWidth < 700 ? 0.55 : 1)

    const root = document.documentElement
    root.classList.add('js-reveal')

    const allTargets: Target[] = GROUPS.flatMap((g) => g.jobs.flatMap((j) => j.targets))
    const markAll = () =>
      allTargets.forEach((tg) => eachTarget(tg, (el) => el.classList.add('rv')))
    markAll()

    const reveal = (tg: Target) =>
      eachTarget(tg, (el) => el.classList.add('rv-in'))

    /* ---- agents ---- */
    type Agent = { el: HTMLDivElement; color: string; on: string; x: number; y: number; gen: number }
    const agents: Agent[] = AGENTS.map((a) => {
      const el = document.createElement('div')
      el.className = 'cur'
      el.style.setProperty('--c', a.color)
      el.style.setProperty('--on', a.on)
      el.innerHTML =
        '<div class="cur__in"><svg width="18" height="22" viewBox="0 0 18 22"><path d="M2 1.5v16.2l4.3-3.9 3 6.8 2.7-1.2-3-6.6h6z" fill="' +
        a.color +
        '" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg><span>' +
        a.name +
        '</span></div>'
      layer.appendChild(el)
      return { el, color: a.color, on: a.on, x: 0, y: 0, gen: 0 }
    })

    const k = () => Math.max(0.7, Math.min(1, window.innerWidth / 900))
    const setScale = () => layer.style.setProperty('--k', String(k()))
    setScale()

    const origin = () => main.getBoundingClientRect()
    const measure = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      const o = origin()
      return {
        l: r.left - o.left,
        t: r.top - o.top,
        w: r.width,
        h: r.height,
        visible: r.bottom > 0 && r.top < window.innerHeight && r.width > 0 && r.height > 0,
      }
    }
    const viewCenter = () => {
      const o = origin()
      return { x: window.innerWidth / 2 - o.left, y: window.innerHeight / 2 - o.top }
    }

    const place = (a: Agent) => {
      // keep the name tag inside the page edge (a.x stays the logical position)
      const x = Math.min(a.x, main.clientWidth - 92 * k())
      a.el.style.transform = `translate(${x.toFixed(1)}px, ${a.y.toFixed(1)}px)`
    }
    const jump = (a: Agent, x: number, y: number) => {
      a.gen++
      a.x = x
      a.y = y
      place(a)
    }

    const moveTo = (
      a: Agent,
      x: number,
      y: number,
      dur: number,
      straight = false,
      onFrame?: (x: number, y: number) => void,
    ) =>
      new Promise<void>((res) => {
        const my = ++a.gen
        const x0 = a.x
        const y0 = a.y
        const dx = x - x0
        const dy = y - y0
        const len = Math.hypot(dx, dy) || 1
        const off = straight ? 0 : (Math.random() * 2 - 1) * Math.min(90, len * 0.3)
        const cx = (x0 + x) / 2 - (dy / len) * off
        const cy = (y0 + y) / 2 + (dx / len) * off
        const t0 = performance.now()
        const frame = (now: number) => {
          if (dead || a.gen !== my) return res()
          const p = Math.min(1, (now - t0) / dur)
          const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
          const u = 1 - e
          a.x = u * u * x0 + 2 * u * e * cx + e * e * x
          a.y = u * u * y0 + 2 * u * e * cy + e * e * y
          place(a)
          onFrame?.(a.x, a.y)
          if (p < 1) requestAnimationFrame(frame)
          else res()
        }
        requestAnimationFrame(frame)
      })

    const flightTime = (a: Agent, x: number, y: number) =>
      T(Math.max(520, Math.min(1300, 380 + Math.hypot(x - a.x, y - a.y) * 0.55)))

    const triggerRect = (g: Group) => resolve(g.trigger)?.getBoundingClientRect() ?? null
    const triggerVisible = (g: Group) => {
      if (g.id === 'hero') return true
      const r = triggerRect(g)
      return !!r && r.bottom > 0 && r.top < window.innerHeight * 0.78
    }
    /** true when the visitor has scrolled on and a later block is on screen */
    const overtaken = (g: Group) => {
      const r = triggerRect(g)
      if (!r || r.bottom > window.innerHeight * 0.3) return false
      const later = GROUPS.slice(GROUPS.indexOf(g) + 1)
      return later.some((o) => !started.has(o.id) && triggerVisible(o))
    }

    const hideAgents = () => agents.forEach((a) => a.el.classList.remove('show'))
    const clearBoxes = () => layer.querySelectorAll('.sel').forEach((b) => b.remove())

    const makeBox = (color: string, on: string, r: { l: number; t: number }) => {
      const b = document.createElement('div')
      b.className = 'sel'
      b.style.setProperty('--c', color)
      b.style.setProperty('--on', on)
      b.style.left = r.l + 'px'
      b.style.top = r.t + 'px'
      b.style.width = '0px'
      b.style.height = '0px'
      b.innerHTML = '<i></i><i></i><i></i><i></i>'
      layer.appendChild(b)
      return b
    }

    const alive = (my: number) => !dead && my === runId

    async function runJob(my: number, job: Job) {
      const a = agents[job.agent]
      if (job.delay) await sleep(T(job.delay))
      for (const tg of job.targets) {
        if (!alive(my)) return
        const el = resolve(tg)
        if (!el) continue
        const r = measure(el)
        if (hurry || !r.visible) {
          reveal(tg) // off screen or visitor already scrolled on: no point flying there
          continue
        }
        const x0 = r.l - 3
        const y0 = r.t - 3
        await moveTo(a, x0, y0, flightTime(a, x0, y0))
        if (!alive(my)) return
        if (hurry) {
          reveal(tg)
          continue
        }
        const box = makeBox(a.color, a.on, r)
        await moveTo(a, r.l + r.w, r.t + r.h, T(650), true, (x, y) => {
          box.style.width = Math.max(0, Math.min(r.w, x - r.l)) + 'px'
          box.style.height = Math.max(0, Math.min(r.h, y - r.t)) + 'px'
        })
        if (!alive(my)) return
        const tag = document.createElement('em')
        tag.textContent = `${Math.round(el.offsetWidth || r.w)} × ${Math.round(el.offsetHeight || r.h)}`
        box.appendChild(tag)
        reveal(tg)
        if (!hurry) await sleep(T(380))
        box.classList.add('out')
        setTimeout(() => box.remove(), 420)
      }
    }

    async function runGroup(my: number, g: Group) {
      const used = new Set(g.jobs.map((j) => j.agent))
      const c = viewCenter()
      const kk = k()
      agents.forEach((a, i) => {
        const on = used.has(i)
        if (on && !a.el.classList.contains('show')) {
          jump(a, c.x + (i - 2) * 70 * kk, c.y - 40 + (i % 2) * 40)
        }
        a.el.classList.toggle('show', on)
      })
      // swirl around the middle of the screen before building
      for (let hop = 0; hop < g.swirls; hop++) {
        await Promise.all(
          g.jobs.map((j, n) => {
            const ang = (n / g.jobs.length) * Math.PI * 2 + hop * 1.9
            return moveTo(
              agents[j.agent],
              c.x + Math.cos(ang) * (80 + hop * 20) * kk,
              c.y + Math.sin(ang) * (55 + hop * 14) * kk,
              T(520),
            )
          }),
        )
        if (!alive(my) || hurry) break
      }
      await Promise.all(g.jobs.map((j) => runJob(my, j)))
    }

    async function pump(my: number) {
      if (running) return
      running = true
      try {
        for (const g of GROUPS) {
          if (!alive(my)) return
          if (started.has(g.id)) continue
          const el = resolve(g.trigger)
          if (!el) continue
          const r = el.getBoundingClientRect()
          if (r.bottom <= 0 || overtaken(g)) {
            // scrolled past already: just show it
            started.add(g.id)
            g.jobs.forEach((j) => j.targets.forEach(reveal))
            continue
          }
          if (!triggerVisible(g)) return
          started.add(g.id)
          hurry = false
          await runGroup(my, g)
          if (!alive(my)) return
          // let the cursors linger a moment, then fade them out unless a new group starts
          const lingerFor = started.size
          if (!hurry) await sleep(T(g.id === 'hero' ? 1800 : 1000))
          if (!alive(my)) return
          if (started.size === lingerFor) hideAgents()
        }
      } catch {
        allTargets.forEach(reveal)
        hideAgents()
      } finally {
        if (my === runId) running = false
      }
    }

    function onScroll() {
      if (!running) {
        void pump(runId)
        return
      }
      // a block is still playing while the next one is already on screen: speed it up
      const current = GROUPS.filter((g) => started.has(g.id)).pop()
      if (current && !hurry && overtaken(current)) {
        hurry = true
        agents.forEach((a) => a.gen++) // cut flights short
      }
    }

    function begin() {
      const my = ++runId
      running = false
      hurry = false
      started.clear()
      agents.forEach((a) => a.gen++)
      clearBoxes()
      hideAgents()
      markAll()
      allTargets.forEach((tg) => eachTarget(tg, (el) => el.classList.remove('rv-in')))
      window.scrollTo({ top: 0 })
      void sleep(350).then(() => {
        if (alive(my)) void pump(my)
      })
    }
    replayRef.current = begin

    const onResize = () => setScale()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const ready = document.fonts?.ready ?? Promise.resolve()
    void ready.then(() => sleep(150)).then(() => !dead && begin())

    return () => {
      dead = true
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      root.classList.remove('js-reveal')
      allTargets.forEach((tg) =>
        eachTarget(tg, (el) => el.classList.remove('rv', 'rv-in')),
      )
      agents.forEach((a) => a.el.remove())
      clearBoxes()
    }
  }, [])

  return (
    <>
      <div ref={layerRef} className="cursor-layer" aria-hidden="true" />
      <button
        type="button"
        className="replay"
        aria-label="Replay the intro animation"
        onClick={() => replayRef.current()}
      >
        ↻ Replay
      </button>
    </>
  )
}
