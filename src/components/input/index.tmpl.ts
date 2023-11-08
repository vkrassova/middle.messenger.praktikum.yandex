const template = `
  <label class="form-input">
      <span class="error-message error-message--{{modificator}}"></span>
      <input class='input' value={{placeholder}} name={{name}} type={{type}} autocomplete>
  </label>
`
export default template
