import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'
import ButtonSwitch from './ButtonSwitch'

const square = () => {
  return Array.from({length: 8*8}).map(()=>0)
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
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('hey', this.state.raw)
    axios
      .get(`/raw/${this.state.raw.join('')}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    // console.log(this.state.raw)
    return (
      <div>
        <h1>Send a drawing</h1>
        <div>
          {this.state.raw.map((x, i) => {
            return (
              (i+1)%8===0?
              <span><ButtonSwitch value={x} onLedChange={() => {
                let selected = this.state.raw
                selected[i] = selected[i] === 0 ? 1 : 0
                this.setState({ raw: selected })
              }}>
              </ButtonSwitch><br/>
              </span>
              :
              <ButtonSwitch value={x} onLedChange={() => {
                let selected = this.state.raw
                selected[i] = selected[i] === 0 ? 1 : 0
                this.setState({ raw: selected })
              }}>
              </ButtonSwitch>
            )
          })}
        </div>
        <button onClick={this.onSubmit}>Send</button>
        <button onClick={(event)=>{
          this.setState({raw: square()})
          this.onSubmit(event)}}>Clear</button>
        {/* <form onSubmit={this.onSubmit}>
          <input
            value={this.state.char}
            onChange={event => this.setState({ char: event.target.value })}
            type="text"
            placeholder="Char"
          />
          <br />
          <button type="submit">Send</button>
        </form> */}
      </div>
    )
  }
}

export default Draw
