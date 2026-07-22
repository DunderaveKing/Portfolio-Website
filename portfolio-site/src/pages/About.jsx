import { profile } from '../data/profile.js'

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>{profile.intro}</p>

      <section>
        <h2>Skills</h2>
        {/* Each skill string becomes its own <li>. `key={skill}` works
            here because skill names are unique strings — React uses it
            behind the scenes to match list items across re-renders. */}
        <ul className="skills-list">
          {profile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        <div className="education-list">
          {/* Each entry in profile.education is an object like
              { school, period, detail } — destructured here as `e`. */}
          {profile.education.map((e) => (
            <div key={e.school} className="education-item">
              <div className="education-header">
                <h3>{e.school}</h3>
                <span className="education-period">{e.period}</span>
              </div>
              <p>{e.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Relevant Coursework</h2>
        <ul className="skills-list">
          {profile.coursework.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default About
