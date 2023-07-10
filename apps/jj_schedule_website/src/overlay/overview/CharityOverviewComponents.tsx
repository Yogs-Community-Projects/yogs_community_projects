import { createSignal } from 'solid-js'
import { copyToClipboard } from './copyToClipboard'
import { CharityOverlayComponent } from '../charity/CharityOverlay'
import { CharityOverlayComponent2 } from '../charity/CharityOverlay2'

export const CharitiesOverviewComponent = () => {
  const [speed, setSpeed] = createSignal(2)
  const [theme, setTheme] = createSignal('default')

  return (
    <div>
      <p class={'text-2xl'}>JJ Charities</p>
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
      <div>
        <label for="charity1overviewtheme">Theme:</label>
        <select
          class={'accent-primary-500'}
          name="charity1overviewtheme"
          id="charity1overviewtheme"
          value={theme()}
          onchange={e => {
            setTheme(e.target.value)
          }}
        >
          <option value={'default'}>Default</option>
          <option value={'red'}>Red</option>
          <option value={'blue'}>Blue</option>
        </select>
      </div>
      <button
        class={'bg-primary-500 rounded-2xl p-2 text-white'}
        onclick={() => {
          console.log('copy')
          const url = `https://jinglejam.yogs.app/overlay/charities?speed=${speed()}&theme=${theme()}`
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
        <CharityOverlayComponent speed={speed()} theme={theme()} />
      </div>
    </div>
  )
}

export const CharitiesOverviewComponent2 = () => {
  const [header, setHeader] = createSignal(['title'])
  const title = () => header().includes('title')

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

  const height = () => {
    if (header().length > 0) {
      return 50 + 350
    }
    return 350
  }

  const heightStr = () => `${height()}px`
  const url = () => {
    let url = 'https://jinglejam.yogs.app/overlay/charities2?'
    url += `header=${header().join(',')}`
    return url
  }
  return (
    <div>
      <p class={'text-2xl'}>JJ Charities 2</p>
      <p>Recommended Browser source size 300x{height()}</p>
      <div>
        <input
          class={'accent-primary-500'}
          checked={title()}
          onchange={() => {
            updateHeader('title')
          }}
          type="checkbox"
          id="headercharity2titleCheckbox"
          name="headercharity2titleCheckbox"
        />
        <label for="headercharity2titleCheckbox">Title</label>
      </div>
      <div>
        <input
          class={'accent-primary-500'}
          checked={donate()}
          onchange={() => {
            updateHeader('donate')
          }}
          type="checkbox"
          id="headercharity2donateCheckbox"
          name="headerdheadercharity2donateCheckboxonateCheckbox"
        />
        <label for="headercharity2donateCheckbox">Show !donate command</label>
      </div>
      <div>
        <input
          class={'accent-primary-500'}
          checked={jjlink()}
          onchange={() => {
            updateHeader('jjlink')
          }}
          type="checkbox"
          id="headercharity2jjlinkCheckbox"
          name="headercharity2jjlinkCheckbox"
        />
        <label for="headercharity2jjlinkCheckbox">Show JJ Link</label>
      </div>
      <button
        class={'bg-primary-500 rounded-2xl p-2 text-white'}
        onclick={() => {
          copyToClipboard(url())
        }}
      >
        Copy Link
      </button>
      <p class={'text-xl'}>Preview</p>
      <div
        style={{
          width: '350px',
          height: heightStr(),
        }}
      >
        <CharityOverlayComponent2 header={header()} />
      </div>
    </div>
  )
}
