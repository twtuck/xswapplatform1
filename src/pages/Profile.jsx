import React, { Component } from 'react';
import { Lead, BSpan } from 'bootstrap-4-react';
import { withAuthenticator } from 'aws-amplify-react';

class Profile extends Component {
  render() {
    const { user } = this.props;
    let userProfile;
    if (user) {
      userProfile = <Lead>You are signed in as <BSpan font="italic">{user.username}</BSpan>.</Lead>;
    } else {
      userProfile = <h1>Cannot see user profile</h1>;
    }
    return (
      <React.Fragment>
        {userProfile}
      </React.Fragment>
    )
  }
}
export default withAuthenticator(Profile, false);