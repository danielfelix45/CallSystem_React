import { useContext } from "react";
import avatarImg from '../../assets/avatar.png';
import { Link } from "react-router-dom";

import {AuthContext} from '../../contexts/auth';
import {FiHome, FiUser, FiSettings} from 'react-icons/fi';
import './style.css';

function Header() {
  const {user} = useContext(AuthContext);

  return(
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="user picture" />
      </div>

      <Link to="/dashboard">
        <FiHome color="#fff" size={24} />
        Calls
      </Link>

      <Link to="/customers">
        <FiUser color="#fff" size={24} />
        Clients
      </Link>

      <Link to="/profile">
        <FiSettings color="#fff" size={24} />
        Profile
      </Link>
    </div>
  )
}

export default Header;