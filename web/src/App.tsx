import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { WorksPage } from './pages/WorksPage'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')
function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename || undefined}>      <ScrollToHash />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
