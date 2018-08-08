/* App */
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Redux */
import { Provider } from 'react-redux';
import store from './redux/store/index';

/* Amplify */
import Amplify from 'aws-amplify';
import config from './Amplify.config';
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'postapi',
        endpoint: config.apiGateway.post_URL,
        region: config.apiGateway.REGION
      },
      {
        name: 'userapi',
        endpoint: config.apiGateway.user_URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
