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
    }
    this.onLedClick = this.onLedClick.bind(this)
    this.onSaveFrame = this.onSaveFrame.bind(this)
    this.onClearDb = this.onClearDb.bind(this)
    this.onSaveDb = this.onSaveDb.bind(this)
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

  onSaveFrame() {
    let currentFrames = this.state.frames
    if (currentFrames.length > 0) {
      currentFrames.push(this.state.raw)
    } else {
      currentFrames = [this.state.raw]
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

  async onSaveDb() {
    console.log('save')
    await localforage.setItem('frames', this.state.frames)
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
        <h1>Send a Animation!</h1>
        <Matrix
          raw={this.state.raw}
          onLedClick={raw => {
            this.setState({ raw })
            this.onLedClick()
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
              this.onSaveDB()
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

export default Animation
// disabled={true}
