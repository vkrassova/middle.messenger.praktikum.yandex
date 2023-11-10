const template = `
<div class="messenger">
    {{#if selectedChat }}
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
        Выбирете чат
    {{/if}}
</div>
`

export default template
