import { useEffect, useState } from 'react'
import Can from './Can.jsx'
import Slice from './Slice.jsx'
import { FLAVOURS } from './flavours.js'

const STOCKISTS = [
  { shop: 'Peel & Pip Grocers', city: 'Brighton' },
  { shop: 'The Corner Fizz Deli', city: 'Leeds' },
  { shop: 'Rind Records & Café', city: 'Bristol' },
  { shop: 'Sunny Side Market', city: 'Glasgow' },
  { shop: 'Big Squeeze Bodega', city: 'London E8' },
]

// Splits text into individually hoverable / animatable letters.
function Letters({ text, className = '', stagger = 0 }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="ltr"
          aria-hidden="true"
          style={stagger ? { animationDelay: `${i * stagger}ms` } : undefined}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

function Nav({ index, choose }) {
  return (
    <nav className="nav">
      <a href="#top" className="nav-logo">ZESTO</a>
      <div className="nav-dots" role="group" aria-label="Choose flavour">
        {FLAVOURS.map((fl, i) => (
          <button
            key={fl.id}
            className={`dot ${i === index ? 'is-on' : ''}`}
            style={{ '--c': fl.accent }}
            onClick={(e) => choose(i, e)}
            aria-pressed={i === index}
            aria-label={fl.name.join(' ')}
          />
        ))}
      </div>
      <a href="#find" className="nav-cta">Find us</a>
    </nav>
  )
}

function Hero({ f }) {
  return (
    <header className="hero" id="top">
      <div className="sunburst" aria-hidden="true" />
      <h1 className="hero-type">
        <span className="row row-1">
          <Letters text="GOOD" className="w w-good" />{' '}
          <Letters text="MOOD." className="w w-mood" />
        </span>
        <span className="row row-2">
          <Letters text="GREAT" className="w w-great" />{' '}
          <Letters text="SODA." className="w w-soda" />
        </span>
      </h1>

      <div className="hero-can" key={f.id}>
        <div className="hero-can-float">
          <Can f={f} />
        </div>
      </div>

      <Slice className="float-slice s1" rind={f.rind} flesh={f.flesh} />
      <Slice className="float-slice s2" rind={f.rind} flesh={f.flesh} />
      <Slice className="float-slice s3" rind={f.rind} flesh={f.flesh} />

      <div className="hero-foot">
        <p>
          Naturally flavoured sparkling drinks.<br />
          Real fruit. Loud colours. Zero nonsense.
        </p>
        <a href="#flavours" className="btn-blob">
          Pick a flavour <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  )
}

function Ticker() {
  const items = ['TANGERINE TANGO', 'LIME LIGHT', 'PINK GRAPEFRUIT', 'NO ADDED SUGAR', 'REAL FRUIT', 'BIG FIZZ']
  const row = items.flatMap((t, i) => [
    <span key={t}>{t}</span>,
    <span key={`s${i}`} className="star" aria-hidden="true">✺</span>,
  ])
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker ticker-back"><div className="ticker-track">{row}{row}</div></div>
      <div className="ticker ticker-front"><div className="ticker-track">{row}{row}</div></div>
    </div>
  )
}

const BUBBLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 6 + ((i * 7) % 22),
  delay: `${(i * 0.73) % 6}s`,
  dur: `${5 + ((i * 3) % 6)}s`,
}))

