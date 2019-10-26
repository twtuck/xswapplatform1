import React, { Component } from 'react';

import { Authenticator } from 'aws-amplify-react';
import { Lead, BSpan } from 'bootstrap-4-react';
import { withAuthenticator } from 'aws-amplify-react';
import SetupTotp from "../components/SetupTotp";

class Login extends Component {
  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        { !user && <Authenticator /> }
        { user && <Lead>You are signed in as <BSpan font="italic">{user.username}</BSpan>.</Lead> }
        <SetupTotp />
      </React.Fragment>
    )
  }
}
export default withAuthenticator(Login, false);