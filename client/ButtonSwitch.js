import styled, { css } from 'preact-emotion'
import { Component } from 'preact'

const Button = styled('button')`
  background-color: ${props => props.color};
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border: 1px solid;
  margin: 0.2rem;
`

class ButtonSwitch extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Button color={this.props.value === 0 ? `transparent` : `#4949e6`}
        onClick={() => {
          console.log('clicked')
          const newValue = this.props.value === 0 ? 1 : 0
          this.props.onLedChange(newValue)
        }}
      >
      </Button>
    )
  }
}

export default ButtonSwitch
