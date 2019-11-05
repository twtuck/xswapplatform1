import React from 'react';

import Navigator from './components/Navigator';
import Main  from './components/Main';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';

// Get the aws resources configuration parameters
// import awsconfig from './aws-exports';

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_flrlkOpyC",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "b8ivlelvl9r48kogcs8fd2q0r",

    //authenticationFlowType: "CUSTOM_AUTH"

    // for platform analytics only, not working yet
    // identityPoolId: "ap-southeast-1:f86a39f1-8045-48f0-b112-d2294eb9597b"
  },
  API: {
    endpoints: [
      {
        name: "MyAPIGatewayAPI",
        endpoint:
          "https://uneetbqwai.execute-api.ap-southeast-1.amazonaws.com/dev/"
      }
    ]
  }
});

const oauth = {
  domain: "xswap-dev-368593173631.auth.ap-southeast-1.amazoncognito.com",
  redirectSignIn: "https://master.d2zqadgdd5qoem.amplifyapp.com/",
  // "https://master.d2zqadgdd5qoem.amplifyapp.com/",
  redirectSignOut: "https://master.d2zqadgdd5qoem.amplifyapp.com/",
  // "https://master.d2zqadgdd5qoem.amplifyapp.com/",
  responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
};

Auth.configure({
  oauth
});

// Amplify.configure(awsconfig);
// Analytics.configure(awsconfig);

function App() {
 
  // keep it simple we define that the web session is active when the page is not hidden and inactive when the page is hidden
  Analytics.autoTrack('session', {
    // REQUIRED, turn on/off the auto tracking
    enable: true,
    // OPTIONAL, the attributes of the event, you can either pass an object or a function 
    // which allows you to define dynamic attributes
    attributes: {
        attr: 'attr'
    },
});
  
return (
      <React.Fragment>
        <Navigator />
        <Main />
      </React.Fragment>
);
  
}

export default App;