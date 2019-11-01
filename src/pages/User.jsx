import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
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

  componentDidMount() {
    this.getUserList();
  }

  getUserList() {
    const { session } = this.props;

    PlatformService.getUsers(session.getAccessToken().getJwtToken()).then(response => {
        this.setState({ users: response });
    })
    .catch(error => {
        console.log(error);
        return;
    });
  }

  render() {
    const { users } = this.props;
    const userRows = users.map(user => {
      return (
        <tr>
          <td></td>
          <td>user.userName</td>
          <td>user.email</td>
          <td>user.userProfile.firstName</td>
          <td>user.userProfile.lastName</td>
        </tr>
      )
    });
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
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