const html = require('choo/html')
const header = require('../elements/header')


module.exports = (state, emit) => {
  emit(state.events.DOMTITLECHANGE, state.app.orgName)
  if (!state.user.loggedIn) {
    emit('replaceState', '/')
    return
  }

  return html`
    <div>
      ${header(state, emit)}
      <div class="mw5 pv6 center">
        THIS IS THE MAIN APP
      </div>
    </div>`
}

/*

<div class="landing">
${header(state, emit)}
${login(state, emit)}
</div>



*/
