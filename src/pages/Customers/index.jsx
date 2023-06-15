import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import {FiUser} from 'react-icons/fi';
import { db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';
import {toast} from 'react-toastify';

function Customers(){
  const [companyName, setCompanyName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [address, setAddress] = useState('');

  async function handleRegister(e){
    e.preventDefault();

    if(companyName !== '' && registrationNumber !== '' && address !== ''){
      await addDoc(collection(db, "customers"), {
        companyName: companyName,
        registrationNumber: registrationNumber,
        address: address,
      })
      .then(() => {
        setCompanyName('');
        setRegistrationNumber('');
        setAddress('');
        toast.success("Registered successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error when registering");
      })
    }else{
      toast.error("Fill in all fields");
    }
  }

  return(
    <div>
      <Header />

      <div className='content'>
        <Title name="Clients">
          <FiUser size={25} />
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={handleRegister}>
            <label>Tranding Name</label>
            <input 
              type="text" 
              placeholder='Company Name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label>Registration Number</label>
            <input 
              type="text" 
              placeholder='Company Name'
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <label>Address</label>
            <input 
              type="text" 
              placeholder='Company Name'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button type='submit'>Register</button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Customers;