import { useContext } from "react";
import {AuthContext} from '../../contexts/auth';

import Header from "../../components/Header";
import Title from '../../components/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";

import { Link } from "react-router-dom";

import './style.css';

function Dashboard() {
  const {logOut} = useContext(AuthContext);

  async function handleLogout(){
    await logOut();
  }

  return(
    <div>
      <Header />

      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>

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
              <tr>
                <td data-label="Client">Felix Company</td>
                <td data-label="Subject">Support</td>
                <td data-label="Status">
                  <span className="badge" style={{backgroundColor: '#999'}}>
                    Open
                  </span>
                </td>
                <td data-label="Registered">15/06/2023</td>
                <td data-label="#">
                  <button className="action" style={{backgroundColor: '#3583F6'}}>
                    <FiSearch color="#fff" size={17} />
                  </button>
                  <button className="action" style={{backgroundColor: '#F6A935'}}>
                    <FiEdit2 color="#fff" size={17} />
                  </button>
                </td>
              </tr>

              <tr>
                <td data-label="Client">Felix Barber Shop</td>
                <td data-label="Subject">Support</td>
                <td data-label="Status">
                  <span className="badge" style={{backgroundColor: '#999'}}>
                    Open
                  </span>
                </td>
                <td data-label="Registered">15/06/2023</td>
                <td data-label="#">
                  <button className="action" style={{backgroundColor: '#3583F6'}}>
                    <FiSearch color="#fff" size={17} />
                  </button>
                  <button className="action" style={{backgroundColor: '#F6A935'}}>
                    <FiEdit2 color="#fff" size={17} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>

      </div>

      <button onClick={handleLogout}>Leave</button>
    </div>
  )
}

export default Dashboard;