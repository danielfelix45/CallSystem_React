import { useContext, useState } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';

import {AuthContext} from '../../contexts/auth';
import { FiSettings, FiUpload } from 'react-icons/fi';

import './style.css';

function Profile(){
  const {user} = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  return(
    <div>
      <Header />

      <div className='content'>
        <Title name="My Profile">
          <FiSettings size={24} />
        </Title>

        <div className='container'>
          <form className='form-profile'>
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size={25} />
              </span>

              <input type="file" accept='image/*' /> <br />
              {avatarUrl === null ? 
              (<img src={avatar} alt="Foto de perfil" width={250} height={250} />) : 
              (<img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />)
              }
            </label>

            <label>Name</label>
            <input type="text" placeholder='Your name...' />
            <label>Email</label>
            <input type="text" placeholder='test@test.com' disabled={true} />

            <button type='submit'>Save</button>

          </form>
        </div>

        <div className="container">
          <button className='logout-btn'>Leave</button>
        </div>

      </div>

    </div>
  )
}

export default Profile;