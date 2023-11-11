import { createSignal, For, Match, Switch } from 'solid-js'
import { copyToClipboard } from './copyToClipboard'
import { CharityOverlayComponent } from '../charity/CharityOverlay'
import { CharityOverlayComponent2 } from '../charity/CharityOverlay2'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'
import { JJData } from '@ycapp/model'
import { TextField } from '@kobalte/core'

export const CharitiesOverviewComponent = () => {
  const [speed, setSpeed] = createSignal(2)
  const [titleLogo, setTitleLogo] = createSignal('none')
  const [theme, setTheme] = createSignal('default')
  const [url, setUrl] = createSignal('jinglejam.tiltify.com')
  const [showRaised, setShowRaised] = createSignal<boolean>(true)

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
                <label for="charity1overviewtheme">Theme:</label>
              </td>
              <td>
                <select
                  class={' bg-transparent'}
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
              </td>
            </tr>
            <tr>
              <td>
                <label for="cspeed">Speed:</label>
              </td>
              <td>
                <select
                  class={' bg-transparent'}
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
            const overlay = `https://jinglejam.yogs.app/overlay/charities?speed=${speed()}&theme=${theme()}&tiltifyurl=${url()}&titlelogo=${titleLogo()}`
            copyToClipboard(overlay)
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
        <CharityOverlayComponent
          speed={speed()}
          theme={theme()}
          showRaised={showRaised()}
          url={url()}
          titleLogo={titleLogo()}
        />
      </div>
    </div>
  )
}

