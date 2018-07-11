import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { Auth } from 'aws-amplify';

Amplify.configure(aws_exports);

Auth.signUp({
  username: 'AmandaB',
  password: 'MyCoolPassword1!',
  attributes: {
    email: 'someemail@example.com'
  }
});

Auth.signIn(username, password)
.then(success => console.log('successful sign in!'))
.catch(err => console.log(err));