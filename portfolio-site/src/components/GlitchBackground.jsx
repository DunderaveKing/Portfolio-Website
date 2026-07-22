import LetterGlitch from './LetterGlitch.jsx'

// Fixed, full-viewport background layer. Kept subtle (low opacity + blur)
// so it reads as texture rather than something competing with the text.
// Tweak `.glitch-background` in index.css for opacity/blur, and the props
// below for color/speed.
function GlitchBackground() {
  return (
    <div className="glitch-background" aria-hidden="true">
      <LetterGlitch
        glitchColors={['#0d1117', '#1d2530', '#67f63b']}
        glitchSpeed={90}
        centerVignette
        outerVignette
        smooth
      />
    </div>
  )
}

export default GlitchBackground