export const CharitiesOverviewComponent2 = () => {
  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })

  const [theme, setTheme] = createSignal('default')
  const [headerTheme, setHeaderTheme] = createSignal('default')
  const [header, setHeader] = createSignal(['title'])
  const [showDesc, setShowDesc] = createSignal(true)
  const [showQRCode, setShowQRCode] = createSignal(true)
  const [showUrl, setShowUrl] = createSignal(true)
  const [showRaised, setShowRaised] = createSignal(true)
  const [speed, setSpeed] = createSignal(8)
  const [selectedCauses, setSelectedCauses] = createSignal<string[]>([])
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
      return 50 + 400
    }
    return 400
  }

  const heightStr = () => `${height()}px`
  const url = () => {
    let url = 'https://jinglejam.yogs.app/overlay/charities2?'
    if (import.meta.env.DEV) {
      url = 'http://localhost:5001/overlay/charities2?'
    }
    url += `header=${header().join(',')}&`
    if (selectedCauses().length > 0) {
      url += `causes=${selectedCauses().join(',')}&`
    }
    url += `headerTheme=${headerTheme()}&`
    url += `theme=${theme()}&`
    url += `showcharitydesc=${showDesc()}&`
    url += `showcharityqrcode=${showQRCode()}&`
    url += `showcharityurl=${showUrl()}&`
    url += `speed=${speed()}&`
    url += `showraised=${showRaised()}`
    return url
  }
  return (
    <div class={''}>
      <div class={'flex flex-col gap-1 text-white'}>
        <p class={'text-2xl'}>JJ Charities 2</p>
        <p>Recommended Browser source size 300x{height()}</p>
        <div class={'grid grid-cols-2 gap-1'}>
          <div class={'flex flex-col gap-1'}>
            <div class={'flex flex-row gap-2'}>
              <label for="headercharity2Speed">Animation speed</label>
              <input
                class={'flex-1 text-black'}
                value={speed()}
                onchange={e => {
                  setSpeed(+e.target.value)
                }}
                min={8}
                max={20}
                step={1}
                type="number"
                id="headercharity2Speed"
                name="headercharity2Speed"
              />
            </div>
            <div>
              <input
                class={''}
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
                class={''}
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
                class={''}
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

            <div>
              <input
                class={''}
                checked={showDesc()}
                onchange={() => {
                  setShowDesc(!showDesc())
                }}
                type="checkbox"
                id="charity2showDescCheckbox"
                name="charity2showDescCheckbox"
              />
              <label for="charity2showDescCheckbox">Show charity description</label>
            </div>

            <div>
              <input
                class={''}
                checked={showQRCode()}
                onchange={() => {
                  setShowQRCode(!showQRCode())
                }}
                type="checkbox"
                id="charity2showQRCodeCheckbox"
                name="charity2showQRCodeCheckbox"
              />
              <label for="charity2showQRCodeCheckbox">Show charity QRCode</label>
            </div>
            <div>
              <input
                class={''}
                checked={showUrl()}
                onchange={() => {
                  setShowUrl(!showUrl())
                }}
                type="checkbox"
                id="charity2showUrlCheckbox"
                name="charity2showUrlCheckbox"
              />
              <label for="charity2showUrlCheckbox">Show charity url</label>
            </div>
            <div>
              <input
                class={''}
                checked={showRaised()}
                onchange={() => {
                  setShowRaised(!showRaised())
                }}
                type="checkbox"
                id="charity2showRaisedCheckbox"
                name="charity2showRaisedCheckbox"
              />
              <label for="charity2showRaisedCheckbox">Show raised amounts</label>
            </div>

            <table>
              <tbody>
                <tr>
                  <td>
                    <label for="charity2headeroverviewtheme">Header Theme:</label>
                  </td>
                  <td>
                    <select
                      class={'accent-accent-500 bg-transparent'}
                      name="charity2headeroverviewtheme"
                      id="charity2headeroverviewtheme"
                      value={headerTheme()}
                      onchange={e => {
                        setHeaderTheme(e.target.value)
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
                    <label for="charity2overviewtheme">Theme:</label>
                  </td>
                  <td>
                    <select
                      class={'accent-accent-500 bg-transparent'}
                      name="charity2overviewtheme"
                      id="charity2overviewtheme"
                      value={theme()}
                      onchange={e => {
                        setTheme(e.target.value)
                      }}
                    >
                      <option value={'default'}>Default</option>
                      <option value={'red'}>Red</option>
                      <option value={'blue'}>Blue</option>
                      <option value={'carousel'}>Carousel</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class={'flex flex-col gap-1'}>
            <Switch>
              <Match when={charityData.loading}>
                <p>Loading Charities...</p>
              </Match>
              <Match when={charityData.error}>
                <p>Error while loading charities</p>
              </Match>
              <Match when={charityData.data}>
                <p>Select charities</p>
                <p>If no charities are selected all will be shown</p>
                <For each={charityData.data.causes}>
                  {cause => {
                    const name = () => {
                      if (cause.name.length > 20) {
                        return cause.name.substring(0, 20) + '...'
                      }
                      return cause.name
                    }
                    const show = () => {
                      return selectedCauses().includes(`${cause.id}`)
                    }
                    const update = () => {
                      if (show()) {
                        setSelectedCauses(prev => prev.filter(id => id !== `${cause.id}`))
                      } else {
                        return setSelectedCauses(prev => [...prev, `${cause.id}`])
                      }
                    }
                    return (
                      <div>
                        <input
                          class={''}
                          checked={show()}
                          onchange={update}
                          type="checkbox"
                          id={`charity2cause${cause.id}`}
                          name={`charity2cause${cause.id}`}
                        />
                        <label for={`charity2cause${cause.id}`}>{name()}</label>
                      </div>
                    )
                  }}
                </For>
              </Match>
            </Switch>
          </div>
        </div>
        <button
          class={'bg-accent-500 rounded-2xl p-2 text-white'}
          onclick={() => {
            copyToClipboard(url())
          }}
        >
          Copy Link
        </button>
        <p class={'text-xl'}>Preview</p>
      </div>
      <div
        style={{
          width: '350px',
          height: heightStr(),
        }}
      >
        <CharityOverlayComponent2
          header={header()}
          theme={theme()}
          headerTheme={headerTheme()}
          showDesc={showDesc()}
          showQRCode={showQRCode()}
          showUrl={showUrl()}
          speed={speed()}
          showRaised={showRaised()}
          causes={selectedCauses()}
        />
      </div>
    </div>
  )
}
