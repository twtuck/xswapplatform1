import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { trackPromise } from 'react-promise-tracker';

const PlatformService = require('../services/platform-service');

class User extends Component {
  constructor(props) {
    super(props);
    const { user, session, signIn } = this.props;

    if (!session) {
        signIn();
    }
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    this.getUserList();
  }

  getUserList() {
    const { session } = this.props;
    trackPromise(
      PlatformService.getUsers(session.getAccessToken().getJwtToken()).then(response => {
          this.setState({ users: response });
      })
      .catch(error => {
          console.log(error);
          return;
    }));
  }

  render() {
    const { users } = this.state;
    let i = 1;
    const userRows = users.map(user => {
      let userProfile = user.userProfile;
      if (!userProfile) {
        userProfile = {
          firstName: '',
          lastName: ''
        }
      }
      return (
        <tr>
          <td className="align-middle first-column">{i++}</td>
          <td className="align-middle">{user.userName}</td>
          <td className="align-middle">{user.email}</td>
          <td className="align-middle">{userProfile.firstName}</td>
          <td className="align-middle">{userProfile.lastName}</td>
        </tr>
      )
    });
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="align-middle first-column">#</th>
              <th className="align-middle">Username</th>
              <th className="align-middle">Email</th>
              <th className="align-middle">First Name</th>
              <th className="align-middle">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {userRows}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
export default User;