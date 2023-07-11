import Block from '../../core/block'
import template from './index.tmpl'

interface errorPageProps {
  description: string
  error: string
}

class ErrorPage extends Block {
  constructor(props: errorPageProps) {
    super('div', { ...props })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default ErrorPage
