/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext= createContext();
const auth= getAuth(app);

const AuthProviders = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,SetLoading]=useState(true);

    const createUser=(email,password)=>{
        SetLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login=(email,password)=>{
        SetLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout=()=>{
        SetLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
      const unSubscribe=  onAuthStateChanged(auth, currentUser=>{
        const userEmail= currentUser?.email ||user?.email
        const loggedUser= {email:userEmail}
            setUser(currentUser);
            console.log('current user',currentUser);
            SetLoading(false);

            // if user exits issue a token 
            if(currentUser){
                
                axios.post( 'https://car-doctor-server-mu-seven.vercel.app/jwt' ,loggedUser , {withCredentials:true})
                .then(res=>{
                    console.log('token response', res.data);
                })
            }
            else{
                axios.post('https://car-doctor-server-mu-seven.vercel.app/logout',loggedUser, {withCredentials:true})
                .then(res=>{
                    console.log(res.data);
                })
            }

        });
        return ()=>{
            return unSubscribe();
        }
    },[])

    const authInfo={
            user,
            loading,
            createUser,
            login,
            logout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;