import React, { Component } from 'react';
import { Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { trackPromise } from 'react-promise-tracker';

class Password extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      validationErrorMessage: null,
      password: '',
      newPassword: '',
      confirmPassword: ''
    };

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onSavePassword = this.onSavePassword.bind(this);
  }

  onPasswordChange(event) {
    const password = event.target.value.trim();
    this.validatePassword(password);
    this.setState({ password: password });
  }

  onNewPasswordChange(event) {
    const password = event.target.value.trim();
    this.validateNewPassword(password);
    this.setState({ newPassword: password });
  }

  onConfirmPasswordChange(event) {
    const password = event.target.value.trim();
    this.validateConfirmPassword(password);
    this.setState({ confirmPassword: password });
  }

  onSavePassword(event) {
    event.preventDefault();
    const { password, newPassword, confirmPassword } = this.state;
    if (!this.validatePassword(password) || !this.validateNewPassword(newPassword)
        || !this.validateConfirmPassword(confirmPassword)) {
      return;
    }
    trackPromise(
      Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(user, password, confirmPassword);
        })
        .then(data => {
          this.setState({
            updateResult: 'success',
            password: '',
            newPassword: '',
            confirmPassword: ''
          });
          console.log(data);
        })
        .catch(err => {
          this.setState({updateResult: 'fail'});
          console.log(err);
        }));
  }

  validatePassword(text) {
    const message = 'Password is required';
    if (text === '') {
      this.setState({validationErrorMessage: message})
      return false;
    } else {
      this.setState({validationErrorMessage: null})
      return true;
    }
  }

  validateNewPassword(text) {
    const message = 'New Password is required';
    if (text === '') {
      this.setState({validationErrorMessage: message})
      return false;
    } else {
      this.setState({validationErrorMessage: null})
      return true;
    }
  }

  validateConfirmPassword(text) {
    if (text === '') {
      const message = 'Confirm New Password is required';
      this.setState({validationErrorMessage: message})
      return false;
    } else {
      const { newPassword } = this.state;
      if (text !== newPassword) {
        const message = 'Password does not match!';
        this.setState({validationErrorMessage: message})
        return false;
      }
      this.setState({validationErrorMessage: null})
      return true;
    }
  }

  render() {
    const { validationErrorMessage, updateResult } = this.state;
    const validationErrorSummary = ( validationErrorMessage &&
      <Alert variant='danger'>
        {validationErrorMessage}
      </Alert>
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

    return (
      <React.Fragment>
        {validationErrorSummary}
        {updateResult && updateResult === 'success' && success}
        {updateResult && updateResult === 'fail' && fail}
        <form onSubmit={this.onSavePassword} className="mt-2">
          <div className="form-group row">
            <div className="col-4">
              <label htmlFor="password">Current Password</label>
              <input type="password" className="form-control" name="password" value={this.state.password}
                onChange={this.onPasswordChange}/>
            </div>
            <div className="col-4">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" className="form-control" name="newPassword" value={this.state.newPassword}
                onChange={this.onNewPasswordChange}/>
            </div>
            <div className="col-4">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input type="password" className="form-control" name="confirmPassword" value={this.state.confirmPassword}
                onChange={this.onConfirmPasswordChange}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
              <Button type="submit" variant="primary" block>Change Password</Button>
            </div>
          </div>
        </form>
        <ul>
          <li>Password must contain a lower case letter</li>
          <li>Password must contain an upper case letter</li>
          <li>Password must contain a special character</li>
          <li>Password must contain a number</li>
          <li>Password must contain at least 12 characters</li>
        </ul>
      </React.Fragment>
    )
  }
}
export default Password;