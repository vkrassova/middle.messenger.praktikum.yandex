const template = `
  <ul class="chats-list">
  {{#if isLoaded }}
    {{#each chatItems}}
        {{{this}}}
    {{/each}}
  {{else}}
  Loading...
  {{/if}}
  </ul>
`
export default template
