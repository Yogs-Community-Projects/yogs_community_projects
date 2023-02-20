import { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'


export const pwaOptions = () => {
  const pwaOptions: Partial<VitePWAOptions> = {
    base: '/',
    includeAssets: [],
    manifest: {
      'name': 'Jingle Jam Schedules',
      'short_name': 'Jingle Jam Schedules',
      'start_url': '.',
      'display': 'standalone',
      'background_color': '#e21350',
      'theme_color': '#e21350',
      'description': 'Jingle Jam Schedules',
      'orientation': 'portrait-primary',
      'prefer_related_applications': false,
      icons: [
        {
          'src': 'src/assets/favicon/android-icon-36x36.png',
          'sizes': '36x36',
          'type': 'image/png',
          'density': '0.75'
        },
        {
          'src': 'src/assets/favicon/android-icon-48x48.png',
          'sizes': '48x48',
          'type': 'image/png',
          'density': '1.0'
        },
        {
          'src': 'src/assets/favicon/android-icon-72x72.png',
          'sizes': '72x72',
          'type': 'image/png',
          'density': '1.5'
        },
        {
          'src': 'src/assets/favicon/android-icon-96x96.png',
          'sizes': '96x96',
          'type': 'image/png',
          'density': '2.0'
        },
        {
          'src': 'src/assets/favicon/android-icon-144x144.png',
          'sizes': '144x144',
          'type': 'image/png',
          'density': '3.0'
        },
        {
          'src': 'src/assets/favicon/android-icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png',
          'density': '4.0'
        }
      ]
    },
    devOptions: {
      type: 'module',
      navigateFallback: 'index.html'
    }
  }

  const replaceOptions = { __DATE__: new Date().toISOString() }
  const claims = process.env.CLAIMS === 'true'
  const reload = process.env.RELOAD_SW === 'true'
  const selfDestroying = process.env.SW_DESTROY === 'true'

  if (process.env.SW === 'true') {
    pwaOptions.srcDir = 'src'
    pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
    pwaOptions.strategies = 'injectManifest'
    ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
    ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
  }

  if (claims)
    pwaOptions.registerType = 'autoUpdate'

  if (reload) {
    // @ts-expect-error just ignore
    replaceOptions.__RELOAD_SW__ = 'true'
  }

  if (selfDestroying)
    pwaOptions.selfDestroying = selfDestroying


  pwaOptions.registerType = 'autoUpdate'

  return pwaOptions
}
