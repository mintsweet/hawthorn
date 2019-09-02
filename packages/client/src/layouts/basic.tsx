import React, { Component } from 'react';

export default class BasicLayout extends Component {
  render() {
    return (
      <div>
        <div>BasicLayout</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
