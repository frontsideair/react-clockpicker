import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Overlay, Popover, Input, Glyphicon } from 'react-bootstrap';
import './react-clockpicker.css';

const CP_EDITING = {
  NOT_EDITING: 0,
  HOURS: 1,
  MINUTES: 2
};

export default class ClockPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: props.hours,
      minutes: props.minutes,
      editing: CP_EDITING.NOT_EDITING
    };
  }

  static propTypes = {
    hours: React.PropTypes.number.isRequired,
    minutes: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    addonBefore: React.PropTypes.node,
    disabled: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    hours: 13,
    minutes: 30,
    placement: 'bottom',
    disabled: false
  };

  componentWillReceiveProps({ hours, minutes }) {
    if (this.state.editing === CP_EDITING.NOT_EDITING) {
      this.setState({ hours, minutes });
    }
  }

  render() {
    const { onChange, placement, addonBefore, disabled } = this.props;
    const { hours, minutes } = this.state;

    let hourTicks = [],
      minuteTicks = [];

    const tickRadius = 13,
      dialRadius = 100,
      outerRadius = 80,
      innerRadius = 54,
      leadingZero = (num) => (num < 10 ? '0' : '') + num;

    const title = (
      <div>
        <span
          className={'clockpicker-span-hours' + (this.state.editing === CP_EDITING.HOURS ? ' text-primary' : '')}
          onClick={() => this.setState({editing: CP_EDITING.HOURS})}>
          {leadingZero(hours)}
        </span>
        {' : '}
        <span
          className={'clockpicker-span-minutes' + (this.state.editing === CP_EDITING.MINUTES ? ' text-primary' : '')}
          onClick={() => this.setState({editing: CP_EDITING.MINUTES})}>
          {leadingZero(minutes)}
        </span>
      </div>
    );

    for (let i = 0; i < 24; i += 1) {
      const radian = i / 6 * Math.PI;
      const inner = i > 0 && i < 13;
      const radius = inner ? innerRadius : outerRadius;
      const left = dialRadius + Math.sin(radian) * radius - tickRadius;
      const top = dialRadius - Math.cos(radian) * radius - tickRadius;
      const text = i === 0 ? '00' : i;

      hourTicks.push(
        <div
          key={'hour_' + text}
          className="clockpicker-tick"
          onClick={() => this.setState({ editing: CP_EDITING.MINUTES, hours: i })}
          style={{left, top, fontSize: inner ? '120%' : '100%'}}>
          {text}
        </div>
      );
    }

    for (let i = 0; i < 60; i += 5) {
      const radian = i / 30 * Math.PI;
      const left = dialRadius + Math.sin(radian) * outerRadius - tickRadius;
      const top = dialRadius - Math.cos(radian) * outerRadius - tickRadius;
      const text = leadingZero(i);

      minuteTicks.push(
        <div
          key={'minute_' + text}
          className="clockpicker-tick"
          onClick={() => {
            this.setState({ editing: CP_EDITING.NOT_EDITING, minutes: i })
            onChange(hours, i)
          }}
          style={{left, top, fontSize: '120%'}}>
          {text}
        </div>
      );
    }

    const value = this.state.editing === CP_EDITING.HOURS ? hours : minutes,
      unit = Math.PI / (this.state.editing === CP_EDITING.HOURS ? 6 : 30),
      radian = value * unit,
      radius = this.state.editing === CP_EDITING.HOURS && value > 0 && value < 13 ? innerRadius : outerRadius,
      x = Math.sin(radian) * radius,
      y = - Math.cos(radian) * radius;

    const hand = (
      <svg className="clockpicker-svg" width="200" height="200">
        <g transform="translate(100,100)">
          <line x1="0" y1="0" x2={x} y2={y}></line>
          <circle className="clockpicker-canvas-fg" r="3.5" cx={x} cy={y}></circle>
          <circle className="clockpicker-canvas-bg" r="13" cx={x} cy={y}></circle>
          <circle className="clockpicker-canvas-bearing" cx="0" cy="0" r="2"></circle>
        </g>
      </svg>
    );

    const startEditing = () => {
      if (!disabled) {
        this.setState({ editing: CP_EDITING.HOURS });
      }
    }

    const popover = (
      <Popover id="clockpicker" className="clockpicker-popover" title={title}>
        <div className="clockpicker-plate">
          <div className="clockpicker-canvas">
            { hand }
          </div>
          { this.state.editing === CP_EDITING.HOURS ?
          <div className="clockpicker-dial clockpicker-hours">
            { hourTicks }
          </div> :
          <div className="clockpicker-dial clockpicker-minutes" style={{visibility: 'visible'}}>
            { minuteTicks }
          </div>
          }
        </div>
      </Popover>
    );

    return (
      <div>
        <Input
          type="text"
          ref="target"
          className="clockpicker"
          disabled={disabled}
          value={leadingZero(hours) + ':' + leadingZero(minutes)}
          onChange={() => false} // TODO
          onClick={startEditing}
          addonBefore={addonBefore}
          addonAfter={<Glyphicon glyph="time" onClick={startEditing} />} />
        <Overlay
          placement={placement}
          animation={false}
          show={this.state.editing !== CP_EDITING.NOT_EDITING}
          rootClose={true}
          container={document.body}
          target={() => findDOMNode(this.refs.target)}
          onHide={() => this.setState({
            editing: CP_EDITING.NOT_EDITING,
            hours: this.props.hours,
            minutes: this.props.minutes
          })} >
          {popover}
        </Overlay>
      </div>
    );
  }
}
