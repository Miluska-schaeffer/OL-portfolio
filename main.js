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
