import { NavLink } from 'react-router-dom'
import { profile } from '../data/profile.js'

// Navbar renders once (from App.jsx) and stays on screen across every page.
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        {/* NavLink works like a normal <a> tag but is routing-aware —
            clicking it changes the URL and swaps pages instantly,
            without the browser doing a full reload. */}
        <NavLink to="/" className="navbar-brand">
          {profile.name}
        </NavLink>

        <ul className="navbar-links">
          <li>
            {/* `end` means this link only counts as "active" on an EXACT
                match to "/". Without it, "/" would also match "/projects"
                etc. since "/" is a prefix of every path. */}
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              home
            </NavLink>
          </li>
          <li>
            {/* className here is a function, not a plain string. React
                Router calls it with { isActive } so we can style the
                link differently when its page is the one currently shown. */}
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
              projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              about
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
