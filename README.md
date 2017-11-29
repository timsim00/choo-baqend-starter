# choo-baqend-starter

Work-in-progress static choo SaaS starter with [baqend](baqend.com) back end.

* First real attempt at a choo app...lovin choo!
* Created with create-choo-app
* App is modeled after some existing OSS, namely [datBase](https://github.com/datproject/datBase)


Critiques/issues and PR's welcome!


# Instructions

* Create a free baqend account or leave as-is to try with their sandbox account called 'toodle'.
App is connecting to baqend in ./stores/app.js
* clone
* npm install
* npm start


# Known issues

* https://github.com/choojs/choo/issues/601#issuecomment-347836351
* This is still a rough WIP
* sheetify/transform option in package.json wasn't working so I added this 'options.use' line to module sheetify/index.js:
function applyTransforms (filename, src, options, done) {
  options.use = 'sheetify-nested'
