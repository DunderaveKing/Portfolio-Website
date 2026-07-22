// Sourced from react-bits (https://reactbits.dev/backgrounds/letter-glitch) — MIT-style,
// intended for copy/paste use. No external dependencies beyond React.
import { useRef, useEffect } from 'react'

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
}) => {
  // useRef holds a value that survives re-renders WITHOUT causing a
  // re-render when it changes (unlike useState). Perfect for animation
  // state like "the current grid of letters" that updates 60x/second —
  // we don't want React re-rendering the component on every frame, we
  // just want to redraw the canvas directly.
  const canvasRef = useRef(null) // reference to the actual <canvas> DOM element
  const animationRef = useRef(null) // stores the requestAnimationFrame id, so we can cancel it on cleanup
  const letters = useRef([]) // the grid of {char, color, ...} objects currently drawn
  const grid = useRef({ columns: 0, rows: 0 }) // how many character cells fit on screen
  const context = useRef(null) // the canvas 2D drawing context (ctx.fillText, etc.)
  const lastGlitchTime = useRef(Date.now()) // timestamp of the last flicker, to pace glitchSpeed

  const lettersAndSymbols = Array.from(characters)

  const fontSize = 16
  const charWidth = 10
  const charHeight = 20

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
  }

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)]
  }

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    }
    return `rgb(${result.r}, ${result.g}, ${result.b})`
  }

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth)
    const rows = Math.ceil(height / charHeight)
    return { columns, rows }
  }

  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows }
    const totalLetters = columns * rows
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }))
  }

  // Figures out how big the canvas needs to be, then rebuilds the letter
  // grid to fill it. Runs once on mount and again whenever the window
  // (and therefore the background) resizes.
  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height)
    initializeLetters(columns, rows)

    drawLetters()
  }

  // Paints the current state of every letter onto the canvas. This is
  // plain Canvas API — ctx.fillText draws one character at a calculated
  // (x, y) position, nothing React-specific happening here.
  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return
    const ctx = context.current
    const { width, height } = canvasRef.current.getBoundingClientRect()
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = 'top'

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth
      const y = Math.floor(index / grid.current.columns) * charHeight
      ctx.fillStyle = letter.color
      ctx.fillText(letter.char, x, y)
    })
  }

  // Randomly picks ~5% of letters and gives them a new character + a new
  // target color. This is the "glitch" — only a handful change each tick
  // rather than the whole grid, which is what makes it look like static
  // rather than a full-screen flash.
  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length)
      if (!letters.current[index]) continue

      letters.current[index].char = getRandomChar()
      letters.current[index].targetColor = getRandomColor()

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor
        letters.current[index].colorProgress = 1
      } else {
        letters.current[index].colorProgress = 0
      }
    }
  }

  const handleSmoothTransitions = () => {
    let needsRedraw = false
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05
        if (letter.colorProgress > 1) letter.colorProgress = 1

        const startRgb = hexToRgb(letter.color)
        const endRgb = hexToRgb(letter.targetColor)
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
          needsRedraw = true
        }
      }
    })

    if (needsRedraw) {
      drawLetters()
    }
  }

  // The animation loop. requestAnimationFrame asks the browser to call
  // `animate` again right before the next screen repaint (~60 times per
  // second) — it's the standard way to do smooth animation in the
  // browser, instead of setInterval. Every call checks "has enough time
  // passed (glitchSpeed ms) to trigger another flicker?" and re-schedules
  // itself, so this keeps running until cancelAnimationFrame is called
  // (see the cleanup function in useEffect below).
  const animate = () => {
    const now = Date.now()
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters()
      drawLetters()
      lastGlitchTime.current = now
    }

    if (smooth) {
      handleSmoothTransitions()
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // useEffect runs after the component first renders (i.e. once the
  // <canvas> actually exists in the DOM), and again if glitchSpeed or
  // smooth change. It sets everything up and starts the animation loop.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    context.current = canvas.getContext('2d')
    resizeCanvas()
    animate()

    // Debounce resize: wait 100ms after the user stops resizing before
    // rebuilding the grid, instead of doing it on every pixel of a drag.
    let resizeTimeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current)
        resizeCanvas()
        animate()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    // The function returned from useEffect is "cleanup" — React runs it
    // when the component unmounts (or before re-running the effect).
    // Without this, the animation loop and the resize listener would
    // keep running forever in the background, even after the component
    // is gone — a classic source of memory leaks.
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth])

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden',
  }

  const canvasStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
  }

  const outerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)',
  }

  const centerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
  }

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  )
}

export default LetterGlitch
