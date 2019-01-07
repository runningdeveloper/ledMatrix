import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'
import ButtonSwitch from './ButtonSwitch'

const square = () => {
  return Array.from({ length: 8 * 8 }).map(() => 0)
  // let array = []
  // for (let i = 0; i < 8; i++) {
  //   for (let j = 0; j < 8; j++) {
  //     array.push(0)
  //   }
  // }
  // return array
}

class Draw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raw: square(),
      live: false,
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
        <div>
          {this.state.raw.map((x, i) => {
            return (i + 1) % 8 === 0 ? (
              <span>
                <ButtonSwitch
                  value={x}
                  onLedChange={() => {
                    let selected = this.state.raw
                    selected[i] = selected[i] === 0 ? 1 : 0
                    this.setState({ raw: selected })
                    this.onLedClick()
                  }}
                />
                <br />
              </span>
            ) : (
              <ButtonSwitch
                value={x}
                onLedChange={() => {
                  let selected = this.state.raw
                  selected[i] = selected[i] === 0 ? 1 : 0
                  this.setState({ raw: selected })
                  this.onLedClick()
                }}
              />
            )
          })}
        </div>
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
            this.setState({ raw: square() })
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
      </div>
    )
  }
}

export default Draw
