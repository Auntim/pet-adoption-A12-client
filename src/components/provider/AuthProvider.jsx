
import React, { createContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    updateProfile
} from 'firebase/auth';
// import axios from 'axios';
import { auth } from '../../firebase/firebase.config';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

function AuthProviders({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('private route user', user)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };
    const updateuser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('state capture', currentUser?.email)
            if (currentUser?.email) {
                const user = { email: currentUser.email };

                // axios.post('http://localhost:5173/jwt', user, { withCredentials: true })
                //     .then(res => {
                //         console.log('login token', res.data);
                //         setLoading(false);
                //     })
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const userInfo = {
        user,
        loading,
        setUser,
        createUser,
        signInUser,
        googleSignIn,
        logout,
        updateuser
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProviders;