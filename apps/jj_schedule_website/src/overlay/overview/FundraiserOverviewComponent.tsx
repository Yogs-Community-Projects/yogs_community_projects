import { createSignal } from 'solid-js'
import { copyToClipboard } from './copyToClipboard'
import { FundraisersOverlay, FundraisersOverlayComponent } from '../fundraisers/FundraisersOverlay'
export const FundraiserOverviewComponent = () => {
  const [speed, setSpeed] = createSignal(2)
  const [theme, setTheme] = createSignal('default')

  return (
    <div>
      <div class={'text-white'}>
        <p>Recommended Browser source height 80px</p>
        <table>
          <tbody>
            <tr>
              <td>
                <label for="fspeed">Speed:</label>
              </td>
              <td>
                <select
                  class={' bg-transparent'}
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
              </td>
            </tr>
            <tr>
              <td>
                <label for="fundraiseroverviewtheme">Theme:</label>
              </td>
              <td>
                <select
                  class={' bg-transparent'}
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
              </td>
            </tr>
          </tbody>
        </table>

        <button
          class={'bg-accent-500 rounded-2xl p-2 text-white'}
          onclick={() => {
            console.log('copy')
            const url = `https://jinglejam.yogs.app/overlay/fundraisers?speed=${speed()}&theme=${theme()}`
            copyToClipboard(url)
          }}
        >
          Copy Link
        </button>
        <p class={'text-xl'}>Preview</p>
      </div>
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
