const html = require('choo/html')
const css = require('sheetify')
const form = require('get-form-data')

const login = (state, emit) => {
  function onSubmit (e) {
    const data = form(e.target)
    emit('user:login', data)
    e.preventDefault()
    return false
  }

  // var styles = css`
  //   :host {
  //     .error {
  //       font-size: .875rem;
  //       font-weight: normal;
  //       color: $color-red;
  //     }
  //   }
  // `


  const inputCss = `bg-washed-yellow pa2 input-reset ba bg-transparent w-100 measure b--moon-gray`

  return html`
    <div class="avenir">
    <div class="mw5 pv6 center">
      <h1 class="f4">Log In</h1>
      <form onsubmit=${onSubmit}>
        <div class="error">${state.user.error}</div>
        <p>
          <label for="email" class="w-100">
            <input name="email" type="email" placeholder="E-mail" autofocus class="${inputCss}" />
          </label>
        </p>
        <p>
          <label for="password" class="w-100">
            <input name="password" type="password" placeholder="Password" class="${inputCss}" />
          </label>
        </p>
        <p>
          <input type="submit" value="Log In" class="f6 link dim br2 ph3 pv2 mb2 dib white bg-green w-100" />
        </p>
        <p class="f7">
          <a class="dim f7" href="/register">No Account yet? <span class="tracked pre"><strong>  Register »</strong></span></a><br><br>
          <a class="dim" href="/reset-password" class="mr3">Forgot Password?</a>
        </p>
      </form>
    </div>
  </div>`
}

module.exports = login
