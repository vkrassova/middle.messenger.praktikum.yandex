const template = `
    <div class="profile__avatar">
        <img src={{avatarSrc}} alt="avatar"/>
        <input type="file" id="file" class="profile__avatar-input {{#if isNotActive }}notactive{{/if}}" name="avatar" accept="image/*"/>
    </div>
`
export default template
