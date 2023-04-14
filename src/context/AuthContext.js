import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState();
    console.log("from auth: ", currentUser?.uid);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log(user);
        });
        return unsub;
    }, []);
    return (
    <AuthContext.Provider value={{currentUser, loading, setCurrentUser, setLoading}}>
        {children}
    </AuthContext.Provider>
    );
}