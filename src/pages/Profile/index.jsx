import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiSettings } from 'react-icons/fi';

function Profile(){
  return(
    <div>
      <Header />

      <div className='content'>
        <Title name="My Profile">
          <FiSettings size={24} />
        </Title>
      </div>

      <h1>Profile page</h1>
    </div>
  )
}

export default Profile;