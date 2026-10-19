// This is the entry point — the first JS file that runs. Vite loads this
// because index.html has <script type="module" src="/src/main.jsx">.
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css' // global styles, applied to the whole site

// ReactDOM.createRoot takes over a DOM element (the <div id="root"> in
// index.html) and lets React render components into it.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode is a dev-only helper that highlights potential bugs
  // (e.g. by intentionally double-running some code). It does nothing
  // in production and can be safely ignored while learning.
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing: it watches the URL
        and lets <Routes>/<Route> in App.jsx decide what to show,
        without a full page reload every time you navigate. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
