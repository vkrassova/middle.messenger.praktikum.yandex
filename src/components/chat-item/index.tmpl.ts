const template = `
  <li class="chat-item">
    {{#if avatar}}
        <img class="chat-item__avatar" src="${'https://ya-praktikum.tech/api/v2/resources'}{{avatar}}" alt="Аватар">
    {{else}}
        <div class="chat-item__avatar"></div>
    {{/if}}
        <div class="chat-item__preview">
        <p class="chat-item__title">{{title}}</p>
        {{#if last_message}}
          <p class="chat-item__content">{{content}}</p>
        {{else}}
          <p class="chat-item__content">Превью сообщения чата</p>
        {{/if}}
        </div>
        <div class="chat-item__details">
          <span class="time">{{#if last_message.time}}{{time}}{{/if}}</span>
            {{#if unread_count}}
              <span class="count">{{unread_count}}</span>
            {{/if}}
        </div>
  </li>
`
export default template
