export const copyToClipboard = async (value: string) => {
  try {
    let copyValue = ''

    if (!navigator.clipboard) {
      throw new Error("Browser don't have support for native clipboard.")
    }

    if (value) {
      copyValue = value
    }

    await navigator.clipboard.writeText(copyValue)
  } catch (e) {
    console.log(e.toString())
  }
  try {
    window.alert(`Copied ${value}`)
  } catch (e) {
    console.log(e.toString())
  }
}
