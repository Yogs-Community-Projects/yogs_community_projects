import { createSignal } from 'solid-js'
import { copyToClipboard } from './copyToClipboard'
import { FundraisersOverlay, FundraisersOverlayComponent } from '../fundraisers/FundraisersOverlay'
export const FundraiserOverviewComponent = () => {
  const [speed, setSpeed] = createSignal(2)
  const [theme, setTheme] = createSignal('default')

  return (
    <div>
      <p class={'text-2xl'}>JJ Community Fundraisers</p>
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
      <div>
        <label for="fundraiseroverviewtheme">Theme:</label>
        <select
          class={'accent-primary-500'}
          name="fundraiseroverviewtheme"
          id="fundraiseroverviewtheme"
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
          const url = `https://jinglejam.yogs.app/overlay/fundraisers?speed=${speed()}&theme=${theme()}`
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
        <FundraisersOverlayComponent speed={speed()} theme={theme()} />
      </div>
    </div>
  )
}
