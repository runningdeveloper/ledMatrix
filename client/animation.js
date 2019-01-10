import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'
import * as localforage from 'localforage'
import ButtonSwitch from './ButtonSwitch'
import Matrix from './matrix'

const blank = () => {
  return Array.from({ length: 8 * 8 }).map(() => 0)
}

class Animation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raw: blank(),
      delay: 1000,
      frames: [],
      playing: false,
      loop: false,
    }
    this.onSaveFrame = this.onSaveFrame.bind(this)
    this.onClearDb = this.onClearDb.bind(this)
    this.onSaveDb = this.onSaveDb.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onClearFames = this.onClearFames.bind(this)
    this.checkLoop = this.checkLoop.bind(this)
  }

  async componentDidMount() {
    const frames = await localforage.getItem('frames')
    console.log('got frames', frames)
    if (frames) {
      this.setState({ frames })
    }
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

  onSaveFrame() {
    // clone everywhere, dont want to store current state in playback array
    let currentFrames = Object.assign([], this.state.frames)
    if (currentFrames.length > 0) {
      currentFrames.push(Object.assign([], this.state.raw))
    } else {
      currentFrames = [Object.assign([], this.state.raw)]
    }
    this.setState({
      frames: currentFrames,
    })
    // console.log('state frames', this.state.frames)
    // this.sendLedData(this.state.raw)
  }

  async onClearDb() {
    await localforage.clear()
    this.setState({ frames: [] })
  }

  onClearFames() {
    this.setState({ frames: [] })
  }

  async onSaveDb() {
    console.log('save')
    await localforage.setItem('frames', this.state.frames)
  }

  checkLoop() {
    if (this.state.loop) {
      setTimeout(() => {
        this.onPlay()
      }, this.state.delay)
    } else {
      this.setState({
        playing: false,
      })
    }
  }

  onPlay() {
    if (this.state.frames.length === 0) {
      return
    }
    this.setState({
      playing: true,
    })
    this.state.frames.forEach((frame, i) => {
      setTimeout(() => {
        this.sendLedData(frame)
        if (i === this.state.frames.length - 1) {
          this.checkLoop()
        }
      }, this.state.delay * i)
    })
  }

  render() {
    // console.log(this.state.raw)
    return (
      <div>
        <h1>Send a Animation!</h1>
        <Matrix
          raw={this.state.raw}
          onLedClick={raw => {
            this.setState({ raw })
          }}
        />

        <button
          onClick={event => {
            this.setState({ raw: blank() })
          }}
        >
          Clear
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
              this.onSaveDb()
            }}
          >
            Save to DB
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
              this.onClearFames()
            }}
          >
            Clear Frames
          </button>
          <button
            onClick={() => {
              this.onPlay()
            }}
          >
            Play
          </button>
          <p>Looping: {this.state.loop ? 'ON' : 'OFF'}</p>
          <button
            onClick={() => {
              this.setState({ loop: !this.state.loop })
            }}
          >
            Loop
          </button>
        </div>
      </div>
    )
  }
}

export default Animation
// disabled={true}
