import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'

class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
      char: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('hey', this.state.char)
    axios
      .get(`/char/${this.state.char}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <h1>Send a character</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.char}
            onChange={event => this.setState({ char: event.target.value })}
            type="text"
            placeholder="Char"
          />
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default Character
