import styled, { css, injectGlobal } from 'preact-emotion'
import { Router } from 'preact-router'
import { Component } from 'preact'

import Character from './character'
import Draw from './draw'
import Animation from './animation'

injectGlobal`
body{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
`

class App extends Component {
  constructor(props) {
    super(props)
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render() {
    return (
      <div id="app">
        <ul
          className={css`
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
          `}
        >
          <li>
            <a href="/character">Send Character</a>
          </li>
          <li
            className={css`
              padding-left: 1rem;
            `}
          >
            <a href="/draw">Send Drawing</a>
          </li>
          <li
            className={css`
              padding-left: 1rem;
            `}
          >
            <a href="/animation">Send Animation</a>
          </li>
        </ul>
        <Router onChange={this.handleRoute}>
          <Character path="/" />
          <Character path="/character/" />
          <Draw path="/draw/" />
          <Animation path="/animation/" />
        </Router>
      </div>
    )
  }
}

export default App
