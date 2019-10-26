import React, { Component } from "react";
import { Auth } from "aws-amplify";
import QRCode from 'qrcode.react';

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
        <div>
          <button
            onClick={this.addTTOP}
            style={{ border: '1px solid #ddd', width: 125 }}
          >
          <p>Add TOTP</p>
          </button>
          {
            (qrCode && qrCode !== '') && (
              <div>
                <QRCode value={qrCode} />
              </div>
            )
          }
          <br />
          <button
            onClick={() => this.setPreferredMFA('TOTP')}
            style={{ border: '1px solid #ddd', width: 125 }}
          >
            <p>Prefer TOTP</p>
          </button>
          <br />
          <input
            placeholder='TOTP Code'
            onChange={e => this.setState({
              challengeAnswer: e.target.value
            })}
            style={{ border: '1px solid #ddd', height: 35 }}
          />
        </div>);
    }
}