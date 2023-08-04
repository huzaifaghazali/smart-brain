import { toast } from 'react-toastify';

// API Call When user login
const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      toast.error('Failed to login');
      throw new Error('Failed to login');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

// API Call when user Register
const handleRegister = async (name, email, password) => {
  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      toast.error('Failed to Register');
      throw new Error('Failed to Register');
    }


    return await response.json();
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

export { handleLogin, handleRegister };
