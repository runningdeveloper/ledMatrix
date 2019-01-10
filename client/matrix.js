import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'
import * as localforage from 'localforage'
import ButtonSwitch from './ButtonSwitch'

const blank = () => {
  return Array.from({ length: 8 * 8 }).map(() => 0)
}

class Matrix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raw: blank(),
    }
    this.onLedClick = this.onLedClick.bind(this)
  }

  onLedClick(i) {
    if (!this.props.disabled) {
      let selected = this.state.raw
      selected[i] = selected[i] === 0 ? 1 : 0
      this.setState({ raw: selected })
      console.log(JSON.stringify(selected))
      this.props.onLedClick(selected)
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.raw !== prevProps.raw) {
      this.setState({
        raw: this.props.raw,
      })
    }
  }

  render() {
    // console.log(this.state.raw)
    return (
      <div>
        {this.state.raw.map((x, i) => {
          return (i + 1) % 8 === 0 ? (
            <span>
              <ButtonSwitch
                value={x}
                onLedChange={() => {
                  this.onLedClick(i)
                }}
              />
              <br />
            </span>
          ) : (
            <ButtonSwitch
              value={x}
              onLedChange={() => {
                this.onLedClick(i)
              }}
            />
          )
        })}
      </div>
    )
  }
}

export default Matrix
