import { useContext, useState } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';

import {AuthContext} from '../../contexts/auth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import {db, storage} from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import './style.css';
import { toast } from 'react-toastify';

function Profile(){
  const {user, storageUser, setUser, logOut} = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(e){
    if(e.target.files[0]){
      const image = e.target.files[0];

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      }else{
        alert("Upload a JPEG or PNG type image");
        setAvatarUrl(null);
        return;
      }

    }
  }

  async function handleUpload(){
    const currentUid = user.uid;

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
    const uploadTask = uploadBytes(uploadRef, imageAvatar)
    .then( (snapshot) => {
      getDownloadURL(snapshot.ref).then(async (dowloadURL) => {
        let urlFoto = dowloadURL;

        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          name: name,
        })
        .then(() => {
          let data = {
            ...user,
            name: name,
            avatarUrl: urlFoto,
          }

          setUser(data);
          storageUser(data);
          toast.success('Successfully updated!')
        })
      })
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
    
    if(imageAvatar === null && name !== ''){
      //Atualizar apenas o nome
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, {
        name: name,
      })
      .then(() => {
        let data = {
          ...user,
          name: name,
        }

        setUser(data);
        storageUser(data);
        toast.success('Successfully updated!')
      })

    }else if(name !== '' && imageAvatar !== null){
      // Atualizar nome e foto
      handleUpload()
    }

  }

  return(
    <div>
      <Header />

      <div className='content'>
        <Title name="My Profile">
          <FiSettings size={24} />
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={handleSubmit}>
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size={25} />
              </span>

              <input type="file" accept='image/*' onChange={handleFile} /> <br />
              {avatarUrl === null ? 
              (<img src={avatar} alt="Foto de perfil" width={250} height={250} />) : 
              (<img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />)
              }
            </label>

            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type='submit'>Register</button>

          </form>
        </div>

        <div className="container">
          <button className='logout-btn' onClick={() => logOut()}>Leave</button>
        </div>

      </div>

    </div>
  )
}

export default Profile;