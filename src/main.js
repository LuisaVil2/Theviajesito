const activities = [
  ['Viaje a Manizales', 'Una ruta fría para empezar bonito.', '⌖'],
  ['Glamping en clima frío', 'Mantas, bosque y cielo de montaña.', '△'],
  ['Restaurante decorado', 'Una mesa suave, íntima y pensada.', '◌'],
  ['Viaje al Nevado del Ruiz', 'Nieve, silencio y paisaje inmenso.', '❄'],
  ['Aguas termales', 'Calorcito en medio del invierno.', '≈'],
  ['Amanecer frío juntos', 'Ver la luz llegar abrazaditos.', '☾'],
  ['Arrunchis viendo el paisaje', 'Quedarnos ahí, sin afán.', '♡'],
]

const busDetails = [
  '$19.000 según Redbus a Manizales, ida y vuelta.',
  '$38.000 x 2 = $76.000',
  '$90.000 según Uber del terminal de Manizales al glamping',
  '$250.000 habitación sencilla',
  '$60.000 decoración del restaurante',
  '$50.000 transporte hasta el nevado',
  '$395.000 tour nevado, aguas termales y regreso a Manizales',
  '$395.000 x 2 = $790.000',
]

const carDetails = [
  'Ruta en carro pensada para ir tranquilos, parando bonito y sin correr.',
  '$250.000 habitación sencilla',
  '$60.000 decoración del restaurante',
  '$50.000 transporte hasta el nevado',
  '$395.000 tour nevado, aguas termales y regreso a Manizales',
  '$395.000 x 2 = $790.000',
]

const root = document.querySelector('#root')

function catSvg() {
  return `
    <svg viewBox="0 0 420 360" class="cat-art" role="img" aria-label="Un gato abrigado sentado sobre nieve">
      <defs>
        <radialGradient id="fur" cx="50%" cy="35%" r="70%"><stop offset="0%" stop-color="#f7fbff"/><stop offset="62%" stop-color="#d6e4f4"/><stop offset="100%" stop-color="#9eb7d1"/></radialGradient>
        <linearGradient id="scarf" x1="0" x2="1"><stop stop-color="#6bbcff"/><stop offset="1" stop-color="#9a86ff"/></linearGradient>
      </defs>
      <ellipse cx="210" cy="316" rx="126" ry="26" fill="#dff4ff" opacity=".28"/>
      <path class="tail" d="M302 238c43 6 62 33 42 56-21 24-73 8-83-24" fill="none" stroke="#b5c8dc" stroke-width="26" stroke-linecap="round"/>
      <path d="M132 151c-10 36-14 98 16 133 29 34 101 38 132 2 31-36 26-99 13-135-17-47-143-48-161 0Z" fill="url(#fur)"/>
      <path d="M134 133 96 73l66 26M286 133l38-60-66 26" fill="#d9e6f5" stroke="#a9bdd2" stroke-width="7" stroke-linejoin="round"/>
      <path d="M112 83 142 111 127 99M308 83l-30 28 15-12" fill="#b7d1e8" opacity=".8"/>
      <ellipse cx="210" cy="150" rx="93" ry="78" fill="url(#fur)"/>
      <g class="blink"><path d="M165 145c10-10 25-10 35 0" fill="none" stroke="#233652" stroke-width="7" stroke-linecap="round"/><path d="M220 145c10-10 25-10 35 0" fill="none" stroke="#233652" stroke-width="7" stroke-linecap="round"/></g>
      <path d="M210 158c-8 5-15 5-21 0 8 18 34 18 42 0-6 5-13 5-21 0Z" fill="#516b86" opacity=".8"/>
      <path d="M204 170c-12 12-28 10-38 1M216 170c12 12 28 10 38 1" fill="none" stroke="#637b94" stroke-width="4" stroke-linecap="round" opacity=".75"/>
      <path d="M137 189c40 19 104 22 146 0l11 34c-51 28-117 28-169 0Z" fill="url(#scarf)"/>
      <path d="M248 210c18 14 22 41 14 67l-38-20c11-18 16-33 11-45Z" fill="#736ee8"/>
      <path d="M134 238c-18 21-15 55 5 68M286 238c18 21 15 55-5 68" fill="none" stroke="#edf7ff" stroke-width="22" stroke-linecap="round" opacity=".9"/>
      <circle cx="166" cy="162" r="8" fill="#efb7c8" opacity=".5"/><circle cx="254" cy="162" r="8" fill="#efb7c8" opacity=".5"/>
      <g fill="#fff" opacity=".85"><circle cx="104" cy="260" r="5"/><circle cx="330" cy="230" r="4"/><circle cx="286" cy="86" r="3"/><circle cx="146" cy="61" r="3"/></g>
    </svg>`
}

