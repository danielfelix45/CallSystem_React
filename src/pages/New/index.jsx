import { useState, useEffect, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiPlusCircle } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc
} from 'firebase/firestore'
import { toast } from 'react-toastify'

import { useParams, useNavigate } from 'react-router-dom'

import './style.css'

const listRef = collection(db, 'customers')

function New() {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [clients, setClients] = useState([])
  const [loadClient, setLoadClient] = useState(true)
  const [clientSelected, setClientSelected] = useState(0)
  const [idClient, setIdClient] = useState(false)

  const [topic, setTopic] = useState('Support')
  const [status, setStatus] = useState('Open')
  const [complement, setComplement] = useState('')

  useEffect(() => {
    console.log(id)
    async function loadClients() {
      const querySnapshot = await getDocs(listRef)
        .then(snapshot => {
          let list = []

          // Passar os items(clientes) do banco de dados para lista.
          snapshot.forEach(doc => {
            list.push({
              id: doc.id,
              companyName: doc.data().companyName
            })
          })

          // Fazer verificação caso não encontre nenhum item.
          if (snapshot.docs.size === 0) {
            console.log('No clients found!')
            setClients([{ id: '1', companyNAme: 'Freela' }])
            setLoadClient(false)
            return
          }

          // Caso encontre algum item.
          setClients(list)
          setLoadClient(false)

          // Editar chamado (Se tiver id, chama a função loadId).
          if (id) {
            loadId(list)
          }
        })
        .catch(error => {
          console.log('Error fetching clients', error)
          setClients([{ id: '1', companyNAme: 'Freela' }])
          setLoadClient(false)
        })
    }

    loadClients()
  }, [id])

  // Função que faz a edição de um chamado.
  async function loadId(list) {
    // Nesta variável coloca o caminho do documento.
    const docRef = doc(db, 'calls', id)
    // Aqui busca o documento.
    await getDoc(docRef)
      .then(snapshot => {
        setTopic(snapshot.data().topic)
        setStatus(snapshot.data().status)
        setComplement(snapshot.data().complement)

        // Aqui filtrar o cliente pra selecionar ele na lista.
        let index = list.findIndex(item => item.id === snapshot.data().clientId)
        // Aqui selecionar o cliente.
        setClientSelected(index)
        setIdClient(true)
      })
      .catch(error => {
        console.log(error)
        setIdClient(false)
      })
  }

  async function handleRegister(e) {
    e.preventDefault()

    if (idClient) {
      const docRef = doc(db, 'calls', id)
      await updateDoc(docRef, {
        client: clients[clientSelected].companyName,
        clientId: clients[clientSelected].id,
        topic: topic,
        complement: complement,
        status: status,
        userId: user.uid
      })
        .then(() => {
          toast.info('Call updated successfully!')
          setClientSelected(0)
          setComplement('')
          navigate('/dashboard')
        })
        .catch(error => {
          toast.error('Oops, error updating the call')
          console.log(error)
        })

      return
    }

    // Registrar um chamado
    await addDoc(collection(db, 'calls'), {
      created: new Date(),
      client: clients[clientSelected].companyName,
      clientId: clients[clientSelected].id,
      topic: topic,
      complement: complement,
      status: status,
      userId: user.uid
    })
      .then(() => {
        toast.success('Registered successfully!')
        setClientSelected(0)
        setComplement('')
      })
      .catch(error => {
        toast.error('Oops, error registering, try again later')
        console.log(error)
      })
  }

  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  function handleChangeSelect(e) {
    setTopic(e.target.value)
  }

  function handleChangeClient(e) {
    setClientSelected(e.target.value)
  }

  return (
    <>
      <Header />

      <div className="content">
        <Title name={id ? 'Editing Call' : 'New Call'}>
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clients</label>
            {loadClient ? (
              <input type="text" disabled={true} value="Loading..." />
            ) : (
              <select value={clientSelected} onChange={handleChangeClient}>
                {clients.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.companyName}
                    </option>
                  )
                })}
              </select>
            )}

            <label>Topic</label>
            <select value={topic} onChange={handleChangeSelect}>
              <option value="Support">Support</option>
              <option value="Internal Visit">Internal Visit</option>
              <option value="Financial">Financial</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Open"
                onChange={handleOptionChange}
                checked={status === 'Open'}
              />
              <span>Open</span>

              <input
                type="radio"
                name="radio"
                value="Progress"
                onChange={handleOptionChange}
                checked={status === 'Progress'}
              />
              <span>Progress</span>

              <input
                type="radio"
                name="radio"
                value="Answered"
                onChange={handleOptionChange}
                checked={status === 'Answered'}
              />
              <span>Attended</span>
            </div>

            <label>Complement</label>
            <textarea
              type="text"
              placeholder="Describe your problem(optional)..."
              value={complement}
              onChange={e => setComplement(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default New
