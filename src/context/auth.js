import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";


const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [auth,setAuth] =useState({
        user:null,
        token:"",
    });  ///   global variable banavyo


    axios.defaults.headers.common['Authorization'] = auth?.token;
    
useEffect(()=>{   /// data fatch karvano local store mathi 
    const data = localStorage.getItem('auth');
    if(data){
        const parseData = JSON.parse(data) // json ma convert karva

        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token
        })
    }
   //eslint-disable-next-line
},[])

    return(
        <AuthContext.Provider value={[auth, setAuth]}>
        {children}
      </AuthContext.Provider>
    );
};


// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
