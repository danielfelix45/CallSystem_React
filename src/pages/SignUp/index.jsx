import { useState, useContext } from 'react';
import './style.css';

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/auth'

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);

  async function handleSubmit(e){
    e.preventDefault();

    if(name !== '' && email !== ''&& password !== ''){
     await signUp(name, email, password)
    }
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt="System logo" />
        </div>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">
            {loadingAuth ? "Loading..." : "Register"}
          </button>
        </form>

        <Link to="/">Do you have an account? Sign in</Link>
      </div>
    </div>
  )
}

export default SignUp;