// eslint-disable-next-line no-undef
window.dataLayer = window.dataLayer || []

function gtag() {
  // eslint-disable-next-line no-undef
  dataLayer.push(arguments)
}

gtag('js', new Date())
gtag('config', 'G-YQFGEFJHHN', { anonymize_ip: true, cookie_flags: 'max-age=7200;secure;samesite=none' })
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'granted',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'denied',
})
// eslint-disable-next-line no-undef
window.gtag = gtag
