import Block from '../../core/block'
import template from './index.tmpl'

type Props = { [key: string]: unknown }

interface avatarProps extends Props {
  avatarSrc: string | unknown
  isNotActive: boolean
  events?: Record<string, (e: InputEvent) => void>
}

class Avatar extends Block {
  constructor(props: avatarProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Avatar
