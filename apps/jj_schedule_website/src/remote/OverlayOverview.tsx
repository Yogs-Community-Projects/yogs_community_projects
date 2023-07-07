import { Component, createSignal, Show } from 'solid-js'
import { ScheduleOverlayComponent } from './ScheduleOverlay'
import { FundraisersOverlay } from './FundraisersOverlay'
import { CharityOverview } from 'jj_twitch_extension/src/ui/charity/CharityOverview'
import { CharityOverlay } from './CharityOverlay'

export const OverlayOverview: Component = () => {
  const [next, setNext] = createSignal(3)
  const [transparent, setTransparent] = createSignal(true)
  const [header, setHeader] = createSignal(true)
  const [animHeader, setAnimHeader] = createSignal(false)
  const [background, setBackground] = createSignal('#BDD9ED')

  const color = () => {
    if (transparent()) {
      return ''
    }
    return background()
  }

  const height = () => {
    if (header()) {
      return 50 + next() * 150
    }
    return next() * 150
  }

  return (
    <div class={'p-4'}>
      <p class={'text-3xl'}>JJ OBS Overlays</p>
      <p>
        These are JJ related overlays meant to be used in OBS Browser sources. Use these links and add them to your obs
        scenes.
      </p>
      <div class={'grid grid-cols-2'}>
        <div>
          <div class={'flex flex-col'}>
            <p class={'text-2xl'}>Yogs JJ Schedule</p>
            <div>
              <label for="next">Number of streams:</label>
              <select
                class={'accent-primary-500'}
                name="next"
                id="next"
                value={next()}
                onchange={e => {
                  setNext(+e.target.value)
                }}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div>
              <input
                class={'accent-primary-500'}
                checked={transparent()}
                onchange={() => {
                  setTransparent(!transparent())
                }}
                type="checkbox"
                id="colorCheckbox"
                name="colorCheckbox"
              />
              <label for="colorCheckbox">Transparent background</label>
            </div>
            <Show when={!transparent()}>
              <input
                class={'accent-primary-500'}
                type="color"
                id="head"
                name="head"
                value={background()}
                onchange={e => {
                  console.log(e.target.value)
                  setBackground(e.target.value)
                }}
              />
            </Show>
            <div>
              <input
                class={'accent-primary-500'}
                checked={header()}
                onchange={() => {
                  setHeader(!header())
                }}
                type="checkbox"
                id="headerCheckbox"
                name="headerCheckbox"
              />
              <label for="headerCheckbox">Show Header</label>
            </div>
            <Show when={header()}>
              <div>
                <input
                  class={'accent-primary-500'}
                  checked={animHeader()}
                  onchange={() => {
                    setAnimHeader(!animHeader())
                  }}
                  type="checkbox"
                  id="aminheaderCheckbox"
                  name="aminheaderCheckbox"
                />
                <label for="aminheaderCheckbox">Animate Header</label>
              </div>
            </Show>
          </div>
          <button
            class={'bg-primary-500 rounded-2xl p-2 text-white'}
            onclick={() => {
              console.log('copy')
              let url = 'https://jinglejam.yogs.app/overlay/schedule?'
              if (!transparent()) {
                url += `background=${background().substring(1)}&`
              }
              if (header()) {
                url += 'header=true&'
              } else {
                url += 'header=false&'
              }
              if (animHeader()) {
                url += 'animatedheader=true&'
              } else {
                url += 'animatedheader=false&'
              }
              url += `next=${next()}`
              copyToClipboard(url)
            }}
          >
            Copy Link
          </button>
          <div>Recommended Browser source size in px: 300x{height()}</div>
          <div
            style={{
              width: '300px',
              height: `${height()}px`,
            }}
          >
            <ScheduleOverlayComponent next={next()} background={color()} header={header()} anim={animHeader()} />
          </div>
        </div>
        <div>
          <p class={'text-2xl'}>JJ Community Fundraisers</p>
          <p>This does use demo data in will currently not update</p>
          <p>Recommended Browser source height 72px</p>
          <button
            class={'bg-primary-500 rounded-2xl p-2 text-white'}
            onclick={() => {
              console.log('copy')
              const url = 'https://jinglejam.yogs.app/overlay/fundraisers'
              copyToClipboard(url)
            }}
          >
            Copy Link
          </button>
          <div
            style={{
              width: '100%',
              height: '72px',
            }}
          >
            <FundraisersOverlay />
          </div>
          <p class={'text-2xl'}>JJ Charities</p>
          <p>Recommended Browser source height 72px</p>
          <button
            class={'bg-primary-500 rounded-2xl p-2 text-white'}
            onclick={() => {
              console.log('copy')
              const url = 'https://jinglejam.yogs.app/overlay/charities'
              copyToClipboard(url)
            }}
          >
            Copy Link
          </button>
          <div
            style={{
              width: '100%',
              height: '72px',
            }}
          >
            <CharityOverlay />
          </div>
        </div>
      </div>
    </div>
  )
}

export const copyToClipboard = async (value: string) => {
  try {
    let copyValue = ''

    if (!navigator.clipboard) {
      throw new Error("Browser don't have support for native clipboard.")
    }

    if (value) {
      copyValue = value
    }

    await navigator.clipboard.writeText(copyValue)
  } catch (e) {
    console.log(e.toString())
  }
  try {
    window.alert(`Copied ${value}`)
  } catch (e) {
    console.log(e.toString())
  }
}
