import { useState, createContext, useEffect } from "react";
import {auth, db} from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setloadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser(){
      const storageUser = localStorage.getItem("@userData");

      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false);
      }

      setLoading(false);
    }

    loadUser();
  }, [])

  async function signIn(email, password) {
    setloadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      let data = {
        uid: uid,
        name: docSnap.data().name,
        email: value.user.email,
        avatarUrl: docSnap.data().avatarUrl
      }

      setUser(data);
      storageUser(data);
      setloadingAuth(false);
      toast.success("Welcome back!");
      navigate("/dashboard");
    })
    .catch((error) => {
      console.log( error );
      setloadingAuth(false);
      toast.error("Ops, something went wrong");
    })

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

  async function logOut(){
    await signOut(auth);
    localStorage.removeItem("@userData");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logOut,
        loadingAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;