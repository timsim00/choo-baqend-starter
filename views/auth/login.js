const html = require('choo/html')
const header = require('../../elements/header')
const login = require('../../elements/auth/login')

module.exports = (state, emit) => {
  const pageTitle = `Login | ${state.app.orgName}`
  emit(state.events.DOMTITLECHANGE, pageTitle)
  emit('window:scrollToTop')
  history.pushState({}, pageTitle, '/login')

  return html`
    <div>
      ${header(state, emit, {login:true})}
      ${login(state, emit)}
    </div>`
}
