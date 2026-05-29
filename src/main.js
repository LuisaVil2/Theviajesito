import './styles.css'

const timelineItems = [
  ['⌖', 'Viaje a Manizales', 'Una ruta fría para empezar bonito.'],
  ['△', 'Glamping Leon Dormido', 'Mantas, bosque y cielo de montaña.'],
  ['◌', 'Restaurante', 'Una mesa suave, íntima y pensada.'],
  ['❄', 'Viaje al Nevado del Ruiz', 'Nieve, silencio y paisaje inmenso.'],
  ['≈', 'Aguas termales', 'Calorcito en medio del invierno.'],
  ['☾', 'Amanecer frío juntos', 'Ver la luz llegar juntos.'],
  ['♡', 'Arrunchis viendo el paisaje', 'Quedarnos ahí, sin afán.'],
]

const busCosts = [
  ['Bus ida y vuelta', '$38.000 x 2 = $76.000'],
  ['Terminal de Manizales al glamping', '$90.000'],
  ['Habitación sencilla', '$250.000'],
  ['Restaurante', '$60.000'],
  ['Transporte hasta el nevado', '$50.000'],
  ['Tour nevado, aguas termales y regreso a Manizales', '$395.000 x 2'],
]

const root = document.querySelector('#root')

function snowmanSvg() {
  return `
    <svg viewBox="0 0 430 390" class="snowman-art" role="img" aria-label="Muñeco de nieve suave con carita de gato">
      <defs>
        <radialGradient id="snowBody" cx="42%" cy="24%" r="78%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="58%" stop-color="#dcecff"/>
          <stop offset="100%" stop-color="#9ab6d5"/>
        </radialGradient>
        <linearGradient id="scarfBlue" x1="0" x2="1">
          <stop stop-color="#72c8ff"/>
          <stop offset="52%" stop-color="#9fdfff"/>
          <stop offset="100%" stop-color="#9689ff"/>
        </linearGradient>
        <linearGradient id="hatBlue" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#12284c"/>
          <stop offset="100%" stop-color="#27316c"/>
        </linearGradient>
        <filter id="softGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <ellipse cx="214" cy="345" rx="138" ry="28" fill="#dff4ff" opacity=".25"/>
      <path d="M91 246c-34 10-58 27-72 52" fill="none" stroke="#a9c9e7" stroke-width="9" stroke-linecap="round" opacity=".55"/>
      <path d="M337 246c34 10 58 27 72 52" fill="none" stroke="#a9c9e7" stroke-width="9" stroke-linecap="round" opacity=".55"/>
      <circle cx="214" cy="244" r="102" fill="url(#snowBody)"/>
      <circle cx="214" cy="138" r="78" fill="url(#snowBody)"/>
      <path d="M144 101c18-46 121-48 141-1" fill="none" stroke="rgba(255,255,255,.56)" stroke-width="10" stroke-linecap="round"/>
      <path d="M158 78c9-38 105-38 114 0l8 44c-38 13-86 13-130 0Z" fill="url(#hatBlue)"/>
      <path d="M136 121c43 17 111 17 156 0" fill="none" stroke="#77caff" stroke-width="18" stroke-linecap="round"/>
      <circle cx="171" cy="128" r="7" fill="#203654"/>
      <circle cx="257" cy="128" r="7" fill="#203654"/>
      <path class="snowman-blink" d="M159 127c11-10 23-10 35 0M235 127c11-10 23-10 35 0" fill="none" stroke="#203654" stroke-width="6" stroke-linecap="round"/>
      <path d="M214 143c-8 5-16 5-24 0 9 15 39 15 48 0-8 5-16 5-24 0Z" fill="#607894" opacity=".86"/>
      <path d="M204 154c-15 12-31 9-40-1M224 154c15 12 31 9 40-1" fill="none" stroke="#678099" stroke-width="4" stroke-linecap="round" opacity=".72"/>
      <path d="M137 184c44 21 110 23 156 0l8 32c-55 24-122 24-175 0Z" fill="url(#scarfBlue)" filter="url(#softGlow)"/>
      <path d="M252 207c18 18 20 47 9 77l-38-18c12-24 15-44 8-58Z" fill="#8278ea"/>
      <circle cx="190" cy="239" r="5" fill="#8eb0cd" opacity=".85"/>
      <circle cx="222" cy="278" r="5" fill="#8eb0cd" opacity=".7"/>
      <circle cx="242" cy="228" r="4" fill="#8eb0cd" opacity=".62"/>
      <circle cx="173" cy="148" r="7" fill="#f1b9c9" opacity=".42"/>
      <circle cx="255" cy="148" r="7" fill="#f1b9c9" opacity=".42"/>
      <g class="floating-crystals" fill="#fff" opacity=".82">
        <circle cx="97" cy="212" r="4"/><circle cx="333" cy="186" r="3"/><circle cx="302" cy="72" r="3"/><circle cx="128" cy="64" r="3"/>
      </g>
    </svg>`
}

function createSnow() {
  const layer = document.createElement('div')
  layer.className = 'snow-layer'
  layer.setAttribute('aria-hidden', 'true')
  Array.from({ length: 72 }).forEach((_, i) => {
    const flake = document.createElement('span')
    flake.className = 'snowflake'
    flake.style.cssText = `--left:${Math.random() * 100}%;--size:${Math.random() * 3.2 + 1.3}px;--delay:${Math.random() * -24}s;--duration:${Math.random() * 18 + 18}s;--drift:${Math.random() * 76 - 38}px;--opacity:${Math.random() * .38 + .18}`
    flake.dataset.id = i
    layer.append(flake)
  })
  return layer
}

