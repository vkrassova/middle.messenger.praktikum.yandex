const template = `
  <label class="form-input">
      <span class="form-input__text">{{labelText}}</span>
      <span class="error-message error-message--{{modificator}} {{#if isActive }}notactive{{/if}}"></span>
      <input class='input' value='{{placeholder}}' name='{{name}}' type='{{type}}' autocomplete>
  </label>
`
export default template
