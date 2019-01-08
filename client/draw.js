import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'
import * as localforage from 'localforage'
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
      delay: 1000,
      frames: [],
      playing: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onLedClick = this.onLedClick.bind(this)
    this.onSaveFrame = this.onSaveFrame.bind(this)
    this.onClearDb = this.onClearDb.bind(this)
    this.onPlay = this.onPlay.bind(this)
  }

  async componentDidMount() {
    const frames = await localforage.getItem('frames')
    console.log('got frames', frames)
    if (frames) {
      this.setState({ frames })
    }
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

  async onSaveFrame() {
    let currentFrames = this.state.frames
    if (currentFrames.length > 0) {
      currentFrames.push(this.state.raw)
    } else {
      currentFrames = [this.state.raw]
    }
    await localforage.setItem('frames', currentFrames)
    this.setState({
      frames: currentFrames,
    })
    // console.log('state frames', this.state.frames)
    // this.sendLedData(this.state.raw)
  }

  async onClearDb() {
    await localforage.clear()
  }

  onPlay() {
    this.setState({
      playing: true,
    })
    this.state.frames.forEach((frame, i) => {
      setTimeout(() => {
        this.sendLedData(frame)
      }, this.state.delay * i)
    })
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
          <br />
          <button
            onClick={() => {
              this.onSaveFrame()
            }}
          >
            Add Frame
          </button>
          <button
            onClick={() => {
              this.onClearDb()
            }}
          >
            Clear DB
          </button>
          <button
            onClick={() => {
              this.onPlay()
            }}
          >
            Play
          </button>
        </div>
      </div>
    )
  }
}

export default Draw
