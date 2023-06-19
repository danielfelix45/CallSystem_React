import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiPlusCircle } from 'react-icons/fi';
import {AuthContext} from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import './style.css';

const listRef = collection(db, "customers");

function New(){
  const {user} = useContext(AuthContext);

  const [clients, setClients] = useState([]);
  const [loadClient, setLoadClient] = useState(true);
  const [clientSelected, setClientSelected] = useState(0);

  const [topic, setTopic] = useState('Support');
  const [status, setStatus] = useState('Open');
  const [complement, setComplement] = useState('');

  useEffect(() => {
    async function loadClients(){
      const querySnapshot = await getDocs(listRef)
      .then((snapshot) => {
        let list = [];

        // Passar os dados do banco de dados para lista.
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            companyName: doc.data().companyName,
          })
        })
        
        // Fazer verificação caso não encontre nenhum item.
        if(snapshot.docs.size === 0){
          console.log('No clients found!');
          setClients([{id: '1', companyNAme: 'Freela'}]);
          setLoadClient(false);
          return;
        }

        // Caso encontre algum item.
        setClients(list);
        setLoadClient(false);

      })
      .catch((error) => {
        console.log('Error fetching clients', error);
        setClients([{id: '1', companyNAme: 'Freela'}]);
        setLoadClient(false);
      })

    }

    loadClients();
  }, [])


  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  function handleChangeSelect(e){
    setTopic(e.target.value)
  }

  function handleChangeClient(e){
    setClientSelected(e.target.value);
    console.log(e.target.value)
  }

  return(
    <>
      <Header />

      <div className='content'>
        <Title name="New Call">
          <FiPlusCircle size={25} />
        </Title>

        <div className='container'>
          <form className='form-profile'>

            <label>Clients</label>
            {
              loadClient ? 
              ( <input type='text' disabled={true} value='Loading...' />) :
              (
                <select value={clientSelected} onChange={handleChangeClient}>
                  {clients.map((item, index) => {
                    return(
                      <option key={index} value={index}>
                        {item.companyName}
                      </option>
                    )
                  })}
                </select>
              )
            }

            <label>Topic</label>
            <select value={topic} onChange={handleChangeSelect}>
              <option value="Support">Support</option>
              <option value="Internal Visit">Internal Visit</option>
              <option value="Financial">Financial</option>
            </select>

            <label>Status</label>
            <div className='status'>
              <input 
                type="radio" 
                name='radio' 
                value="Open" 
                onChange={handleOptionChange} 
                checked={status === 'Open'} 
              />
              <span>Open</span>

              <input 
                type="radio" 
                name='radio' 
                value="Progress" 
                onChange={handleOptionChange} 
                checked={status === 'Progress'} 
              />
              <span>Progress</span>

              <input 
                type="radio" 
                name='radio' 
                value="Answered" 
                onChange={handleOptionChange} 
                checked={status === 'Answered'} 
              />
              <span>Answered</span>

            </div>

            <label>Complement</label>
            <textarea 
              type="text" 
              placeholder='Describe your problem(optional)...' 
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
            <button type='submit'>Register</button>

          </form>
        </div>

      </div>

    </>
  )
}

export default New;