import { ScheduleData } from '@ycapp/model'
import { parseBase64String } from '../util/parse_base64_string'

export const loadLocalScheduleFromFile = async (fileName: string): Promise<ScheduleData | undefined> => {
  const base64_string = await loadLocalScheduleBase64FromFile(fileName)
  if (base64_string) {
    return parseBase64String(base64_string)
  }
  return undefined
}
export const loadLocalScheduleBase64FromFile = (fileName: string): Promise<string> =>
  fetch('/src/assets/schedules/' + fileName)
    .then(async resp => {
      try {
        return resp.text()
      } catch (e) {
        console.error(e)
      }
      return ''
    })
    .catch(e => {
      console.error(e)
      return ''
    })
