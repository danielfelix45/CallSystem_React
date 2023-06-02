import { useState } from 'react';
import './style.css';

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt="System logo" />
        </div>

        <form>
          <h1>New Account</h1>

          <input
            type='text'
            placeholder='Your name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='email@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <buttom type="submit">Register</buttom>
        </form>

        <Link to="/">Do you have an account? Sign in</Link>
      </div>
    </div>
  )
}

export default SignUp;