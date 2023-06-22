import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import './style.css'

// Aqui é a referência da query.
const listRef = collection(db, 'calls')

function Dashboard() {
  const { logOut } = useContext(AuthContext)

  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true) // Loading de quando está buscando todos os items.
  const [isEmpty, setIsEmpty] = useState(false) // Armazenar lista vazia de chamados.
  const [lastDocs, setlastDocs] = useState() // Armazenar último item da lista de Chamados.
  const [loadingMore, setLoadingMore] = useState(false) // Loading de quando tá buscando mais itens.

  useEffect(() => {
    async function loadCalls() {
      // Aqui a query que busca os dados que existem no banco de dados.
      const q = query(listRef, orderBy('created', 'desc'), limit(5))

      const querySnapshot = await getDocs(q)
      // Aqui é passado os dados pra função "updateState" que percorre os dados recebidos e passa pra useState "calls".
      await updateState(querySnapshot)

      setLoading(false)
    }

    loadCalls()

    return () => {}
  }, [])

  async function updateState(querySnapshot) {
    // Verifica se a lista de chamados está vazia.
    const isCollectionEmpty = querySnapshot.size === 0

    // Se a lista não estiver vazia entra aqui.
    if (!isCollectionEmpty) {
      let list = []

      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id,
          topic: doc.data().topic,
          client: doc.data().client,
          clientId: doc.data().clientId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complement: doc.data().complement
        })
      })

      // Variável que armazena o último item renderizado da lista.
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

      setCalls(calls => [...calls, ...list])
      setlastDocs(lastDoc)
    } else {
      // Se a lista estiver vazia entra aqui.
      setIsEmpty(true)
    }

    setLoadingMore(false)
  }

  async function handleMore() {
    setLoadingMore(true)

    // Aqui a query que guarda a requisição do banco de dados.
    const q = query(
      listRef,
      orderBy('created', 'desc'),
      startAfter(lastDocs),
      limit(5)
    )
    // Aqui faz a requisição.
    const querySnapshot = await getDocs(q)
    // Aqui passa os dados para a função updateState que irá percorrer a lista e mostrar na tela.
    await updateState(querySnapshot)
  }

  if (loading) {
    return (
      <>
        <Header />

        <div className="content">
          <Title name="Calls">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Looking for calls...</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="content">
        <Title name="Calls">
          <FiMessageSquare size={25} />
        </Title>

        <>
          {calls.length === 0 ? (
            <div className="container dashboard">
              <span>No calls found...</span>
              <Link to="/new" className="new-call">
                <FiPlus color="#fff" size={25} />
                New call
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className="new-call">
                <FiPlus color="#fff" size={25} />
                New call
              </Link>

              <table>
                <thead>
                  <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Status</th>
                    <th scope="col">Registered at</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {calls.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Client">{item.client}</td>
                        <td data-label="Subject">{item.topic}</td>
                        <td data-label="Status">
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                item.status === 'Open' ? '#5CB85C' : '#999'
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Registered">{item.createdFormat}</td>
                        <td data-label="#">
                          <button
                            className="action"
                            style={{ backgroundColor: '#3583F6' }}
                          >
                            <FiSearch color="#fff" size={17} />
                          </button>
                          <Link
                            to={`/new/${item.id}`}
                            className="action"
                            style={{ backgroundColor: '#F6A935' }}
                          >
                            <FiEdit2 color="#fff" size={17} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {loadingMore && <h3>Looking for more calls...</h3>}
              {!loadingMore && !isEmpty && (
                <button className="btn-more" onClick={handleMore}>
                  Search more
                </button>
              )}
            </>
          )}
        </>
      </div>
    </>
  )
}

export default Dashboard
