import { createSignal, Show } from 'solid-js'
import { DateTime } from 'luxon'
import { copyToClipboard } from './copyToClipboard'
import { ScheduleOverlayDateProviderProvider } from '../schedule/ScheduleOverlayDateProvider'
import { ScheduleOverlayComponent } from '../schedule/ScheduleOverlay'
import { useNow } from '@ycapp/common'

export const ScheduleOverviewComponent = () => {
  const [next, setNext] = createSignal(3)
  const [transparent, setTransparent] = createSignal(true)
  const [header, setHeader] = createSignal(['upnext'])
  const [background, setBackground] = createSignal('#BDD9ED')
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
      <div>
        <input
          class={'accent-primary-500'}
          checked={testDate()}
          onchange={toggleTestDate}
          type="checkbox"
          id="testDateCheckbox"
          name="testDateCheckbox"
        />
        <label for="testDateCheckbox">Test specific date and time</label>
      </div>
      <Show when={testDate()}>
        <input
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
      </Show>
      <div
        style={{
          width: '280px',
          height: heightStr(),
          'max-height': heightStr(),
        }}
      >
        <ScheduleOverlayDateProviderProvider debug={testDate()} date={testDate() ? date() : useNow()}>
          <ScheduleOverlayComponent next={next()} background={color()} header={header()} />
        </ScheduleOverlayDateProviderProvider>
      </div>
    </div>
  )
}
