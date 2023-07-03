const template = `
  <label class="form-input">
      <span class="error-message error-message--{{modificator}}"></span>
      {{labelText}}
      <input class='input' placeholder="{{placeholder}}" name={{name}} type={{type}} autocomplete>
  </label>
`
export default template
