const html = require('choo/html')
const form = require('get-form-data')

const register = (state, emit) => {

  function onSubmit (e) {
    const data = form(e.target)
    emit('user:register', data)
    e.preventDefault()
    return false
  }

  const inputCss = `bg-washed-yellow pa2 input-reset ba bg-transparent w-100 measure b--moon-gray`

  return html`<div class="avenir">
    <div class="mw5 pv6 center">
      <h1 class="f4">Create a New Account</h1>
      <form onsubmit=${onSubmit}>
        <div class="error">${state.user.error}</div>
        <p>
          <label for="orgname" class="dat-input dat-input--icon w-100">
            <input id="orgname" name="orgname" type="text" placeholder="Company Name" autofocus class="${inputCss}" />
          </label>
        </p>
        <p>
          <label for="email" class="dat-input dat-input--icon w-100">
            <input name="email" type="email" placeholder="E-mail" class="${inputCss}" />
          </label>
        </p>
        <p>
          <label for="password" class="dat-input dat-input--icon w-100">
            <input name="password" type="password" placeholder="Password" class="${inputCss}" />
          </label>
        </p>
        <p>
          <input type="submit" value="Register" class="f6 link dim br2 ph3 pv2 mb2 dib white bg-green w-100" />
        </p>
        <p class="f7">
          <a class="pre" href="/login">Already Have an Account?   Log In »</a>
        </p>
      </form>
    </div>
  </div>`
}

module.exports = register
