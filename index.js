const html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')


// VIEWS
var landingView = require('./views/landing')
var loginView = require('./views/auth/login')
var registerView = require('./views/auth/register')
var resetPasswordView = require('./views/auth/reset-password')
var dashboardView = require('./views/dashboard')
var fourOhFourView = require('./views/404')

css('tachyons')
css('./assets/styles.css')

//var app = choo({ history: false, href: false })
var app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

// STORES
app.use(require('./stores/app'))
app.use(require('./stores/user'))
app.use(require('./stores/message'))


// CLIENT ROUTES

const defaultAnonView = loginView;
const authWrapper =
    (loggedView, anonView = defaultAnonView) => (state, emit) => (
        state.user.loggedIn
            ? loggedView(state, emit)
            : anonView(state, emit)
);


app.route('/', landingView)
app.route('/login', loginView)
app.route('/register', registerView)
app.route('/reset-password', resetPasswordView)
app.route('/app', authWrapper(dashboardView))
app.route('/*', fourOhFourView)


const tree = app.start();
document.body.appendChild(mainView());
const mainWrapper = document.getElementById('approot');
mainWrapper.appendChild(tree);

function mainView (state, emit) {
  return html`
      <div id="approot" class="avenir"></div>
  `
}

// if (!module.parent) {
//   app.mount('body')
// } else {
//   module.exports = app
// }
