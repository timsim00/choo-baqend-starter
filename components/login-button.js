const html = require('choo/html')
const css = require('sheetify')
const button = require('../elements/button')
const gravatar = require('../elements/gravatar')

// var avatarStyles = css`
//   :host {
//     display: block;
//     width: 2.25em;
//     height: 2.25em;
//     vertical-align: middle;
//     border: 2px solid var(--color-white);
//     background-color: var(--color-pink);
//     margin: auto;
//     &:hover, &:focus {
//       border-color: var(--color-green);
//     }
//   }
// `


module.exports = function (state, emit) {
    //console.log('***HTML', JSON.stringify(html))
    return html`
      ${button({
        text: 'Log In',
        click: function () { console.log('click'); window.location.href = '/login' },
        class: 'f6 link dim br2 ph3 pv2 mb2 dib white bg-green'
      })}
    `
}