function createSnow() {
  const layer = document.createElement('div')
  layer.className = 'snow-layer'
  layer.setAttribute('aria-hidden', 'true')
  Array.from({ length: 86 }).forEach((_, i) => {
    const flake = document.createElement('span')
    flake.className = 'snowflake'
    flake.style.cssText = `--left:${Math.random() * 100}%;--size:${Math.random() * 3.5 + 1.5}px;--delay:${Math.random() * -24}s;--duration:${Math.random() * 18 + 16}s;--drift:${Math.random() * 90 - 45}px;--opacity:${Math.random() * .45 + .2}`
    flake.dataset.id = i
    layer.append(flake)
  })
  return layer
}

function costLines(items) {
  return items.map((item, index) => `<li class="cost-line reveal" style="--delay:${index * 55}ms"><span class="strike-text">${item}</span><span class="covered">✓ cubierto 💙</span></li>`).join('')
}

function renderLanding() {
  root.innerHTML = `
    <div class="animated-sky"></div><div class="blur-field blur-one"></div><div class="blur-field blur-two"></div>
    <button class="music-button" aria-label="Activar o pausar ambiente sonoro">♩</button>
    <section class="landing section-shell screen-in">
      <div class="cat-orbit">${catSvg()}</div>
      <button class="enter-button">Abre aquí si quieres vivir esta aventura conmigo 💙</button>
      <span class="landing-hint">Una noche fría, una idea bonita.</span>
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
          <div class="section-kicker reveal">nuestro invierno</div>
          <h1 class="section-title reveal">Nuestro plan ✨</h1>
          <div class="activity-grid">
            ${activities.map(([title, note, icon], index) => `
              <article class="glass-card activity-card reveal" style="--delay:${index * 70}ms">
                <div class="icon-veil">${icon}</div><h2>${title}</h2><p>${note}</p>
              </article>`).join('')}
          </div>
        </section>
        <section class="roulette-section section-shell">
          <div class="aurora-divider"></div><div class="section-kicker reveal">una pequeña sorpresa</div>
          <div class="roulette-stage">
            <div class="roulette-wheel"><span class="wheel-ring"></span><span class="wheel-glow"></span><span class="wheel-spark">✦</span></div>
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
            <article class="glass-card finance-card"><div class="finance-header"><span>🚌</span><h2>Opción en bus</h2></div><ul>${costLines(busDetails)}</ul></article>
            <article class="glass-card finance-card"><div class="finance-header"><span>🚙</span><h2>Opción en carro</h2></div><ul>${costLines(carDetails)}</ul></article>
            <div class="covered-note">No te preocupes por eso. Yo quiero crear esta experiencia contigo.</div>
          </div>
        </section>
        <footer>hecho con frío, calma y mucho amor</footer>
      </main>`
    root.append(createSnow())
    root.querySelector('.music-button').addEventListener('click', toggleMusic)
    setupInteractions()
    setupRevealObserver()
  }, 750)
}

function setupInteractions() {
  const wheel = root.querySelector('.roulette-wheel')
  const spinButton = root.querySelector('.spin-button')
  const letter = root.querySelector('.letter-card')
  let spun = false

  spinButton.addEventListener('click', () => {
    if (spun) return
    spun = true
    spinButton.textContent = 'girando despacito…'
    wheel.classList.add('is-spinning')
    wheel.style.transform = `rotate(${1980 + Math.floor(Math.random() * 120)}deg)`
    setTimeout(() => {
      wheel.classList.remove('is-spinning')
      spinButton.textContent = 'la sorpresa apareció ✨'
      letter.hidden = false
      requestAnimationFrame(() => letter.classList.add('letter-visible'))
    }, 3900)
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
  }, { threshold: 0.18 })
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
