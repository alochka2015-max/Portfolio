import { useEffect, useState, type ReactNode } from 'react'

const DESIGN_W = 1440
const DESIGN_H = 1024 // the hero's height: the largest scale at which it still fits the window

function computeScale() {
  return Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H)
}

function useStageScale() {
  const [scale, setScale] = useState(computeScale)
  useEffect(() => {
    const update = () => setScale(computeScale())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

type Props = { id: string; height: number; children: ReactNode }

/** A 1440px-wide desktop composition, scaled to the window and centered. */
export default function Stage({ id, height, children }: Props) {
  const scale = useStageScale()
  return (
    <section id={id} className="stage-frame" style={{ height: height * scale }}>
      <div
        className="stage"
        style={{
          height,
          left: `calc(50% - ${(DESIGN_W * scale) / 2}px)`,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </section>
  )
}
