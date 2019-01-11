import styled, { css } from 'preact-emotion'
import { Component } from 'preact'
import * as axios from 'axios'
import * as localforage from 'localforage'
import ButtonSwitch from './ButtonSwitch'
import Matrix from './matrix'

class AnimationPiece extends Component {
  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.onMoveUp = this.onMoveUp.bind(this)
    this.onMoveDown = this.onMoveDown.bind(this)
  }

  onDelete() {
    this.props.onDelete()
  }

  onMoveUp() {
    this.props.onMoveUp()
  }

  onMoveDown() {
    this.props.onMoveDown()
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.raw !== prevProps.raw) {
  //     this.setState({
  //       raw: this.props.raw,
  //     })
  //   }
  // }

  render() {
    // console.log(this.state.raw)
    return (
      <div
        className={css`
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;
        `}
      >
        <Matrix raw={this.props.frame} disabled={true} small={true} />
        <button onClick={this.onMoveUp}>Move Up</button>
        <button onClick={this.onMoveDown}>Move Down</button>
        <button onClick={this.onDelete}>Remove</button>
      </div>
    )
  }
}

export default AnimationPiece
