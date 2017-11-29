const xtend = require('xtend')
const STORENAME = 'user'
var DB = require('baqend')

module.exports = store

function store (state, emitter) {

  state[STORENAME] = state.app.retrieve(STORENAME) || {loggedIn: false}

  emitter.on('DOMContentLoaded', function () {

    // --- UPDATE
    emitter.on(`${STORENAME}:update`, function (data) {
      state[STORENAME] = xtend(state[STORENAME], data)
      emitter.emit(`app:persist`, {store:STORENAME})
      emitter.emit('render')
    })

    // --- LOGIN
    emitter.on(`${STORENAME}:login`, function (data) {
      // var apiValidUser = (data, cb) => {
      //   var valid = true
      //   cb(null, {valid})
      // }
      // apiValidUser(data, (err, res) => {
      //   if (res.valid) {
      //     data.loggedIn = true;
      //     data.error = ''
      //     emitter.emit('replaceState', '/app')
      //   } else {
      //     data.error = err || 'Login failed'
      //   }
      //   delete data.password
      //   emitter.emit(`${STORENAME}:update`, data)
      // })

      const doneCallback = (data) => {
        console.log('Login DONE', data)
        emitter.emit(`${STORENAME}:autoLogin`, DB.User.me)
        emitter.emit('replaceState', '/app')
      }
      const failCallback = (error) => {
        console.log('Login FAIL', error)
        emitter.emit('message:error', 'Something went wrong. Please try again.')
      }

      console.log('LOGGING IN...')
      DB.User.login(data.email, data.password, true, doneCallback, failCallback)
    })

    // --- LOGOUT
    emitter.on(`${STORENAME}:logout`, function () {
      const doneCallback = (data) => {
        console.log('Logout DONE', data)
        emitter.emit(`${STORENAME}:update`, {loggedIn:false, dbUser:null})
        emitter.emit('replaceState', '/')
        // emitter.emit('message:success', 'Successfully Logged Out')
      }
      const failCallback = (error) => {
        console.log('Logout FAIL', error)
        emitter.emit('message:error', 'Something went wrong. Please try again.')
      }
      DB.User.logout(doneCallback, failCallback)
    })


    // --- REGISTER
    emitter.on(`${STORENAME}:register`, function (data) {
      // var apiRegisterUser = (data, cb) => {
      //   var valid = true
      //   cb(null, {valid})
      // }
      // apiRegisterUser(data, (err, res) => {
      //   if (res.valid) {
      //     data.loggedIn = true;
      //     data.error = ''
      //     emitter.emit('replaceState', '/app')
      //   } else {
      //     data.error = err || 'Registration failed'
      //   }
      //   delete data.password
      //   emitter.emit(`${STORENAME}:update`, data)
      // })

      const doneCallback = (data) => {
        console.log('Register DONE', data)
        delete data.password
        emitter.emit(`${STORENAME}:autoLogin`, DB.User.me)
        emitter.emit('replaceState', '/app')
      }
      const failCallback = (error) => {
        console.log('Register FAIL', error)
        emitter.emit('message:error', 'Something went wrong. Please try again.')
      }

      DB.User.register(data.email, data.password, true, doneCallback, failCallback)
    })

    // --- AUTO LOGIN
    emitter.on(`${STORENAME}:autoLogin`, function (dbUser) {
      var data = {
        dbUser,
        email: dbUser ? dbUser.username : '',
        loggedIn: !!dbUser
      }
      emitter.emit(`${STORENAME}:update`, data)
      emitter.emit('render')
    })

    // --- FORGOT PASSWORD
    emitter.on(`${STORENAME}:forgotPassword`, function (data) {
      const doneCallback = (data) => {
        console.log('forgotPassword DONE', data)
        emitter.emit('message:success', 'Check your email to continue.')
      }
      const failCallback = (error) => {
        emitter.emit('message:error', 'Something went wrong. Please try again.')
      }
      DB.User.resetPassword(data.email, doneCallback, failCallback)
    })

    // --- RESET PASSWORD
    emitter.on(`${STORENAME}:resetPassword`, function (data) {
      const doneCallback = (data) => {
        console.log('resetPassword DONE', data)
        emitter.emit(`${STORENAME}:autoLogin`, DB.User.me)
        emitter.emit('replaceState', '/app')
        emitter.emit('message:success', 'Your password has been changed.')
      }
      const failCallback = (error) => {
        console.log('resetPassword FAIL', error)
        emitter.emit('message:error', 'Something went wrong. Please try again.')
      }

      DB.User.newPassword(data.token, data.newPassword, true, doneCallback, failCallback )
    })

  })
}
