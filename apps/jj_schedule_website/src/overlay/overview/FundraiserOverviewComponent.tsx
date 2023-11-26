import { createSignal } from 'solid-js'
import { copyToClipboard } from './copyToClipboard'
import { FundraisersOverlayComponent } from '../fundraisers/FundraisersOverlay'
import { TextField } from '@kobalte/core'
import { useAnalytics } from '../../AnalyticsProvider'
export const FundraiserOverviewComponent = () => {
  const { log } = useAnalytics()
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
        <p class={'font-bold'}>
          Especially at the beginning of JJ the fundraisers will change a lot which might not look good on stream.
        </p>
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
                  <option class={'text-black'} value={1}>
                    1
                  </option>
                  <option class={'text-black'} value={2}>
                    2
                  </option>
                  <option class={'text-black'} value={3}>
                    3
                  </option>
                  <option class={'text-black'} value={4}>
                    4
                  </option>
                  <option class={'text-black'} value={5}>
                    5
                  </option>
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
                  <option class={'text-black'} value={'default'}>
                    Default
                  </option>
                  <option class={'text-black'} value={'red'}>
                    Red
                  </option>
                  <option class={'text-black'} value={'blue'}>
                    Blue
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="ctitletheme">Title Logo:</label>
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
                  <option class={'text-black'} value={'none'}>
                    None
                  </option>
                  <option class={'text-black'} value={'jjred'}>
                    Red JJ Logo
                  </option>
                  <option class={'text-black'} value={'jjblue'}>
                    Blue JJ Logo
                  </option>
                  <option class={'text-black'} value={'jjwhite'}>
                    White JJ Logo
                  </option>
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
            const overlayUrl = `https://jinglejam.yogs.app/overlay/fundraisers?speed=${speed()}&theme=${theme()}&tiltifyurl=${url()}&titlelogo=${titleLogo()}`
            log('overlay_copy', { overlay_url: overlayUrl })
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
