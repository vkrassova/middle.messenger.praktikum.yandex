const template = `
  <ul class="chats-list">
  {{#if isLoaded }}
    {{#each chatItems}}
        {{{this}}}
    {{/each}}
  {{else}}
   <p class="chats-list__loading">Loading...</p>
  {{/if}}
  </ul>
`
export default template
