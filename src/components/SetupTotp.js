import React, { Component } from "react";
import { Auth } from "aws-amplify";
import QRCode from 'qrcode.react';
import { Button } from 'react-bootstrap';

export default class SetupTotp extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, qrCode: null };
        this.onTOTPChange = this.onTOTPChange.bind(this);
    }

    componentDidMount() {
        this.loadUser();
      }
    
    loadUser() {
        Auth.currentAuthenticatedUser()
        .then(user => this.setState({ user }))
        .catch(err => this.setState({ user: null }));
    }
 
    addTTOP = () => {
        const { user } = this.state;
        if (!user) {
            return;
        }

        Auth.setupTOTP(user).then(code => {
            const authCode = "otpauth://totp/AWSCognito:" + user.username + "?secret=" + code + "&issuer=AWSCognito";
            this.setState({ qrCode: authCode })
        });
    }

    setPreferredMFA = (authType) => {
        const { user, challengeAnswer } = this.state;
        Auth.verifyTotpToken(user, challengeAnswer)
        .then(() => {
            Auth.setPreferredMFA(user, authType)
            .then(data => {
              let message = 'MFA update success';
              console.log(message + ':' + data);
              this.setState({ success: message })
            })
            .catch(err => {
              let message = 'Cannot update MFA, try again later';
              console.log(message + ':' + err);
              this.setState({ success: message })
            })
        })
    }

    onTOTPChange(event) {
        const challengeAnswer = event.target.value.trim();
        this.setState({ challengeAnswer: challengeAnswer });
    }

    render() {
        const { qrCode, success } = this.state;
        let successMessage
        if (success) {
          successMessage = (
            <div className="form-group">
              {success}
            </div>
          );
        }
        
        return ( 
        <div>
          <div className="form-group">
            <Button variant="primary" onClick={this.addTTOP}>Generate QRCode</Button>
          </div>
          <br/>
          {
            (qrCode && qrCode !== '') && (
              <div className="form-group row">
                <div className="col-auto">
                  <QRCode value={qrCode} size={300} />
                </div>
                <div className="col-auto">
                  <div>
                    <label htmlFor="name">TOTP Code</label>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder='TOTP Code' name="totpCode" onChange={this.onTOTPChange} size="14"/>
                  </div>
                  <div className="form-group">
                    <Button variant="primary" onClick={() => this.setPreferredMFA('TOTP')}>Confirm TOTP</Button>
                  </div>
                  {successMessage}
                </div>
              </div>
            )
          }
        </div>);
    }
}