// Smooth scroll behavior for anchor links (exclude back-to-top)
document.querySelectorAll('a[href^="#"]:not(#backToTop)').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Back to top link
const backToTopLink = document.getElementById('backToTop')
if (backToTopLink) {
  backToTopLink.addEventListener('click', function (e) {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

// ================================
// Text Animations
// ================================

const LETTER_STAGGER = 65   // ms between each letter
const LETTER_DURATION = 1000 // ms for each letter's transition

function splitIntoLetters(element, baseDelay = 0) {
  const original = element.innerText.trim()
  element.setAttribute('aria-label', original)
  element.dataset.baseDelay = baseDelay

  let globalIndex = 0
  const words = original.split(' ')

  element.innerHTML = words.map((word, wordIdx) => {
    // Wrap each word's letters in a nowrap span so words never break mid-letter
    const wordHTML = [...word].map(char => {
      const delay = baseDelay + globalIndex * LETTER_STAGGER
      globalIndex++
      return `<span class="letter-wrapper"><span class="letter-inner" style="transition-delay:${delay}ms">${char}</span></span>`
    }).join('')

    // Count the space in stagger timing, add a real space after (except last word)
    if (wordIdx < words.length - 1) {
      globalIndex++
      return `<span style="display:inline;white-space:nowrap">${wordHTML}</span> `
    }
    return `<span style="display:inline;white-space:nowrap">${wordHTML}</span>`
  }).join('')
}

function animateText(element, type) {
  if (type === 'letters') {
    splitIntoLetters(element)
    element.classList.add('anim-letters')
  } else if (type === 'lead') {
    element.classList.add('anim-lead')
  }
}

// IntersectionObserver — trigger once at 20% visibility
const textObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      textObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.2 })

// H1 — immediate on load
const h1El = document.querySelector('.about__name')
const h1LastLetterDelay = (h1El.innerText.trim().length - 1) * LETTER_STAGGER
splitIntoLetters(h1El)
h1El.classList.add('anim-letters')
requestAnimationFrame(() => requestAnimationFrame(() => h1El.classList.add('is-visible')))

// H2s, H3s and ps — fade in on scroll
document.querySelectorAll('h2, h3, p').forEach(el => {
  animateText(el, 'lead')
  textObserver.observe(el)
})

// Re-split letter elements on resize — only if width changes (ignores mobile address bar height change)
let resizeDebounce
let lastWidth = window.innerWidth

window.addEventListener('resize', () => {
  clearTimeout(resizeDebounce)
  resizeDebounce = setTimeout(() => {
    const currentWidth = window.innerWidth
    if (currentWidth === lastWidth) return
    lastWidth = currentWidth

    document.querySelectorAll('.anim-letters').forEach(el => {
      const wasVisible = el.classList.contains('is-visible')
      const baseDelay = parseInt(el.dataset.baseDelay || 0)
      el.classList.remove('is-visible')
      splitIntoLetters(el, baseDelay)
      if (wasVisible) {
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')))
      } else {
        textObserver.observe(el)
      }
    })
  }, 200)
})

// ================================
// Email Copy to Clipboard
// ================================

const emailLink = document.querySelector('.contact__email')
if (emailLink) {
  // Set initial tooltip text for desktop hover (::before CSS tooltip)
  emailLink.setAttribute('data-tooltip', 'Copy to clipboard')

  // Body-level tooltip — appended to <body> to escape all card stacking contexts
  const emailTooltip = document.createElement('div')
  emailTooltip.className = 'email-tooltip'
  document.body.appendChild(emailTooltip)

  let tooltipTimeout

  function showEmailTooltip(text) {
    const rect = emailLink.getBoundingClientRect()
    emailTooltip.textContent = text

    if (window.innerWidth < 768) {
      // Mobile: center below the email element
      emailTooltip.style.top = (rect.bottom + 8) + 'px'
      emailTooltip.style.left = (rect.left + rect.width / 2) + 'px'
      emailTooltip.style.transform = 'translateX(-50%)'
    } else {
      // Desktop: right side of the email, vertically centered
      emailTooltip.style.top = (rect.top + rect.height / 2) + 'px'
      emailTooltip.style.left = (rect.right + 12) + 'px'
      emailTooltip.style.transform = 'translateY(-50%)'
    }

    emailTooltip.classList.add('visible')
  }

  function hideEmailTooltip() {
    emailTooltip.classList.remove('visible')
  }

  emailLink.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = 'olympios.element@gmail.com'

    clearTimeout(tooltipTimeout)

    try {
      await navigator.clipboard.writeText(email)
      showEmailTooltip('Copied!')
    } catch (err) {
      console.error('Failed to copy email to clipboard:', err)
      showEmailTooltip('Copy failed')
    }

    tooltipTimeout = setTimeout(hideEmailTooltip, 2000)
  })
}
