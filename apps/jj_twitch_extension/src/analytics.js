window.dataLayer = window.dataLayer || []

function gtag() {
  dataLayer.push(arguments)
}

gtag('js', new Date())
gtag('config', 'G-YQFGEFJHHN', { anonymize_ip: true, cookie_flags: 'max-age=7200;secure;samesite=none' })
window.gtag = gtag

console.log('a', 'init')
