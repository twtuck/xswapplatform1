import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import SetupTotp from "../components/SetupTotp";
import { Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { trackPromise } from 'react-promise-tracker';
import Password from "./Password";
const PlatformService = require('../services/platform-service');

class Profile extends Component {
  constructor(props) {
    super(props);
    const { user, session, signIn } = this.props;

    if (!session) {
        signIn();
    }
    this.state = {
      userProfile: null,
      validationErrors: [],
      user: user
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    const { session } = this.props;

    PlatformService.getUserProfile(session.getAccessToken().getJwtToken()).then(response => {
      let userProfile = response.userProfile;
      if (!userProfile) {
        userProfile = {
          firstName: '',
          lastName: ''
        }
      }
      this.setState(
        { userProfile: response,
          name: response.userName,
          email: response.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName
        });
    })
    .catch(error => {
        console.log(error);
        return;
    });
  }

  onFirstNameChange(event) {
      const firstName = event.target.value.trim();
      this.validateFirstName(firstName);
      this.setState({ firstName: firstName });
  }

  onLastNameChange(event) {
      const lastName = event.target.value.trim();
      this.validateLastName(lastName);
      this.setState({ lastName: lastName });
  }

  onSave(event) {
      event.preventDefault();
      if (this.state.validationErrors && this.state.validationErrors.length === 0) {
          const { firstName, lastName } = this.state;
          
          if (this.validateFirstName(firstName) && this.validateLastName(lastName)) {
            const { session } = this.props;
            const newProfile = { 
              firstName: firstName, 
              lastName: lastName 
            }
            trackPromise(
            PlatformService.updateUserProfile(newProfile, session.getAccessToken().getJwtToken())
                .then(userProfile => {
                  console.log(userProfile);
                  this.setState({updateResult: 'success'});
                })
                .catch(error => {
                    console.log(error);
                    this.setState({updateResult: 'fail'});
                }));
          }
      }
  }

  validateFirstName(text) {
      const message = 'First Name is required';
      if (text === '') {
          this.addValidationError(message);
          return false;
      } else {
          this.removeValidationError(message);
          return true;
      }
  }

  validateLastName(text) {
      const message = 'Last Name is required';
      if (text === '') {
          this.addValidationError(message);
          return false;
      } else {
          this.removeValidationError(message);
          return true;
      }
  }
    
  addValidationError(message) {        
      this.setState((previousState) => {
          const validationErrors = [...previousState.validationErrors];
          validationErrors.push({message});
          return {
              validationErrors: validationErrors
          };
      });      
  }

  removeValidationError(message) {
      this.setState((previousState) => {
          const validationErrors = previousState
              .validationErrors
              .filter(error => error.message !== message);
          
          return {
              validationErrors: validationErrors
          };
      });      
  }

  render() {
    const validationErrorSummary = this.state.validationErrors.map(error => 
        <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
            {error.message}
            <button type="button" className="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        </div>
    );
    const success = (
      <Alert variant='success'>
        Updated successfully.
      </Alert>
    );
    const fail = (
      <Alert variant='danger'>
        Error when updating, please try again.
      </Alert>
    );
    const { user, updateResult } = this.state;
    let identities = user.attributes.identities;
    let isFederatedUser;
    if (identities) {
      isFederatedUser = identities['providerName'];
      if (!isFederatedUser) {
        isFederatedUser = identities.includes('providerName');
      }
    }

    return (
      <React.Fragment>
      <div>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="profile" title="Update User Profile">
        {validationErrorSummary}
        {updateResult && updateResult === 'success' && success}
        {updateResult && updateResult === 'fail' && fail}
        <form onSubmit={this.onSave} className="mt-2">
          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="name">Username</label>
              <input type="text" className="form-control" name="name" disabled value={this.state.name}/>
            </div>
            <div className="col-6">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control" name="email" disabled value={this.state.email}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" name="firstName" value={this.state.firstName}
                onChange={this.onFirstNameChange} autoFocus/>
            </div>
            <div className="col-6">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" name="lastName" value={this.state.lastName}
                onChange={this.onLastNameChange}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
              <Button type="submit" variant="primary" block>Save</Button>
            </div>
          </div>
        </form>
        </Tab>

        { !isFederatedUser && 
        <Tab eventKey="password" title="Update Password">
        <Password/>
        </Tab> }

        { !isFederatedUser && 
        <Tab eventKey="totp" title="Add TOTP">
          <SetupTotp/>
        </Tab> }
      </Tabs>
      </div>
      </React.Fragment>
    )
  }
}
export default Profile;