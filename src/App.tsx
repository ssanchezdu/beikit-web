import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './lib/i18n'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'

const Catering = lazy(() => import('./pages/Catering').then((m) => ({ default: m.Catering })))
const Gracias = lazy(() => import('./pages/Gracias').then((m) => ({ default: m.Gracias })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        {/* Honor user's reduced-motion preference across all Framer Motion */}
        <MotionConfig reducedMotion="user">
          <ScrollToTop />
          <a href="#main-content" className="skip-link">Saltar al contenido</a>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catering" element={<Catering />} />
                  <Route path="/gracias" element={<Gracias />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </MotionConfig>
      </LanguageProvider>
    </BrowserRouter>
  )
}
