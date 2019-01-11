import styled, { css } from 'preact-emotion'
import { Component } from 'preact'

const Button = styled('button')`
  background-color: ${props => props.color};
  cursor: pointer;
  width: ${props => (props.small ? 1 : 2)}rem;
  height: ${props => (props.small ? 1 : 2)}rem;
  border: 1px solid;
  margin: ${props => (props.small ? 0.1 : 0.2)}rem;
`

class ButtonSwitch extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Button
        color={this.props.value === 0 ? `transparent` : `#4949e6`}
        small={this.props.small}
        onClick={() => {
          console.log('clicked')
          const newValue = this.props.value === 0 ? 1 : 0
          this.props.onLedChange(newValue)
        }}
      />
    )
  }
}

export default ButtonSwitch
