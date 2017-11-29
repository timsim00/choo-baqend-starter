var DB = require('baqend')

const STORENAME = 'app'

module.exports = store

function store (state, emitter) {
  state[STORENAME] = {
    orgName: 'OrgName',
    retrieve: (store) => JSON.parse(localStorage.getItem(store)),
    dbConnect: () => {
      console.log('connecting to baqend')
      DB.connect('toodle', () => {
          console.log('connected to baqend')
      });
      DB.ready(() => {
          console.log('baqend is READY')
          if (DB.User.me) {
            console.log('Hello ' + DB.User.me.username);
          } else {
            console.log('Hello Anonymous');
          }
          emitter.emit('user:autoLogin', DB.User.me)
      });
    }
  }

  emitter.on('DOMContentLoaded', function () {
    // Do app-level stuff
    state.app.dbConnect();

    // Setup app-level event listeners
    emitter.on(`window:scrollToTop`, function (data) {
      window.scrollTo(0,0)
    })

    emitter.on(`element:focus`, function (data) {
      const ele = document.getElementById(data)
      ele && ele.focus()
    })

    emitter.on(`${STORENAME}:persist`, function (data) {
      const d = data.store ? state[data.store] : data.data
      localStorage.setItem(data.store, JSON.stringify(d))
    })

  })
}

/*
var DB = require('baqend')
DB.connect('toodle', true, () => {
    console.log('connected to baqend')
    //state[STORENAME].DB = DB
}, (...rest) => {
    console.log('FAILED to connect to baqend', rest)
});
*/
