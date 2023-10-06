import { Component, createEffect, createSignal } from 'solid-js'
import { useScheduleDataString } from '../schedule_simple/ScheduleDataStringProvider'
import { Button, TextField } from '@kobalte/core'
import { IANAZone } from 'luxon'
import { BsInfoCircle } from 'solid-icons/bs'

export const ScheduleDataStringEditor: Component = () => {
  const { schedule, setSchedule, setTimezone } = useScheduleDataString()

  const [tz, setTz] = createSignal('Europe/London')
  const updateText = (s: string) => {
    setSchedule(s)
  }

  const validationState = () => {
    return IANAZone.isValidZone(tz()) ? 'valid' : 'invalid'
  }

  createEffect(() => {
    if (IANAZone.isValidZone(tz())) {
      setTimezone(tz())
    }
  })

  return (
    <div>
      <TextField.Root class={'flex flex-col p-2'} value={tz()} onChange={setTz} validationState={validationState()}>
        <TextField.Label class={'flex flex-row items-center'}>
          IANA Time zone{' '}
          <a class={'pl-2'} href={'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones'} target={'_blank'}>
            <BsInfoCircle />
          </a>
        </TextField.Label>
        <TextField.Input class={'text-black'}></TextField.Input>
        <TextField.ErrorMessage class={''}>Not valid IANA Timezone</TextField.ErrorMessage>
      </TextField.Root>
      <TextField.Root class={'flex flex-col p-2'} value={schedule()} onChange={updateText}>
        <TextField.Label>Schedule Data in text form</TextField.Label>
        <TextField.TextArea class={'h-56 text-sm text-black'}></TextField.TextArea>
      </TextField.Root>
      <div class={'flex flex-row gap-2'}>
        <Button.Root
          class={'bg-accent rounded-full p-2 text-xs'}
          onClick={() => {
            setSchedule(
              'Office Cam;Decorating the Office;2023-12-01-11-00;180;ff00bbe0;ff009fd4\n' +
                'JJ Warmup;Tom & Ben;2023-12-01-14-00;180;ff009fd4;ff0081c7\n' +
                'Jingle Cats;Lewis & Simon;2023-12-01-17-00;180;ff0081c7;ff0069ba\n' +
                'Christmas Trains;;2023-12-01-20-00;180;ff0069ba;ff0054ad',
            )
          }}
        >
          Yogs First Day Example
        </Button.Root>
        <Button.Root
          class={'bg-accent rounded-full p-2 text-xs'}
          onClick={() => {
            setSchedule(
              'First JJ stream;Trying Games Collection;2023-12-02-09-00;180;ffffc9eb;ffffc9eb\n' +
                'MC Bingo;With Friends;2023-12-04-20-00;180;ffd5b4fd;ffd5b4fd\n' +
                'More Bu... Collection Games;;2023-12-05-11-00;180;ffffc9eb;ffffc9eb\n' +
                'Open TTD;Why not?;2023-12-07-12-00;180;ffd5b4fd;ffd5b4fd\n' +
                'TTT;;2023-12-10-22-00;180;ffffc9eb;ffffc9eb',
            )
          }}
        >
          Other Example
        </Button.Root>
      </div>
      <div class={'text-xs'}>
        <p>How do I format my schedule?</p>
        <p>Each line contains one stream slot. The slots need to be formated in the following way:</p>
        <p>STREAM TITLE;SUBTITLE;START DATE;STREAM DURATION IN MINUTES;COLOR 1;COLOR 2</p>
        <p>Start dates need to be formated in the follwing way: yyyy-MM-dd-HH-mm</p>
        <p>yyyy: Full Year</p>
        <p>MM: Month i.e. 12</p>
        <p>dd: Day i.e. 01</p>
        <p>HH: Hour of the day, 24 clock</p>
        <p>mm: Minutes</p>
      </div>
    </div>
  )

  /*
  return (
    <Tabs.Root aria-label="Main navigation" class="">
      <Tabs.List class="">
        <Tabs.Trigger class="" value="text">
          Text
        </Tabs.Trigger>
        <Tabs.Trigger class="" value="table">
          Table
        </Tabs.Trigger>
        <Tabs.Indicator class="" />
      </Tabs.List>
      <Tabs.Content class="" value="text">
        <TextField.Root class={'flex flex-col'} value={schedule()} onChange={updateText}>
          <TextField.Label>Schedule Data in text form</TextField.Label>
          <TextField.TextArea class={'h-56 text-sm text-black'}></TextField.TextArea>
        </TextField.Root>
      </Tabs.Content>
      <Tabs.Content class="" value="table">
        <Button.Root onClick={() => setSlotsList([...slotsList, {} as Slot])}>Add Slot</Button.Root>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Start</th>
              <th>Duration</th>
              <th>Color 1</th>
              <th>Color 2</th>
            </tr>
            <For each={slotsList}>
              {(slot, i) => {
                return (
                  <tr class={'text-black'}>
                    <td>
                      <TextField.Root
                        value={slot.title}
                        onChange={s => {
                          setSlotsList(i(), 'title', s)
                        }}
                      >
                        <TextField.Input></TextField.Input>
                      </TextField.Root>
                    </td>
                    <td>
                      <TextField.Root
                        value={slot.subtitle}
                        onChange={s => {
                          setSlotsList(i(), 'subtitle', s)
                        }}
                      >
                        <TextField.Input></TextField.Input>
                      </TextField.Root>
                    </td>
                    <td>
                      <TextField.Root
                        value={slot.start}
                        onChange={s => {
                          try {
                            const date = DateTime.fromISO(s)?.toFormat('yyyy-MM-dd-hh-mm-ZZZ')
                            console.log(date)
                            if (date && date !== 'Invalid DateTime') {
                              setSlotsList(i(), 'start', date)
                            } else {
                              setSlotsList(i(), 'start', s)
                            }
                          } catch (e) {
                            console.error(e)
                          }
                        }}
                      >
                        <TextField.Input></TextField.Input>
                      </TextField.Root>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )
              }}
            </For>
          </tbody>
        </table>
      </Tabs.Content>
    </Tabs.Root>
  )
  */
}
