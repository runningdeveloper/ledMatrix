import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'
import Matrix from './matrix'

const blank = () => {
  return Array.from({ length: 8 * 8 }).map(() => 0)
}

class Draw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raw: blank(),
      live: false,
      delay: 1000,
      frames: [],
      playing: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onLedClick = this.onLedClick.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    this.sendLedData(this.state.raw)
  }

  sendLedData(data) {
    axios
      .get(`/raw/${data.join('')}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  onLedClick() {
    if (this.state.live) {
      this.sendLedData(this.state.raw)
    }
  }

  render() {
    // console.log(this.state.raw)
    return (
      <div>
        <h1>Send a drawing!</h1>
        <Matrix
          raw={this.state.raw}
          onLedClick={raw => {
            this.setState({ raw })
            this.onLedClick()
          }}
        />
        <p
          className={css`
            width: 6rem;
            color: ${this.state.live ? 'white' : 'auto'};
            background: ${this.state.live ? 'limegreen' : 'transparent'};
          `}
        >
          Live is <span>{this.state.live ? 'ON' : 'OFF'}</span>
        </p>
        <button onClick={this.onSubmit}>Send</button>
        <button
          onClick={event => {
            this.setState({ raw: blank() })
            this.onSubmit(event)
          }}
        >
          Clear
        </button>
        <button
          onClick={event => {
            this.setState({ live: !this.state.live })
          }}
        >
          Live Toggle
        </button>
        <div
          className={css`
            margin-top: 20px;
          `}
        >
          <h3>Animation {this.state.playing && `PLAYING!`}</h3>
          <input
            value={this.state.delay}
            onChange={event => this.setState({ delay: event.target.value })}
            type="number"
            placeholder="Delay (ms)"
          />
        </div>
      </div>
    )
  }
}

export default Draw
