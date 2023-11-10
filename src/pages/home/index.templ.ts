const template = `
  <section class='chats'>
    <div class='container chats__container'>
      <div class="chats__column">
          <div class="chats__column-header">
              <a class="chats__column-link" href="/profile">Профиль</a>
              {{{search}}}
              {{{addChat}}}
          </div>
          {{{chats}}}
      </div>
      <div class="chats__messages">
      {{{chatsWindow}}}
      </div>
    </div>
  </section>
`
export default template
