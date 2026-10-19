import { Link } from 'react-router-dom'
import { profile } from '../data/profile.js'
import { projects } from '../data/projects.js'

function Home() {
  // .slice(0, 3) copies out the first 3 items from the projects array
  // without changing the original array. Change the number to feature
  // more or fewer cards here.
  const featured = projects.slice(0, 3)

  return (
    <div className="hero">
      <p className="hero-tag">{profile.tagline}</p>
      {/* .split(' ')[0] breaks "Matthew McNaughton" into ["Matthew",
          "McNaughton"] and grabs the first word — a quick way to get
          just the first name for a friendlier greeting. */}
      <img src={profile.profilePic} alt={profile.name} className="profile-pic" />

      <h1>Hi, I'm {profile.name.split(' ')[0]}.</h1>
      <p>{profile.intro}</p>
      <Link to="/projects" className="button">
        view my projects
      </Link>

      <section>
        <h2>Featured</h2>
        <div className="project-grid">
          {/* .map() turns each item in `featured` into a piece of JSX.
              React needs a unique `key` on each item in a list so it can
              track which is which when the list changes — we use the
              project's slug since it's unique per project. */}
          {featured.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card">
              <span className="status-pill">{p.status}</span>
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