function Showcase({ f, index, choose }) {
  return (
    <section className="showcase" id="flavours" aria-label="Flavours">
      <div className="bigname" key={`n-${f.id}`} aria-hidden="true">
        <Letters text={f.name[0].toUpperCase()} className="bigname-line" stagger={35} />
        <Letters text={f.name[1].toUpperCase()} className="bigname-line indent" stagger={35} />
      </div>

      <div className="bubbles" aria-hidden="true">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay, animationDuration: b.dur }}
          />
        ))}
      </div>

      <div className="showcase-grid">
        <div className="info" key={`i-${f.id}`}>
          <p className="kicker">Flavour 0{index + 1} / 03</p>
          <h2 className="info-title">{f.name.join(' ')}</h2>
          <p className="info-blurb">{f.blurb}</p>
          <ul className="notes">
            {f.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="facts"><b>{f.kcal}</b> kcal · <b>0g</b> added sugar · <b>330</b>ml</p>
        </div>

        <div className="stage">
          <div className="blob" aria-hidden="true" />
          <div className="orbit" aria-hidden="true">
            <Slice className="orbit-slice o1" rind={f.rind} flesh={f.flesh} />
            <Slice className="orbit-slice o2" rind={f.rind} flesh={f.flesh} />
          </div>
          <div className="stage-can" key={f.id}>
            <Can f={f} />
          </div>
        </div>

        <div className="picker" role="group" aria-label="Choose a flavour">
          <p className="picker-hint">Tap a slice ↓</p>
          {FLAVOURS.map((fl, i) => (
            <button
              key={fl.id}
              className={`pick ${i === index ? 'is-on' : ''}`}
              onClick={(e) => choose(i, e)}
              aria-pressed={i === index}
              style={{ '--c': fl.accent }}
            >
              <Slice className="pick-slice" rind={fl.rind} flesh={fl.flesh} />
              <span className="pick-label">
                <span>{fl.name[0]}</span>
                <span>{fl.name[1]}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Story({ f }) {
  return (
    <section className="story" aria-label="Our story">
      <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="badge-bg" />
        <text className="badge-text">
          <textPath href="#badge-circle">SQUEEZED NOT FAKED ✺ SMALL BATCH ✺ REAL FRUIT ✺ </textPath>
        </text>
        <Slice x="62" y="62" width="76" height="76" rind={f.rind} flesh={f.flesh} />
      </svg>

      <p className="story-kicker">The (very) short story</p>
      <p className="story-text">
        It started with <mark>one juicer</mark>, a soda siphon and a <em>terrible</em> amount of
        enthusiasm. Fourteen hundred sticky experiments later, we made the drink we couldn&rsquo;t
        find: <mark>real fruit</mark>, proper fizz, and absolutely <span className="wiggle">nothing boring</span>.
      </p>
      <p className="story-sign">— Ada &amp; Theo, founders &amp; chief tasters</p>

      <ul className="story-facts">
        <li className="fact f1"><b>100%</b><span>real fruit juice &amp; zest</span></li>
        <li className="fact f2"><b>0</b><span>artificial anything</span></li>
        <li className="fact f3"><b>3</b><span>flavours. No fillers.</span></li>
      </ul>
    </section>
  )
}

function Find() {
  const [sent, setSent] = useState(false)
  return (
    <section className="find" id="find" aria-label="Stockists and contact">
      <svg className="find-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,40 C120,0 240,80 360,40 C480,0 600,80 720,40 C840,0 960,80 1080,40 C1200,0 1320,80 1440,40 V80 H0 Z" />
      </svg>
      <h2 className="find-title"><Letters text="FIND THE FIZZ" /></h2>

      <div className="find-grid">
        <ol className="stockists">
          {STOCKISTS.map((s, i) => (
            <li key={s.shop}>
              <span className="st-num">0{i + 1}</span>
              <span className="st-shop">{s.shop}</span>
              <span className="st-city">{s.city}</span>
            </li>
          ))}
        </ol>

        <div className="contact">
          <p className="contact-label">Want ZESTO on your shelves?</p>
          <a className="contact-mail" href="mailto:hello@zesto.example">hello@zesto.example</a>
          <form
            className="signup"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <label htmlFor="email" className="contact-label">Fizzy news, once a month</label>
            {sent ? (
              <p className="signup-done">You&rsquo;re on the list. Stay bubbly ✺</p>
            ) : (
              <div className="signup-row">
                <input id="email" type="email" required placeholder="you@email.com" />
                <button type="submit">Join</button>
              </div>
            )}
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-mark" aria-hidden="true"><Letters text="ZESTO" /></div>
        <div className="footer-bar">
          <span>© {new Date().getFullYear()} ZESTO Soda Co. — a fictional fizz.</span>
          <span className="made-by">made by Tom Hambleton</span>
          <span className="footer-links">
            <a href="#top">Instagram</a>
            <a href="#top">TikTok</a>
            <a href="#top">Back to top ↑</a>
          </span>
        </div>
      </footer>
    </section>
  )
}

export default function App() {
  const [index, setIndex] = useState(0)
  const [wipe, setWipe] = useState(null)
  const f = FLAVOURS[index]

  // Push flavour colours onto :root so every section re-skins (vars are
  // registered with @property in CSS, so they tween smoothly).
  useEffect(() => {
    const root = document.documentElement.style
    root.setProperty('--accent', f.accent)
    root.setProperty('--pop', f.pop)
    root.setProperty('--deep', f.deep)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', f.accent)
  }, [f])

  const choose = (i, e) => {
    if (i === index) return
    const rect = e?.currentTarget?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
    setWipe({ x, y, color: FLAVOURS[i].accent, key: Date.now() })
    setIndex(i)
  }

  // Arrow keys cycle flavours too.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return
      if (e.key === 'ArrowRight') choose((index + 1) % FLAVOURS.length)
      if (e.key === 'ArrowLeft') choose((index + FLAVOURS.length - 1) % FLAVOURS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="app" data-flavour={f.id}>
      <Nav index={index} choose={choose} />
      <main>
        <Hero f={f} />
        <Ticker />
        <Showcase f={f} index={index} choose={choose} />
        <Story f={f} />
        <Find />
      </main>
      {wipe && (
        <div
          key={wipe.key}
          className="wipe"
          style={{ '--x': `${wipe.x}px`, '--y': `${wipe.y}px`, background: wipe.color }}
          onAnimationEnd={() => setWipe(null)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
