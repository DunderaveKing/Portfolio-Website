import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import GlitchBackground from './components/GlitchBackground.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

// App is the top-level layout. It renders the same Navbar/Footer on every
// page, and swaps out only the middle (<main>) based on the current URL.
function App() {
  return (
    // A component can only return ONE root element. <>...</> is a
    // "Fragment" — an invisible wrapper that lets us group multiple
    // elements (GlitchBackground, Navbar, main, Footer) without adding
    // an extra <div> to the page.
    <>
      {/* Fixed background layer, sits behind everything (see its CSS). */}
      <GlitchBackground />
      <Navbar />
      <main>
        <div className="container">
          {/* Routes looks at the current URL and renders whichever
              Route's `path` matches. Only one Route renders at a time. */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            {/* :slug is a URL parameter — a placeholder segment. Visiting
                /projects/asset-tracker makes slug === "asset-tracker"
                inside ProjectDetail (read via useParams there). */}
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
