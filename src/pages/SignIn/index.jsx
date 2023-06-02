import { useState } from 'react';
import './style.css';

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt="System logo" />
        </div>

        <form>
          <h1>Enter</h1>

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

          <buttom type="submit">Access</buttom>
        </form>

        <Link to="/register">Create an account</Link>
      </div>
    </div>
  )
}

export default SignIn;