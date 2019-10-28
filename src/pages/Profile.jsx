import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import uuidv1 from 'uuid/v1';
import SetupTotp from "../components/SetupTotp";
import { Button } from 'react-bootstrap';
const UserService = require('../services/user-service');

class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;

    this.state = {
      userProfile: null,
      validationErrors: [],
      user: user
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    const { session } = this.props;

    UserService.getUserProfile(session.getAccessToken().getJwtToken()).then(response => {
        this.setState({ userProfile: response, name: response.userName });
    })
    .catch(error => {
        console.log(error);
        return;
    });
  }

  onNameChange(event) {
      const name = event.target.value.trim();
      this.validateName(name);
      this.setState({ name: name });
  }

  onSave(event) {
      event.preventDefault();
      if (this.state.validationErrors && this.state.validationErrors.length === 0) {
          const { userProfile, name } = this.state;
          
          if (this.validateName(name)) {
            const { session } = this.props;
            var token = session.getAccessToken().getJwtToken();
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

  validateName(text) {
      const message = 'Username is required';
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
    if (identities) {
      isFederatedUser = identities['providerName'];
    }

    return (
      <React.Fragment>
        {validationErrorSummary}
        <form onSubmit={this.onSave} className="mt-2">
          <div className="form-group row">
            <label htmlFor="name">Username</label>
            <input type="text" className="form-control" name="name" autoFocus onChange={this.onNameChange} value={this.state.name}/>
          </div>
          <div className="form-group row">
            <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
              <Button type="submit" variant="primary">Save</Button>
            </div>
          </div>
        </form>
    { isFederatedUser && <SetupTotp /> }
      </React.Fragment>
    )
  }
}
export default withAuthenticator(Profile, false);