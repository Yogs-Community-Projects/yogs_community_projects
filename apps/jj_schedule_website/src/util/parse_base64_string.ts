import { ungzip } from 'pako'

export function parseBase64String(base64_string: string) {
  const base64Uint8Array = Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))
  const unzipUint8Array = ungzip(base64Uint8Array)
  const dataString = new TextDecoder().decode(unzipUint8Array)
  return JSON.parse(dataString)
}
