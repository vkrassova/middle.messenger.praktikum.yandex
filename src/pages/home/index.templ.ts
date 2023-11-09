const template = `
  <section class='chats'>
    <div class='container chats__container'>
      <div class="chats__column">
          <div class="chats__column-header">
          <a href="/profile">Профиль</a>
          {{{input}}}
          {{{chatsList}}}
          </div>
      </div>
      <div class="chats__messages">
      {{{chat}}}
      </div>
    </div>
  </section>
`
export default template
