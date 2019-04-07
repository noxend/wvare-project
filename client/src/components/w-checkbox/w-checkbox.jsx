import React, { Component } from 'react';

import './w-checkbox.css';

export default class WCheckbox extends Component {
  render() {

    const { label } = this.props;

    return (
      <label className="w-checkbox">
        <input type="checkbox" id="checkbox" name="checkbox"/>
        <span />
        <label htmlFor="checkbox">{label}</label>
      </label>
    );
  }
}
