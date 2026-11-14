import Hero from './components/Hero'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CursorIntro from './components/CursorIntro'
import MobileSite, { useIsMobile } from './components/MobileSite'

export default function App() {
  const mobile = useIsMobile()
  if (mobile) return <MobileSite />
  return (
    <main>
      <Hero />
      <Intro />
      <Projects />
      <Skills />
      <Contact />
      <CursorIntro />
    </main>
  )
}
