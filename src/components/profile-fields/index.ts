import Block from '../../core/block'
import template from './index.tmpl'

type Props = { [key: string]: unknown }

interface fieldsProps extends Props {
  name: string
  value: string | number
}

class ProfileFields extends Block {
  constructor(props: fieldsProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default ProfileFields
