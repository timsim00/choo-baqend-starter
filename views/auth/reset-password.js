const html = require('choo/html')
const url = require('url')
const header = require('./../../elements/header')
const form = require('get-form-data')
//const validateFormdata = require('validate-formdata')

function body (state, emit) {
  emit(state.events.DOMTITLECHANGE, `Reset Password | ${state.app.orgName}`)

  const inputCss = `bg-washed-yellow pa2 input-reset ba bg-transparent w-100 measure b--moon-gray`
  const btnCss = 'f6 link dim br2 ph3 pv2 mb2 dib white bg-green w-100'

  const paramName = 'tkn=';
  const search = location.search;
  const token = search.substring(search.indexOf(paramName) + paramName.length);

  function onsubmitConfirm (e) {
    e.preventDefault()
    var data = form(e.target)
    if (data.newPassword !== data.otherPassword) return emit('message:error', 'Passwords do not match.')
    data.token = token
    emit('user:resetPassword', data)
  }

  function onsubmitEmail (e) {
    e.preventDefault()
    var data = form(e.target)
    emit('user:forgotPassword', data.email)
  }

  if (token.length > 0) {

      return html`
      <div class="avenir">
        <div class="mw5 pv5 center">
          <h1 class="f4">Reset Your Password</h1>
          <form action="" method="POST" id="password-reset-confirm-form" onsubmit=${onsubmitConfirm}>
            <p>
              <label for="newPassword" class="dat-input dat-input--icon">
                <input name="newPassword" type="password" placeholder="New password" autofocus class="${inputCss}" />
              </label>
            </p>
            <p>
              <label for="otherPassword" class="dat-input dat-input--icon">
                <input name="otherPassword" type="password" placeholder="Confirm new password" class="${inputCss}" />
              </label>
            </p>
            <input type="submit" class="${btnCss}" value="Reset your password">
          </form>
        </div>
      </div>`

  } else {

      return html`
      <div>
        <div class="mw5 pv5 center">
          <h1 class="f4">Reset Your Password</h1>
          <form action="" method="POST" id="password-reset-form" onsubmit=${onsubmitEmail}>
            <p>
              <label for="email" class="dat-input dat-input--icon w-100">
                <input name="email" type="email" placeholder="Your e-mail" autofocus class="${inputCss}" />
              </label>
            </p>
            <input type="submit" class="${btnCss}" value="Reset your password">
          </form>
        </div>
      </div>`
  }
}

module.exports = (state, emit) => {
  return html`
    <div>
      ${header(state, emit, {login:true})}
      ${body(state, emit)}
    </div>`
}
