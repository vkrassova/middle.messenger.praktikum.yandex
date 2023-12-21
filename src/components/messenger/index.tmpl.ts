const template = `
<div class="messenger">
    {{#if selectedChat }}
        <div class="messenger__header">
            {{{avatar}}}
            <p>{{activeChat.title}}</p>
            <div class="messenger__header-control">
            {{{deleteChat}}}
            {{{addUser}}}
            {{{deleteUser}}}
            </div>
        </div>
        <div class="messenger__messages">
            {{#each messages}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="messenger__footer">
            {{{input}}}
            {{{button}}}
        </div>
    {{else}}
        <p class="messenger__text">Выбирете чат</p>
    {{/if}}
</div>
`

export default template
