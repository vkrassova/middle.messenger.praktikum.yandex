import Block from '../../core/block'
import template from './index.tmpl'

interface MessageProps {
  content: string
  isMine: boolean
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props)
  }

  init() {
    const todayDate = new Date().toLocaleDateString()
    const messageDate = new Date(this.props.time).toLocaleDateString()
    if (todayDate === messageDate) {
      this.props.time = new Date(this.props.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      this.props.time = messageDate
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
