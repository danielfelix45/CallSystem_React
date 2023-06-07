import { useContext } from "react";
import {AuthContext} from '../../contexts/auth';

function Dashboard() {
  const {logOut} = useContext(AuthContext);

  async function handleLogout(){
    await logOut();
  }

  return(
    <div>
      <h1>Página Dashboard</h1>
      <button onClick={handleLogout}>Leave</button>
    </div>
  )
}

export default Dashboard;