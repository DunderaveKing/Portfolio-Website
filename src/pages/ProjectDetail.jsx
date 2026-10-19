import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects.js'

// This one component renders the detail page for EVERY project — there's
// no separate file per project. The URL tells it which one to show.
function ProjectDetail() {
  // useParams() reads the dynamic part of the URL. Because App.jsx defines
  // the route as "/projects/:slug", visiting /projects/asset-tracker gives
  // us { slug: "asset-tracker" } here.
  const { slug } = useParams()

  // Find the matching project from our data file by comparing slugs.
  // .find() returns the first match, or `undefined` if nothing matches.
  const project = projects.find((p) => p.slug === slug)

  // Guard clause: if someone visits a slug that doesn't exist (typo,
  // old link, etc.), show a fallback instead of crashing.
  if (!project) {
    return (
      <div>
        <Link to="/projects" className="back-link">
          ← back to projects
        </Link>
        <h1>Project not found</h1>
      </div>
    )
  }

  return (
    <div>
      <Link to="/projects" className="back-link">
        ← back to projects
      </Link>
      <span className="status-pill">{project.status}</span>
      <h1>{project.name}</h1>
      <p>{project.summary}</p>

      {project.stack.length > 0 && (
        <div className="stack-pills">
          {project.stack.map((tech) => (
            <span key={tech} className="stack-pill">
              {tech}
            </span>
          ))}
        </div>
      )}

      <section>
        <h2>My role</h2>
        <p>{project.role}</p>
      </section>

      <section>
        <h2>A challenge I solved</h2>
        <p>{project.challenge}</p>
      </section>

      <section className="contact-links">
        {/* Only render a link if the URL was actually filled in — an
            empty string is "falsy" so `&&` skips it. */}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">live site →</a>}
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">source code →</a>}
      </section>
    </div>
  )
}

export default ProjectDetail
