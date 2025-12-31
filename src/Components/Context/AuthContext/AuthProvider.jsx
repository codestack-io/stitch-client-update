import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useState } from 'react';


const googleProvider = new GoogleAuthProvider()

const authProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const[loading,setLoading] = useState(true)

   const registerUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email, password)
   }
   const signInUser =(email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email, password)
   }
  
   const signInGoogle= () =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
   }

  useEffect (()=>{

   },[])

    const authInfo = {
        user,
        loading,
        registerUser,
         signInUser,
         signInGoogle


    }
    return (
      <AuthContext value={authInfo}>
        {children}
      </AuthContext>
    );
};

export default authProvider;