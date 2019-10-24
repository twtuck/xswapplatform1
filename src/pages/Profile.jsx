import React, { Component } from 'react';
import { Lead, BSpan } from 'bootstrap-4-react';
import { withAuthenticator } from 'aws-amplify-react';
const UserService = require('../services/user-service');

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: null
    };
  }

  listApps() {
    const { session } = this.props;
    UserService.getUserProfile(session.getIdToken().getJwtToken()).then(response => {
        this.setState({ userProfile: response })
    })
    .catch(error => {
        console.log(error);
        return;
    });
}
  render() {
    const { user } = this.props;
    let userProfile;
    if (user) {
      userProfile = <Lead>Username: <BSpan font="italic">{userProfile}</BSpan>.</Lead>;
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