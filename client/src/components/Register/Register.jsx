import React, { useState } from 'react';

import { toast } from 'react-toastify';

import './Register.css';

const Register = ({ onRouteChange, loadUser }) => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  const onSubmitSignUp = async () => {
    const { name, email, password } = registerForm;
    if (name === '' || email === '' || password === '') {
      toast.error('Please enter all values');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.userId && data.success === 'true') {
        saveAuthTokenInSession(data.token);
        loadUser(data.user);
        toast.success('Register successfully');
        onRouteChange('home');
      } else {
        toast.error('Registration Failed');
      }
    } catch (error) {
      console.log('Registration error', error);
    }
  };

  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0'>Register</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='name'>
                Name
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='text'
                name='name'
                id='name'
                value={registerForm.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='email'
                name='email'
                id='email'
                value={registerForm.email}
                onChange={handleChange}
                required
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
                value={registerForm.password}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={onSubmitSignUp}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Register'
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
