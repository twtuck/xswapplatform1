import React from 'react';

import Navigator from './components/Navigator';
import Main  from './components/Main';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';

// Get the aws resources configuration parameters
import awsconfig from './aws-exports';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Amplify.configure({
//   Auth: {
//     // REQUIRED - Amazon Cognito Region
//     region: "ap-southeast-1",

//     // OPTIONAL - Amazon Cognito User Pool ID
//     userPoolId: "ap-southeast-1_d59shP2vd",

//     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//     userPoolWebClientId: "17u15dksii7tv45bflfh0f0oag"
//   }
// });

// const oauth = {
//   domain: "xswap-dev-368593173631.auth.ap-southeast-1.amazoncognito.com",
//   scope: ["email", "profile", "openid"],
//   redirectSignIn:
//     "https://master.d2zqadgdd5qoem.amplifyapp.com/",
//   redirectSignOut:
//     "https://master.d2zqadgdd5qoem.amplifyapp.com/", // xwaplatform-20190930160053-hostingbucket
//   responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
// };

// Auth.configure({
//   oauth
// });

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_BBBh145d7",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "19e8c683jvtiaupe6hveb5fqhe",

    //authenticationFlowType: "CUSTOM_AUTH"

    // for platform analytics only, not working yet
    // identityPoolId: "ap-southeast-1:f86a39f1-8045-48f0-b112-d2294eb9597b"
  },
  API: {
    endpoints: [
      {
        name: "MyAPIGatewayAPI",
        endpoint:
          "https://6sevm9m5t1.execute-api.ap-southeast-1.amazonaws.com/dev"
      }
    ]
  }
});

const oauth = {
  domain: "xswap-dev-368593173631.auth.ap-southeast-1.amazoncognito.com",
  scope: [
    "email",
    "profile",
    "openid",
    "xswap/profile",
    "xswap/users",
    "xswap/apps",
    "aws.cognito.signin.user.admin"
  ],
  redirectSignIn: "https://master.d2zqadgdd5qoem.amplifyapp.com/",
  // "https://master.d2zqadgdd5qoem.amplifyapp.com/",
  redirectSignOut: "https://master.d2zqadgdd5qoem.amplifyapp.com/",
  // "https://master.d2zqadgdd5qoem.amplifyapp.com/", // xwaplatform-20190930160053-hostingbucket
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

//<Router>
//<Header/>
//<div className="container mt-5">
//    <Route exact path="/" component={Doc} />
//    <Route path="/doc" component={Doc} />
//    <Route path="/contact" component={Contact} />
//    <Route path="/apps" component={AppManager} />
//</div>
//</Router>

//export default App;

//Wrap the default App component using withAuthenticator at the bottom of the file as follows:
//he simplest way to add authentication flows into your app is to use the withAuthenticator Higher Order Component.
//withAuthenticator automatically detects the authentication state and updates the UI. If the user is signed in, 
// the underlying component (typically your app’s main component) is displayed otherwise signin/signup controls are displayed.
export default App;
/*
Now, your app has complete flows for user sign-in and registration. Since you have wrapped your App with withAuthenticator, 
only signed in users can access your app. The routing for login pages and giving access to your App Component will 
be managed automatically.

withAuthenticator component renders your App component after a successful user signed in, 
and it prevents non-sign-in users to interact with your app. In this case, we need to display a sign-out button 
to trigger the related process.
*/