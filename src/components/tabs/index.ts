import template from './index.tmpl'
import Block from '../../core/block'

type Props = { [key: string]: unknown }

interface buttonProps extends Props {
  class?: string
  events?: Record<string, (e: SubmitEvent) => void>
  addUser?: () => void
}

class Tabs extends Block {
  constructor(props: buttonProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Tabs
