const template = `
<div class="message-container">
        {{#if isMine}}
            <div class="my-message">
               {{content}}
                <span class="time">{{time}}</span>
            </div>
        {{else}}
            <div class="message">
                {{content}}
                <span class="time">{{time}}</span>
            </div>
        {{/if}}
</div>
`

export default template
