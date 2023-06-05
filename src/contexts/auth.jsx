import { useState, createContext } from "react";
import {auth, db} from '../services/firebaseConnection';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setloadingAuth] = useState(false);

  const navigate = useNavigate();

  function signIn(email, password) {
    console.log(email)
    console.log(password)
    alert("Logado com sucesso!")
  }

  //Cadastrar novo User
  async function signUp(name, email, password){
    setloadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      await setDoc(doc(db, "users", uid), {
        name: name,
        avatarUrl: null
      })
      .then( () => {
        
        let data = {
          uid: uid,
          name: name,
          email: value.user.email,
          avatarUrl: null
        };

        setUser(data);
        storageUser(data);
        setloadingAuth(false);
        toast.success("Welcome to System!")
        navigate("/dashboard")
      })

    })
    .catch((error) => {
      console.log(error);
      setloadingAuth(false);
    })
  }

  function storageUser(data){
    localStorage.setItem("@userData", JSON.stringify(data))
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;