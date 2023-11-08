import Block from './block'

const REGEXPS = {
  phone: /^(([+0-9]){10,15})$/g,
  login: /^(?=.*[a-zA-Z])(?!.*[\s])(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}$/,
  name: /^[А-ЯA-Z][a-zа-я-]{1,30}$/,
  password: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,40}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
}

const ERROR_MESSAGES = {
  login: 'от 3 до 20 симаолов, только латиница, может содержать цифры',
  empty: 'поле не должно быть пустым',
  password: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  email: 'Введите корректный email',
  phone: 'Введите корректный номер телефона',
  name: 'Первая буква заглавная, без пробелов и цифр',
}

type FormValidators = {
  [key: string]: (value: string) => string | undefined
}

export const loginValidation = (value: string) => {
  if (value === '') {
    return ERROR_MESSAGES.empty
  }

  const isCheck = REGEXPS.login.test(value)

  return isCheck ? null : ERROR_MESSAGES.login
}

const passwordValidation = (value: string) => {
  if (value === '') {
    return ERROR_MESSAGES.empty
  }

  const isCheck = REGEXPS.password.test(value)

  return isCheck ? null : ERROR_MESSAGES.password
}

const emailValidation = (value: string) => {
  if (value === '') {
    return ERROR_MESSAGES.empty
  }

  const isCheck = REGEXPS.email.test(value)

  return isCheck ? null : ERROR_MESSAGES.email
}

const phoneValidation = (value: string) => {
  if (value === '') {
    return ERROR_MESSAGES.empty
  }

  const isCheck = REGEXPS.phone.test(value)

  return isCheck ? null : ERROR_MESSAGES.phone
}

export const nameValidation = (value: string) => {
  if (value === '') {
    return ERROR_MESSAGES.empty
  }

  const isCheck = REGEXPS.name.test(value)

  return isCheck ? null : ERROR_MESSAGES.name
}

const formValidate = (data: { [key: string]: string }) => {
  Object.entries(data).forEach(([key, value]) => {
    const error = document?.querySelector(`.error-message--${key}`)

    if (error) {
      error.textContent = validate(key, value)
    }
  })
}

const messageValidation = (value: string) => {
  if (value === '') {
    return ERROR_MESSAGES.empty
  } else return
}

const FORM_VALIDATORS: FormValidators | any = {
  login: loginValidation,
  form: formValidate,
  password: passwordValidation,
  password_repeat: passwordValidation,
  email: emailValidation,
  phone: phoneValidation,
  first_name: nameValidation,
  second_name: nameValidation,
  message: messageValidation,
  nickname: messageValidation,
}

const validate = (type: string, value: string | { [key: string]: unknown }) => {
  const validator = FORM_VALIDATORS[type]
  return validator(value)
}

export const handleFocusOut = (event: Event, self: Block) => {
  const target = event.target as HTMLInputElement
  const parent = target.parentElement as HTMLElement

  const error = parent.querySelector('.error-message') as HTMLElement

  error.textContent = validate(target?.name, target?.value)

  self.state[target.name] = target.value
}

export const handleFormSubmit = (event: Event, block: Block) => {
  event.preventDefault()
  validate('form', block.state)
}
