
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
       getAuth,
       signInWithEmailAndPassword,
       signOut} from "firebase/auth"
import { addDoc,
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCtNtABKrgbN6XGa3JK5lD3pQZVsa97V5I",
  authDomain: "netflix-clone-de008.firebaseapp.com",
  projectId: "netflix-clone-de008",
  storageBucket: "netflix-clone-de008.appspot.com",
  messagingSenderId: "410984227617",
  appId: "1:410984227617:web:a9d6f61ab311e0c6c61460",
  measurementId: "G-X8JT98WC1Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name,email,password)=>{
    try {   

       const res = await createUserWithEmailAndPassword(auth,email,password)
       const user = res.user
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login =  async (email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () =>{
   try {
     signOut(auth)
   } catch (error) {
    console.log(error);
    alert(error)
   } 
}

export {auth,db,login,signup,logout}