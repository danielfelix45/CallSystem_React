import { useContext } from "react";
import {AuthContext} from '../../contexts/auth';

import Header from "../../components/Header";

function Dashboard() {
  const {logOut} = useContext(AuthContext);

  async function handleLogout(){
    await logOut();
  }

  return(
    <div>
      <Header />

      <h1>Página Dashboard</h1>
      <button onClick={handleLogout}>Leave</button>
    </div>
  )
}

export default Dashboard;