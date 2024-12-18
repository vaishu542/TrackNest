import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
               
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setUserDetails(userDoc.data());
                } else {
                    setUserDetails({
                        name: user.displayName || "",
                        email: user.email || "",
                        photoURL: user.photoURL || "",
                    });
                }
            } else {
                setUserDetails(null); 
            }
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
