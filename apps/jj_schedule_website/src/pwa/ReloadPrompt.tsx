import type { Component } from 'solid-js'
import { Show } from 'solid-js'
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/solid'
// @ts-ignore
import { pwaInfo } from 'virtual:pwa-info'

// eslint-disable-next-line no-console
console.log(pwaInfo)

const ReloadPrompt: Component = () => {
  // replaced dynamically
  const reloadSW = '__RELOAD_SW__'
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(swUrl, r) {
      // eslint-disable-next-line no-console
      console.log(`Service Worker at: ${swUrl}`)
      // @ts-expect-error just ignore
      if (reloadSW === 'true') {
        r &&
          setInterval(() => {
            // eslint-disable-next-line no-console
            console.log('Checking for sw update')
            r.update()
          }, 20000 /* 20s for testing purposes */)
      } else {
        // eslint-disable-next-line no-console
        console.log(`SW Registered: ${r}`)
      }
    },
    onRegisterError(error) {
      console.error('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div class={''}>
      <Show when={offlineReady() || needRefresh()}>
        <div class={''}>
          <div class={''}>
            <Show
              fallback={<span>New content available, click on reload button to update.</span>}
              when={offlineReady()}
            >
              <span>App ready to work offline</span>
            </Show>
          </div>
          <Show when={needRefresh()}>
            <button class={''} onClick={() => updateServiceWorker(true)}>
              Reload
            </button>
          </Show>
          <button class={''} onClick={() => close()}>
            Close
          </button>
        </div>
      </Show>
    </div>
  )
}

export default ReloadPrompt
