import { Slot } from '@ycapp/model'
import { Component } from 'solid-js'
import SolidMarkdown from 'solid-markdown'

interface SlotMarkdownDescProps {
  slot: Slot
}

const SlotMarkdownDesc: Component<SlotMarkdownDescProps> = props => {
  return <SolidMarkdown children={props.slot.markdownDesc} />
}

export default SlotMarkdownDesc
