import { FiX } from 'react-icons/fi'
import './style.css'

function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX color="#fff" size={25} />
          Close
        </button>

        <main>
          <h2>Call details</h2>

          <div className="row">
            <span>
              Client: <i>{conteudo.client}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Topic: <i>{conteudo.Topic}</i>
            </span>
            <span>
              Registered at: <i>{conteudo.createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status:
              <i
                className="status-badge"
                style={{
                  color: '#fff',
                  backgroundColor:
                    conteudo.status === 'Open' ? '#5CB85C' : '#999'
                }}
              >
                {conteudo.status}
              </i>
            </span>
          </div>

          {conteudo.complement !== '' && (
            <>
              <h3>Complement:</h3>
              <p>{conteudo.complement}</p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Modal
