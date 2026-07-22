import { profile } from '../data/profile.js'

function Footer() {
  // Plain JavaScript works fine inside a component, above the `return`.
  // This runs once per render and gives us the current year for the
  // copyright line, so you never have to update it by hand.
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        {/* {year} and {profile.name} are JS expressions embedded in JSX —
            anything inside curly braces gets evaluated and the result
            is printed into the page. */}
        <span>© {year} {profile.name}</span>
        <span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            github
          </a>
          {' · '}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
