const html = require('choo/html')
const register = require('./../../elements/auth/register')
const header = require('./../../elements/header')

module.exports = (state, emit) => {
  emit(state.events.DOMTITLECHANGE, `Register | ${state.app.orgName}`)
  emit('window:scrollToTop')
  //emit('element:focus', 'orgname')

  return html`
    <div>
      ${header(state, emit, {login:true})}
      ${register(state, emit)}
    </div>`
}
