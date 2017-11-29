const html = require('choo/html')
const css = require('sheetify')
//const loginButton = require('../components/login-button')
const SimpleButton = require('../components/simple-button')
var loginButton = new SimpleButton()
//const userPanel = require('../components/auth/user-panel')

var TITLE = 'Saas Starter 1.9.1'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  //For nested css like below, had to add options.use = 'sheetify-nested' to sheetify source until this is fixed:
  //https://github.com/choojs/bankai/issues/311
  const splash = css`
    :host {
      background-repeat: no-repeat;
      background-position: center -50px;
      background-size:100%;

      @media screen and (min-width: 30em) {
        /* ns - not small breakpoint from tachyons */
        background-position: center -200px;
      }
    }
  `
  const pageStyles = css`
    .landing-black {
        background-color: var(--landing-black);
    }
  `

  const backgroundImageUrl = '/assets/bg-landing-page.svg'
  const btnCss = 'f6 link dim br2 ph3 pv2 mb2 dib white bg-green'
  const loginBtnParams = {text: 'Log In', click: () => {emit('replaceState', '/login')}, class: btnCss}
  const dashBtnParams = {text: 'Dashboard', click: () => {emit('replaceState', '/app')}, class: btnCss}

  return html`
    <div>
      ${section1()}
      ${section2()}
      ${section3()}
      ${footer()}
    </div>
  `

  function section1() {
    return html`
    <div class="white landing-black ${pageStyles}">
        <div class="absolute dt w-100">
          <div class="dtc v-mid w-25 tr pa2 ph4-l">
            ${loginButton.render(state.user.loggedIn ? dashBtnParams : loginBtnParams)}
          </div>
        </div>
        <div class="bg-neutral color-white ${splash} pb4 w-100 center" style="background-image: url(${backgroundImageUrl})">
          <section class="tc pa3 pt6">
            <h1 class="f3 f2-m f1-l fw2 mv3 tracked">
              <span class="dib grow w2 h2 hex-title-icon">
                <img src="/assets/logo.jpeg" alt="logo">
              </span>Org Name
            </h1>
            <h2 class="f4 fw3 color-neutral-10 mb4 lh-copy">
              A susinct tagline.<br>
            </h2>
          </section>
        </div>
    </div>
    `
  }

  function section2() {
    return html`
      <section class="pv4">
        <div class="pv2 ph3 pa4-m mw8-ns center-ns">
          <header>
            <h2 class="f2 mb0">more stuff</h2>
            subtitle
          </header>
          <div class="pt3 cf">
            stuff
          </div>
          cta
        </div>
      </section>
    `
  }

  function section3() {
    return html`
    <section class="pa3 w-100 bg-neutral-04 bg-near-white">
      <div class="mw7 center">
        <div class="pa4-l">
          <!-- Begin MailChimp Signup Form -->
          <div id="mc_embed_signup">
            <form action="//datproject.us16.list-manage.com/subscribe/post?u=993df3c1e35c9b224b64ccf72&amp;id=128a796b8e" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="mb0 pa4 br2-ns ba b--green validate" target="_blank" novalidate>
              <div class="cf bn ma0 pa0">
                <legend class="pa0 f5 f4-ns mb3 color-neutral-90">I'm on the fence.  Keep me in the loop.</legend>
                <div>
                  <label class="clip" for="mce-EMAIL">Email Address </label>
                  <input class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Your Email Address"  type="email" value="" name="EMAIL" id="mce-EMAIL">
                </div>
                <div id="mce-responses" class="clear">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_993df3c1e35c9b224b64ccf72_128a796b8e" tabindex="-1" value=""></div>
                <div class="clear">
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-green hover-bg-green-hover white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" >
                </div>
              </div>
            </form>
          </div>
          <!--End mc_embed_signup-->
        </div>
      </div>
    </section>
    `
  }

  function footer () {
    return html`
    <footer class="pv2 bg-neutral white w-100 landing-black ${pageStyles}">
      <section class="ph2 ph4-m mw8-ns center-ns">
        <div class="pt3">
          <div class="mb2 lh-copy">
            <a class="f4 b white dib dim link hover-color-white mr3 mt1" href="/" title="Dat Project">
              CoolStuff
            </a>
            <a class="f4 dim link white hover-color-neutral-40 b dib mr3 mb3" href="http://blog.datproject.org" title="Blog">
              Blog
            </a>
          </div>
          <div class="mt3">
            <a class="white hover-color-white ba b--green no-underline grow b inline-flex items-center mr3 mb3 pv2 ph3" href="https://datproject.org" title="Dat Project Home">
              <div class="color-green dib mr2"><svg class="w2 h2"><use xlink:href="#daticon-happy-dat"/></svg></div>
              <span>This</span>
            </a>
            <a class="white hover-color-white ba b--green no-underline grow b inline-flex items-center mr3 mb3 pv2 ph3" href="http://chat.datproject.org" title="Join our Chat">
              <div class="color-green dib mr2"><svg class="w2 h2"><use xlink:href="#daticon-question"/></svg></div>
              <span>
                That
              </span>
            </a>
            <a class="white hover-color-white ba b--green no-underline grow b inline-flex items-center mb3 pv2 ph3" href="https://donate.datproject.org" title="Donate to Code for Science & Society">
              <div class="color-green dib mr2"><svg class="w2 h2"><use xlink:href="#daticon-star-dat"/></svg></div>
              <span>The Other</span>
            </a>
          </div>
          <p class="f6 measure copy lh-copy">
            Have questions? Join our chat or ask on <a href="http://twitter.com/dat_project" class="color-blue no-underline underline-hover">Twitter</a> or <a href="http://github.com/datproject" class="color-pink no-underline underline-hover color-green">Github</a>.
          </p>
        </div>
        <p class="bt b--dat-neutral-80 color-neutral-50 tc f7 pv2">
          © 2017 ${state.app.orgName}
        </p>
      </section>
    </footer>
    `
  }

}

/*
${loginButton(state, emit)}
${userPanel(state, emit)}

*/
