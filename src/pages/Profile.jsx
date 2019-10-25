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

    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    const { session } = this.props;

    UserService.getUserProfile(session.getIdToken().getJwtToken()).then(response => {
        this.setState({ userProfile: response })
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
            var token = session.getIdToken().getJwtToken();
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

  render() {
    const { user } = this.props;
    const { userProfile } = this.state;

    let userProfileComponent;
    if (user) {
      userProfileComponent = <Lead>Username: { userProfile && <BSpan font="italic">{userProfile.userName}</BSpan> }</Lead>;
    } else {
      userProfileComponent = <h1>Cannot see user profile</h1>;
    }
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="mt-2">
          <div className="form-group row">
            <label htmlFor="name">Username</label>
            <input type="text" className="form-control" name="name" autoFocus onChange={this.onNameChange} />
          </div>
          <div className="form-group row">
            <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
              <button type="submit" className="btn btn-success btn-lg btn-block">
                <i className="fa fa-save mr-2"></i>Save
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}
export default withAuthenticator(Profile, false);