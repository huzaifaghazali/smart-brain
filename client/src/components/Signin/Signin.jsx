import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { handleLogin } from '../../services/apiAuthRequests';

import './Signin.css';

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  };

  const onSubmitSignIn = async () => {

    // Display Error toast when fields are empty
    if (signInEmail === '' || signInPassword === '') {
      toast.error('Please Fill all Fields');
      return;
    }

    try {
      // API Call When user login
      const data = await handleLogin(signInEmail, signInPassword);

      if (data.userId && data.success === 'true') {
        // Save the token in the session storage
        saveAuthTokenInSession(data.token);
        loadUser(data.user);
        toast.success('Login successfully');
        onRouteChange('home');
      } else {
        toast.error('Error Logging in');
      }
    } catch (error) {
      console.log('Login error', error);
    }
  };

  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='email'
                name='email-address'
                id='email-address'
                value={signInEmail}
                onChange={onEmailChange}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='password'
                name='password'
                id='password'
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={onSubmitSignIn}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Sign in'
            />
          </div>
          <div className='lh-copy mt3'>
            <p
              onClick={() => onRouteChange('register')}
              href='#0'
              className='f6 link dim black db pointer'
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
