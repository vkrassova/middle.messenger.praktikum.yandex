const template = `
<div class="message-container">
        {{#if isMine}}
            <div class="my-message">
                <p class="message__text">{{content}}</p>
                <span class="time">{{time}}</span>
            </div>
        {{else}}
            <div class="message">
                <p class="message__text">{{content}}</p>
                <span class="time">{{time}}</span>
            </div>
        {{/if}}
</div>
`

export default template
