import React, { Component } from 'react';
import { withOAuth } from 'aws-amplify-react';
import uuidv1 from 'uuid/v1';
import SetupTotp from "../components/SetupTotp";
import { Button } from 'react-bootstrap';
const UserService = require('../services/user-service');

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

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    const { session } = this.props;

    UserService.getUserProfile(session.getAccessToken().getJwtToken()).then(response => {
        this.setState(
          { userProfile: response,
            name: response.userName,
            firstName: response.firstName,
            lastName: response.lastName
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
          const { userProfile, name, email, firstName, lastName } = this.state;
          
          if (this.validateFirstName(firstName) && this.validateLastName(lastName)) {
            const { session } = this.props;
            var token = session.getAccessToken().getJwtToken();
            userProfile.firstName = firstName;
            userProfile.lastName = lastName;
            userProfile.email = emaill;
            UserService.updateUserProfile(userProfile, token)
                .then(userProfile => {
                  console.log('userProfile: ' + userProfile);           
                  //this.setState({userProfile});
                })
                .catch(error => {
                    console.log(error);
                });
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
    const { user } = this.state;
    let identities = user.attributes.identities;
    let isFederatedUser;
    console.log('identities: ', identities);
    if (identities) {
      console.log('identities[providerName]: ', identities['providerName']);
      isFederatedUser = identities['providerName'];
      if (!isFederatedUser) {
        console.log('identities contains providerName: ', identities.includes('providerName'));
        isFederatedUser = identities.includes('providerName');
      }
    }

    return (
      <React.Fragment>
      <div className="alignLeft">
        {validationErrorSummary}
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
        { !isFederatedUser && <SetupTotp/> }
      </div>
      </React.Fragment>
    )
  }
}
export default Profile;