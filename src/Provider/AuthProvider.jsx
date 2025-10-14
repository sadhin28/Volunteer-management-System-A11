import { createContext, useEffect, useState } from "react";
export const AuthContext=createContext();


import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../component/firebase/firebase.config";


const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);
    
     const [loading, setLoading] = useState(true);

    // Create a new user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login an existing user
    const Login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Set up auth state listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Google sign-in provider
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };
    //password reset email

    const passReset = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    // Logout the user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Profile update
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        }).then(() => {

            setUser({
                ...auth.currentUser,
                displayName: name,
                photoURL: photo,
            });
        });
    };
  
    const authInfo={
        createUser,
        Login,
        user,
        logOut,
        loading,
        signInWithGoogle,
        updateUserProfile,
        passReset
    }
    
    return (
       <AuthContext.Provider value={authInfo}>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;