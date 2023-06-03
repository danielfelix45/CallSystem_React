import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCyyaIM4oqcyyCX39shIf9kkGHHuhv5W1M",
  authDomain: "my-system-project-react.firebaseapp.com",
  projectId: "my-system-project-react",
  storageBucket: "my-system-project-react.appspot.com",
  messagingSenderId: "351232234102",
  appId: "1:351232234102:web:805e7550a4bec52b8bc557",
  measurementId: "G-SFQJZC1EFF"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};
