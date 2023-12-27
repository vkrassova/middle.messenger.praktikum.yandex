import Block from '../../core/block'
import { Message as MessageProps } from '../../models/messages'
import template from './index.tmpl'
import store, { withSelectedChat } from '../../core/store'
import MessagesController from '../../controllers/messages-controller'
import { Avatar, Input, Tabs, Button, Modal, Message } from '../index'
import { ChatInfo } from '../../models/chats'
import { withChats } from '../../core/store'
import ChatsController from '../../controllers/chats-controller'
import UserController from '../../controllers/user-controller'
import avatarIcon from '../../img/smile.svg'
import { RESOURCES_URL } from '../../utils/constants'

interface MessengerProps {
  avatar?: string
  selectedChat: number | undefined
  messages: MessageProps[]
  chats: ChatInfo[]
  userId: number
  activeChat: ChatInfo | null
}

class MessengerBase extends Block {
  constructor(props: MessengerProps) {
    super(props)
  }

  componentDidMount() {
    this.state = {
      message: '',
      login: '',
    }
  }

  async addUserToChat() {
    const data = {
      login: this.state.login as string,
    }
    try {
      const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)
      if (activeChat !== null && activeChat !== undefined) {
        const users = await UserController.searchUser(data)

        if (users !== null) {
          await ChatsController.addUserToChat(activeChat.id, users[0].id as number)
          const popup = document?.querySelector('.modal--add-user')
          popup?.classList.remove('active')
          const form = document?.querySelector('#modal-form') as HTMLFormElement
          form.reset()
        }
      }
    } catch (event: unknown) {
      console.error(event)
    }
  }

  async deleteUserFromChat() {
    const data = {
      login: this.state.login as string,
    }
    try {
      const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)
      if (activeChat !== null && activeChat !== undefined) {
        const users = await UserController.searchUser(data)

        if (users !== null) {
          await ChatsController.deleteUserFromChat(activeChat.id, users[0].id as number)
          const popup = document?.querySelector('.modal--delete-user')
          popup?.classList.remove('active')
          const form = document?.querySelector('#modal-form') as HTMLFormElement
          form.reset()
        }
      }
    } catch (event: unknown) {
      console.error(event)
    }
  }

  init() {
    const avatar = new Avatar({
      isNotActive: true,
      avatarSrc: (this.props.chats as ChatInfo[]).find((data) => data.id === this.props.selectedChat)?.avatar
        ? RESOURCES_URL + (this.props.chats as ChatInfo[]).find((data) => data.id === this.props.selectedChat)?.avatar
        : (avatarIcon as string),
    })

    const button = new Button({
      class: 'button--fill',
      type: 'submit',
      title: 'Отправить',
      modificator: 'button--messanger',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          const input = this.children.input as Input
          this.onSubmit().finally(() => {
            input.setProps({ ...input.props, value: '' })
          })
        },
      },
    })

    const deleteChat = new Tabs({
      class: 'delete',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          this.deleteChat()
          store.set('selectedChat', null)
        },
      },
    })

    const addUser = new Tabs({
      class: 'add-user',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          ;(this.children.modal as Modal).setProps({
            title: 'Добавить пользователя',
            class: 'modal--add-user',
          })

          this.controlPopup()
        },
      },
    })

    const deleteUser = new Tabs({
      class: 'delete-user',
      events: {
        click: (evt: Event) => {
          evt.preventDefault()
          ;(this.children.modal as Modal).setProps({
            title: 'Удалить пользователя',
            deleteUser: true,
            class: 'modal--delete-user',
          })

          this.controlPopup()
        },
      },
    })

    const modal = new Modal({
      user: true,
      onClickAddUser: async () => {
        await this.addUserToChat()
      },
      onClickDeletedUser: async () => {
        await this.deleteUserFromChat()
      },
      closePopup: () => this.controlPopup(),
      getValue: (evt) => {
        const target = evt?.target as HTMLInputElement
        this.state[target.name] = target?.value
      },
    })

    const message = this.createMessages(this.props)

    const input = new Input({
      isActive: false,
      name: 'message',
      type: 'text',
      events: {
        change: (evt) => {
          this.getValue(evt, this)
        },
      },
    })

    this.children = {
      button: button,
      deleteChat: deleteChat,
      addUser: addUser,
      deleteUser: deleteUser,
      messages: message,
      input: input,
      modal: modal,
      avatar: avatar,
    }
  }

  controlPopup() {
    const popup = document?.querySelector('.modal')
    popup?.classList.contains('active') ? popup.classList.remove('active') : popup?.classList.add('active')
  }

  getValue(event: Event, self: Block) {
    const target = event.target as HTMLInputElement
    self.state[target.name] = target?.value
  }

  async onSubmit() {
    const message = this.state.message as string
    if (message !== '' && message !== undefined) {
      await MessagesController.sendMessage(this.props.selectedChat, message)
    }
  }

  deleteChat() {
    const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)
    if (activeChat !== null && activeChat !== undefined) {
      ChatsController.delete(activeChat?.id)
    }
  }

  protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    if (!oldProps && !newProps) return false
    this.children.messages = this.createMessages(newProps)
    ;(this.children.avatar as Avatar).setProps({
      avatarSrc: newProps.chats.find((data) => data.id === newProps.selectedChat)?.avatar
        ? `${RESOURCES_URL}${newProps.chats.find((data) => data.id === newProps.selectedChat)?.avatar}`
        : (avatarIcon as string),
    })

    return true
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id })
    })
  }

  render() {
    const activeChat = (this.props.chats as ChatInfo[]).find((chat) => chat.id === this.props.selectedChat)
    return this.compile(template, { ...this.props, activeChat })
  }
}

export const Messenger = withChats(withSelectedChat(MessengerBase))
