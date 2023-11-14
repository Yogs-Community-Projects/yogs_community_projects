import { createSignal, Show } from 'solid-js'
import { DateTime } from 'luxon'
import { copyToClipboard } from './copyToClipboard'
import { ScheduleOverlayDateProviderProvider } from '../schedule/ScheduleOverlayDateProvider'
import { ScheduleOverlayComponent } from '../schedule/ScheduleOverlay'
import { useNow } from '@ycapp/common'
import { useAnalytics } from '../../AnalyticsProvider'

export const ScheduleOverviewComponent = () => {
  const { log } = useAnalytics()
  const now = useNow()
  const [theme, setTheme] = createSignal('default')
  const [headerTheme, setHeaderTheme] = createSignal('default')
  const [next, setNext] = createSignal(3)
  const [transparent, setTransparent] = createSignal(true)
  const [header, setHeader] = createSignal(['upnext'])
  const [background, setBackground] = createSignal('#BDD9ED')
  const [timezone, setTimezone] = createSignal(true)
  const [date, setDate] = createSignal(
    DateTime.fromObject({
      year: 2023,
      month: 11,
      day: 30,
      hour: 17,
      minute: 30,
    }),
  )
  const [testDate, setTestDate] = createSignal(true)
  const toggleTestDate = () => setTestDate(!testDate())
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
    const t = timezone() ? 40 : 0
    if (header().length > 0) {
      return 60 + next() * 160 + t
    }
    return next() * 160 + t
  }

  const heightStr = () => `${height()}px`

  const url = () => {
    let url = 'https://jinglejam.yogs.app/overlay/schedule?'
    if (!transparent()) {
      url += `background=${background().substring(1)}&`
    }
    url += `header=${header().join(',')}&`
    url += `theme=${theme()}&`
    url += `headertheme=${headerTheme()}&`
    url += `showtimezone=${timezone()}&`
    url += `next=${next()}`
    return url
  }

  return (
    <div class={'flex flex-row items-start justify-start'}>
      <div class={'flex-1 text-white'}>
        <table>
          <tbody>
            <tr>
              <td>
                <label for="next">Number of streams:</label>
              </td>
              <td>
                <select
                  class={'accent-accent-500 bg-transparent'}
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
              </td>
            </tr>
            <tr>
              <td>
                <label for="scheduleheaderoverviewtheme">Header Theme:</label>
              </td>
              <td>
                <select
                  class={'accent-accent-500 bg-transparent'}
                  name="scheduleheaderoverviewtheme"
                  id="scheduleheaderoverviewtheme"
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
                <label for="scheduleoverviewtheme">Theme:</label>
              </td>
              <td>
                <select
                  class={'accent-accent-500 bg-transparent'}
                  name="scheduleoverviewtheme"
                  id="scheduleoverviewtheme"
                  value={theme()}
                  onchange={e => {
                    setTheme(e.target.value)
                  }}
                >
                  <option value={'default'}>Default</option>
                  <option value={'timeofday'}>Time of day</option>
                  <option value={'red'}>Red</option>
                  <option value={'blue'}>Blue</option>
                  <option value={'default_img'}>Default with img</option>
                  <option value={'timeofday_img'}>Time of day with img</option>
                  <option value={'red_img'}>Red with img</option>
                  <option value={'blue_img'}>Blue with img</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <input
            class={'accent-accent-500 bg-transparent'}
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
            class={'accent-accent-500 bg-transparent'}
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
        <div class={'pb-2 pt-2'}>
          <p class={'text-lg'}>Header</p>
          <p>If multiple headers are chosen they will animate between them</p>
          <div>
            <input
              class={'accent-accent-500'}
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
              class={'accent-accent-500'}
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
              class={'accent-accent-500'}
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
              class={'accent-accent-500'}
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

        <div>
          <input
            class={'accent-accent-500'}
            checked={timezone()}
            onchange={() => {
              setTimezone(!timezone())
            }}
            type="checkbox"
            id="timezoneCheckbox"
            name="timezoneCheckbox"
          />
          <label for="timezoneCheckbox">Show Time zone</label>
        </div>
        <button
          class={'bg-accent-500 rounded-2xl p-2 text-white'}
          onclick={() => {
            log('overlay_copy', { overlay_url: url() })
            copyToClipboard(url())
          }}
        >
          Copy Link
        </button>
      </div>
      <div class={'flex flex-1 flex-col'}>
        <p class={'text-xl text-white'}>Preview</p>
        <p class={'text-white'}>Recommended Browser source size in px: 280x{height()}</p>
        <div class={'text-white'}>
          <input
            class={'accent-accent-500'}
            checked={testDate()}
            onchange={toggleTestDate}
            type="checkbox"
            id="testDateCheckbox"
            name="testDateCheckbox"
          />
          <label for="testDateCheckbox">Test specific date and time</label>
        </div>
        <Show when={testDate()}>
          <div class={'flex flex-row gap-2 text-white'}>
            <input
              class={'bg-transparent'}
              type={'date'}
              value={date().toISODate()}
              onchange={e => {
                const d = date()
                const [year, month, day] = e.target.value.split('-')
                setDate(
                  d.set({
                    year: parseInt(year),
                    month: parseInt(month),
                    day: parseInt(day),
                  }),
                )
              }}
            />
            <input
              class={'bg-transparent'}
              type={'time'}
              value={date().toFormat('hh:mm')}
              onchange={e => {
                const d = date()
                const [hour, minute] = e.target.value.split(':')
                setDate(
                  d.set({
                    hour: parseInt(hour),
                    minute: parseInt(minute),
                  }),
                )
              }}
            />
          </div>
        </Show>
        <div
          style={{
            width: '280px',
            height: heightStr(),
          }}
        >
          <ScheduleOverlayDateProviderProvider debug={testDate()} date={testDate() ? date() : now()}>
            <ScheduleOverlayComponent
              next={next()}
              background={color()}
              header={header()}
              theme={theme()}
              headerTheme={headerTheme()}
              showTimezone={timezone()}
            />
          </ScheduleOverlayDateProviderProvider>
        </div>
      </div>
    </div>
  )
}
