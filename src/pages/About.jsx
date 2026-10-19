import { profile } from '../data/profile.js'
// Importing the PDF gives its final URL after the build, just like profilePic.
import cv from '../assets/CV.pdf'

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>{profile.intro}</p>
      {/* `download` tells the browser to save the file instead of opening it,
          and its value is the filename the visitor's copy will get. */}
      <a href={cv} download="Matthew-McNaughton-CV.pdf" className="button">
        Download my CV
      </a>

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
