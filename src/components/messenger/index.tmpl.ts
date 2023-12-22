const template = `
<div class="messenger">
    {{{modal}}}

    {{#if selectedChat }}
        <div class="messenger__header">
            {{{avatar}}}
            <p class="messenger__header-title">{{activeChat.title}}</p>
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
