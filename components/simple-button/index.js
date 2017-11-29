var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

module.exports = class Component extends Nanocomponent {
  constructor () {
    super()
    // this.color = null
  }

  createElement (props) {
    //this.color = color
    var style = `display: ${props.hide ? 'none' : 'inherit'}`
    return html`
      <button onclick=${props.click} class="${props.class}" ${props.disabled ? 'disabled' : ''} style="${style}">
        ${props.text}
      </button>
    `
  }

  update () {
    //return newColor !== this.color
    return true;
  }
}
