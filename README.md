# React ClockPicker

React port of [Wang Shenwei](https://github.com/weareoutman)'s excellent [ClockPicker](https://github.com/weareoutman/clockpicker) widget.

> This repo is no longer maintained. Requests to take over are welcome.

## Installation

``` sh
npm install --save react-clockpicker
```

## Usage

``` javascript
# Import using ES6 modules
import ClockPicker from 'react-clockpicker'

# Import using CommonJS modules
var ClockPicker = require('react-clockpicker')

# Use the component
<ClockPicker
  hours={hours}
  minutes={minutes}
  disabled={false}
  placement="right"
  addonBefore={...}
  onChange={(hours, minutes) => this.setState({ hours, minutes })} />
```

You need to have `bootstrap.min.css` and `react-clockpicker.css` on the page too.

## Roadmap

- [ ] Better documentation
- [ ] Have validation states
- [ ] Use direct text input
- [ ] Github pages example
- [ ] Support dragging cursor while selecting time
- [ ] Remove `react-bootstrap` dependency?
- [ ] Dismiss button
- [ ] AM/PM selection
- [ ] Transition effects

## License

MIT
