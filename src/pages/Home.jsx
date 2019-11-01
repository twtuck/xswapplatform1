import React, { Component } from 'react';
import { Lead, BSpan } from 'bootstrap-4-react';

export default class Home extends Component {
  
  render() {
    const { user } = this.props;
    let greeting;
    if (user) {
      greeting = <Lead>You are signed in as <BSpan font="italic">{user.username}</BSpan>.</Lead>;
    } else {
      greeting = <h1>Home</h1>;
    }
    return (
      <React.Fragment>
        {greeting}
      </React.Fragment>
    )
  }
}