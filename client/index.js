import './style';
import { Component } from 'preact';
import * as axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      char: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('hey', this.state.char)
    axios.get(`/char/${this.state.char}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

	render() {
		return (
			<div>
				<h1>Char Change!!</h1>
        <form onSubmit={this.onSubmit}>
        <input
          value={this.state.char}
          onChange={event =>
            this.setState({char: event.target.value})
          }
          type="text"
          placeholder="Char"
        />
        <br />
        <button type="submit">
          Send
        </button>
      </form>
			</div>
		);
	}
}

export default App
