import { Component, createSignal, Show } from 'solid-js'
import { ScheduleOverlayComponent } from './schedule/ScheduleOverlay'
import { FundraisersOverlay } from './FundraisersOverlay'
import { CharityOverlay } from './CharityOverlay'

export const OverlayOverview: Component = () => {
  return (
    <div class={'p-4'}>
      <p class={'text-3xl'}>JJ OBS Overlays</p>
      <p>
        These are JJ related overlays meant to be used in OBS Browser sources. Use these links and add them to your obs
        scenes.
      </p>
      <div class={'grid grid-cols-2'}>
        <Schedule />
        <div>
          <Fundraisers />
          <Charities />
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

const Schedule = () => {
  const [next, setNext] = createSignal(3)
  const [transparent, setTransparent] = createSignal(true)
  const [header, setHeader] = createSignal(['upnext'])
  const [background, setBackground] = createSignal('#BDD9ED')

  const upnext = () => header().includes('upnext')

  const donate = () => header().includes('donate')
  const jjlink = () => header().includes('jjlink')
  const extension = () => header().includes('extension')
  const updateHeader = (value: string) => {
    const lst = header()
    if (lst.includes(value)) {
      setHeader(lst.filter(h => h !== value))
    } else {
      setHeader([...lst, value])
    }
  }
  const color = () => {
    if (transparent()) {
      return ''
    }
    return background()
  }

  const height = () => {
    if (header().length > 0) {
      return 50 + next() * 160
    }
    return next() * 160
  }

  const heightStr = () => `${height()}px`

  const url = () => {
    let url = 'https://jinglejam.yogs.app/overlay/schedule?'
    if (!transparent()) {
      url += `background=${background().substring(1)}&`
    }
    url += `header=${header().join(',')}&`
    url += `next=${next()}`
    return url
  }

  return (
    <div class={''}>
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
            checked={upnext()}
            onchange={() => {
              updateHeader('upnext')
            }}
            type="checkbox"
            id="headerupnextCheckbox"
            name="headerupnextCheckbox"
          />
          <label for="headerupnextCheckbox">Show Up Next</label>
        </div>
        <div>
          <input
            class={'accent-primary-500'}
            checked={donate()}
            onchange={() => {
              updateHeader('donate')
            }}
            type="checkbox"
            id="headerdonateCheckbox"
            name="headerdonateCheckbox"
          />
          <label for="headerdonateCheckbox">Show !donate command</label>
        </div>
        <div>
          <input
            class={'accent-primary-500'}
            checked={jjlink()}
            onchange={() => {
              updateHeader('jjlink')
            }}
            type="checkbox"
            id="headerjjlinkCheckbox"
            name="headerjjlinkCheckbox"
          />
          <label for="headerjjlinkCheckbox">Show JJ Link</label>
        </div>
        <div>
          <input
            class={'accent-primary-500'}
            checked={extension()}
            onchange={() => {
              updateHeader('extension')
            }}
            type="checkbox"
            id="headerextensionCheckbox"
            name="headerextensionCheckbox"
          />
          <label for="headerextensionCheckbox">Show JJ Extension banner</label>
        </div>
      </div>
      <button
        class={'bg-primary-500 rounded-2xl p-2 text-white'}
        onclick={() => {
          copyToClipboard(url())
        }}
      >
        Copy Link
      </button>
      <div>Recommended Browser source size in px: 280x{height()}</div>
      <p class={'text-xl'}>Preview</p>
      <div
        style={{
          width: '280px',
          height: heightStr(),
          'max-height': heightStr(),
        }}
      >
        <ScheduleOverlayComponent next={next()} background={color()} header={header()} />
      </div>
    </div>
  )
}

const Fundraisers = () => {
  const [speed, setSpeed] = createSignal(2)

  return (
    <div>
      <p class={'text-2xl'}>JJ Community Fundraisers</p>
      <p class={'font-bold text-red-600'}>This is still work in progress. This is data from 2022.</p>
      <p>Recommended Browser source height 72px</p>
      <div>
        <label for="fspeed">Speed:</label>
        <select
          class={'accent-primary-500'}
          name="fspeed"
          id="fspeed"
          value={speed()}
          onchange={e => {
            setSpeed(+e.target.value)
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button
        class={'bg-primary-500 rounded-2xl p-2 text-white'}
        onclick={() => {
          console.log('copy')
          const url = `https://jinglejam.yogs.app/overlay/fundraisers?speed=${speed()}`
          copyToClipboard(url)
        }}
      >
        Copy Link
      </button>
      <p class={'text-xl'}>Preview</p>
      <div
        style={{
          width: '100%',
          height: '72px',
        }}
      >
        <FundraisersOverlay speed={speed()} />
      </div>
    </div>
  )
}

const Charities = () => {
  const [speed, setSpeed] = createSignal(2)
  return (
    <div>
      <p class={'text-2xl'}>JJ Charities</p>
      <p class={'font-bold text-red-600'}>This is still work in progress. This is data from 2022.</p>
      <p>Recommended Browser source height 72px</p>
      <div>
        <label for="cspeed">Speed:</label>
        <select
          class={'accent-primary-500'}
          name="cspeed"
          id="cspeed"
          value={speed()}
          onchange={e => {
            setSpeed(+e.target.value)
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button
        class={'bg-primary-500 rounded-2xl p-2 text-white'}
        onclick={() => {
          console.log('copy')
          const url = `https://jinglejam.yogs.app/overlay/charities?speed=${speed()}`
          copyToClipboard(url)
        }}
      >
        Copy Link
      </button>
      <p class={'text-xl'}>Preview</p>
      <div
        style={{
          width: '100%',
          height: '72px',
        }}
      >
        <CharityOverlay speed={speed()} />
      </div>
    </div>
  )
}
