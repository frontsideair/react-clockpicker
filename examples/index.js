import React, { Component } from 'react';
import { render } from 'react-dom';
import ClockPicker from '../src/react-clockpicker';
require('../src/react-clockpicker.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 12,
      minutes: 20,
      enabled: true
    };
  }

  render() {
    let { hours, minutes, enabled } = this.state;
    let checkbox = <input type="checkbox" checked={this.state.enabled} onChange={(e) => this.setState({ enabled: e.target.checked })} />;

    return (
      <ClockPicker
        addonBefore={checkbox}
        placement='bottom'
        disabled={!enabled}
        hours={hours}
        minutes={minutes}
        onChange={(hours, minutes) => this.setState({ hours, minutes })} />
    );
  }
}

render(<App />, document.getElementById('root'));