function costRows(items) {
  return items.map(([label, price], index) => `
    <li class="cost-row reveal" style="--delay:${index * 65}ms">
      <div class="cost-copy"><span class="cost-label">${label}</span><span class="cost-price">${price}</span></div>
      <span class="covered">✓ cubierto 💙</span>
    </li>`).join('')
}

function renderLanding() {
  root.innerHTML = `
    <div class="animated-sky"></div><div class="blur-field blur-one"></div><div class="blur-field blur-two"></div>
    <button class="music-button" aria-label="Activar o pausar ambiente sonoro">♩</button>
    <section class="landing section-shell screen-in">
      <div class="mascot-orbit">${snowmanSvg()}</div>
      <button class="enter-button">Abre aquí si quieres vivir esta aventura conmigo 💙</button>
    </section>`
  root.append(createSnow())
  root.querySelector('.enter-button').addEventListener('click', renderMain)
  root.querySelector('.music-button').addEventListener('click', toggleMusic)
}

function renderMain() {
  root.querySelector('.landing')?.classList.add('screen-out')
  setTimeout(() => {
    root.innerHTML = `
      <div class="animated-sky"></div><div class="blur-field blur-one"></div><div class="blur-field blur-two"></div>
      <button class="music-button" aria-label="Activar o pausar ambiente sonoro">♩</button>
      <main class="screen-in">
        <section class="plan section-shell" id="plan">
          <div class="moon-blur" aria-hidden="true"></div>
          <div class="section-kicker reveal">Nuestro invierno</div>
          <h1 class="section-title reveal">Nuestro plan ✨</h1>
          <div class="timeline-shell glass-panel reveal">
            <div class="timeline-line" aria-hidden="true"></div>
            <div class="timeline-grid">
              ${timelineItems.map(([icon, title, note], index) => `
                <article class="timeline-item reveal" style="--delay:${index * 80}ms">
                  <div class="timeline-node"><span>${icon}</span></div>
                  <h2>${title}</h2>
                  <p>“${note}”</p>
                </article>`).join('')}
            </div>
          </div>
        </section>
        <section class="roulette-section section-shell">
          <div class="aurora-divider"></div><div class="section-kicker reveal">una pequeña sorpresa</div>
          <div class="roulette-stage">
            <div class="wheel-wrap">
              <div class="roulette-pointer" aria-hidden="true"></div>
              <div class="roulette-wheel">
                <span class="metal-edge"></span><span class="wheel-ring"></span><span class="wheel-glow"></span>
                <span class="wheel-slice slice-one"></span><span class="wheel-slice slice-two"></span><span class="wheel-slice slice-three"></span>
                <span class="wheel-center"><span>💙</span></span>
              </div>
            </div>
            <button class="spin-button">Gira la ruleta 💫</button>
          </div>
          <article class="letter-card" hidden>
            <div class="letter-sparkles" aria-hidden="true"></div>
            <p>Me encantaría hacer arrunchis contigo en un lugar muy frío.</p>
            <p>Me encantaría ver el amanecer del nevado contigo.</p>
            <p>Me encantaría seguir viviendo mi vida contigo.</p><strong>Te amo 💙</strong>
          </article>
        </section>
        <section class="economics section-shell" id="detalles">
          <button class="details-opener">Abre aquí si quieres ver los detalles económicos <span>⌄</span></button>
          <div class="economics-grid" hidden>
            <article class="glass-panel finance-card"><div class="finance-header"><h2>🚌 Opción en bus</h2></div><ul>${costRows(busCosts)}</ul></article>
            <div class="final-question reveal">¿Quieres vivir esta experiencia conmigo? 💙</div>
          </div>
        </section>
      </main>`
    root.append(createSnow())
    root.querySelector('.music-button').addEventListener('click', toggleMusic)
    setupInteractions()
    setupRevealObserver()
  }, 750)
}

function setupInteractions() {
  const wheel = root.querySelector('.roulette-wheel')
  const stage = root.querySelector('.roulette-stage')
  const spinButton = root.querySelector('.spin-button')
  const letter = root.querySelector('.letter-card')
  let spun = false

  spinButton.addEventListener('click', () => {
    if (spun) return
    spun = true
    spinButton.textContent = 'girando despacito…'
    stage.classList.add('spinning')
    wheel.classList.add('is-spinning')
    wheel.style.transform = `rotate(${2520 + Math.floor(Math.random() * 180)}deg)`
    setTimeout(() => {
      stage.classList.remove('spinning')
      wheel.classList.remove('is-spinning')
      spinButton.textContent = 'la sorpresa apareció ✨'
      letter.hidden = false
      requestAnimationFrame(() => letter.classList.add('letter-visible'))
    }, 4600)
  })

  const opener = root.querySelector('.details-opener')
  const grid = root.querySelector('.economics-grid')
  opener.addEventListener('click', () => {
    const opening = grid.hidden
    grid.hidden = false
    opener.classList.toggle('open', opening)
    grid.classList.toggle('economics-visible', opening)
    if (!opening) setTimeout(() => { grid.hidden = true }, 450)
  })
}

function setupRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.16 })
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
}

let audioState
function toggleMusic(event) {
  if (!audioState) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(ctx.destination)
    ;[174.61, 261.63, 392].forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const localGain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      localGain.gain.value = 0.22 / (index + 1)
      osc.connect(localGain).connect(gain)
      osc.start()
    })
    audioState = { ctx, gain, on: false }
  }
  audioState.on = !audioState.on
  audioState.ctx.resume()
  audioState.gain.gain.setTargetAtTime(audioState.on ? 0.035 : 0, audioState.ctx.currentTime, 0.2)
  event.currentTarget.textContent = audioState.on ? '♫' : '♩'
}

renderLanding()
