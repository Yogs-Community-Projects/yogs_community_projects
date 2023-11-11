import { createSignal } from 'solid-js'
import { copyToClipboard } from './copyToClipboard'
import { FundraisersOverlayComponent } from '../fundraisers/FundraisersOverlay'
import { TextField } from '@kobalte/core'
export const FundraiserOverviewComponent = () => {
  const [speed, setSpeed] = createSignal(2)
  const [titleLogo, setTitleLogo] = createSignal('none')
  const [theme, setTheme] = createSignal('default')
  const [url, setUrl] = createSignal('jinglejam.tiltify.com')

  const validationState = () => {
    return url().includes('tiltify.com') ? 'valid' : 'invalid'
  }
  return (
    <div>
      <div class={'w-[50%] text-white'}>
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
            <tr>
              <td>
                <label for="ctitletheme">Title Theme:</label>
              </td>
              <td>
                <select
                  class={'bg-transparent'}
                  name="ctitletheme"
                  id="ctitletheme"
                  value={titleLogo()}
                  onchange={e => {
                    setTitleLogo(e.target.value)
                  }}
                >
                  <option value={'none'}>None</option>
                  <option value={'jjred'}>Red JJ Logo</option>
                  <option value={'jjblue'}>Blue JJ Logo</option>
                  <option value={'jjwhite'}>White JJ Logo</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <TextField.Root class={'flex flex-col p-2'} value={url()} onChange={setUrl} validationState={validationState()}>
          <TextField.Label class={'flex flex-row items-center'}>Tiltify url</TextField.Label>
          <TextField.Input class={'text-black'}></TextField.Input>
          <TextField.ErrorMessage class={''}>Not a Tiltify Url</TextField.ErrorMessage>
        </TextField.Root>
        <button
          class={'bg-accent-500 rounded-2xl p-2 text-white'}
          onclick={() => {
            console.log('copy')
            const overlayUrl = `https://jinglejam.yogs.app/overlay/fundraisers?speed=${speed()}&theme=${theme()}&tiltifyurl=${url()}%titlelogo=${titleLogo()}`
            copyToClipboard(overlayUrl)
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
        <FundraisersOverlayComponent speed={speed()} theme={theme()} url={url()} titleLogo={titleLogo()} />
      </div>
    </div>
  )
}
