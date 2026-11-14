import Hero from './components/Hero'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CursorIntro from './components/CursorIntro'
import SideTabs from './components/SideTabs'
import MobileSite, { useIsMobile } from './components/MobileSite'

export default function App() {
  const mobile = useIsMobile()
  if (mobile) return <MobileSite />
  return (
    <main>
      <SideTabs />
      <Hero />
      <Intro />
      <Projects />
      <Skills />
      <Contact />
      <CursorIntro />
    </main>
  )
}
