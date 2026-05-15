import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './lib/i18n'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { BottomNav } from './components/layout/BottomNav'
import { Home } from './pages/Home'

const Catering = lazy(() => import('./pages/Catering').then((m) => ({ default: m.Catering })))
const Gracias = lazy(() => import('./pages/Gracias').then((m) => ({ default: m.Gracias })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))

// Restores scroll on route change; honors a #hash by scrolling to that section.
// When the target lives in a lazy route it may not exist on first commit, so we
// retry across a few frames before falling back to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    let frames = 0
    let raf = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (frames++ < 30) {
        raf = requestAnimationFrame(tryScroll)
      } else {
        window.scrollTo(0, 0)
      }
    }
    tryScroll()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  // Catering has its own sticky CTA — the global bottom nav would collide with it.
  const showBottomNav = pathname !== '/catering'

  return (
    <>
      <ScrollManager />
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <div className={`min-h-screen flex flex-col ${showBottomNav ? 'pb-[64px] md:pb-0' : ''}`}>
        <Header />
        <main id="main-content" className="flex-1">
          <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/gracias" element={<Gracias />} />
              <Route path="/aviso-legal" element={<LegalPage doc="avisoLegal" />} />
              <Route path="/privacidad" element={<LegalPage doc="privacidad" />} />
              <Route path="/cookies" element={<LegalPage doc="cookies" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      {showBottomNav && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        {/* Honor user's reduced-motion preference across all Framer Motion */}
        <MotionConfig reducedMotion="user">
          <Shell />
        </MotionConfig>
      </LanguageProvider>
    </BrowserRouter>
  )
}
