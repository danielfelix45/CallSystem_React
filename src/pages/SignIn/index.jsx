import { useState, useContext } from 'react';
import './style.css';

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  function handleSignIn(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      signIn(email, password);
    }
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt="System logo" />
        </div>

        <form onSubmit={handleSignIn}>
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

          <button type="submit">Access</button>
        </form>

        <Link to="/register">Create an account</Link>
      </div>
    </div>
  )
}

export default SignIn;