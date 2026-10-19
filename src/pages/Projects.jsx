import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <p>A running list of things I've built or am building.</p>
      <div className="project-grid">
        {/* Loop over every project (not just featured ones, unlike Home). */}
        {projects.map((p) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card">
            <span className="status-pill">{p.status}</span>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            {/* `condition && <jsx />` is a common React shorthand: if
                `p.stack.length > 0` is false, React renders nothing;
                if true, it renders the div. Avoids an empty pill row
                for projects that don't have a stack listed yet. */}
            {p.stack.length > 0 && (
              <div className="stack-pills">
                {p.stack.map((tech) => (
                  <span key={tech} className="stack-pill">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Projects
