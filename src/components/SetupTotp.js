import React, { Component } from "react";
import { Auth } from "aws-amplify";
import QRCode from 'qrcode.react';
import { Button } from 'react-bootstrap';

export default class SetupTotp extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, qrCode: null };
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
            .then(data => console.log('MFA update success: ', data))
            .catch(err => console.log('MFA update error: ', err))
        })
    }

    render() {
        const { qrCode } = this.state;
        return ( 
        <div className="totp">
          <div className="form-group row">
            <Button variant="primary" onClick={this.addTTOP}>Add TOTP</Button>
          </div>
          {
            (qrCode && qrCode !== '') && (
              <div className="form-group row">
                <div className="col-6">
                  <QRCode value={qrCode} size={300} />
                </div>
                <div className="col-6">
                  <div>
                    <label htmlFor="name">TOTP Code</label>
                  </div>
                  <div className="form-group">
                    <input type="text" name="totpCode" autoFocus size="14"/>
                  </div>
                  <div className="form-group">
                    <Button variant="primary" onClick={() => this.setPreferredMFA('TOTP')}>Confirm TOTP</Button>
                  </div>
                </div>
              </div>
            )
          }
        </div>);
    }
}