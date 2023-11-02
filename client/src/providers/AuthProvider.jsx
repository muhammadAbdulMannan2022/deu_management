import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const emailPasswordSignup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logInUserEmailPassword = (email, password) => {
    setLoading(true);
    console.log(email, password);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutUser = () => {
    signOut(auth).then(() => {
      console.log("sign out success");
    });
  };
  //   set the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      console.log(loading);
      unsubscribe();
    };
  }, [user]);
  const AuthData = {
    user,
    loading,
    emailPasswordSignup,
    logInUserEmailPassword,
    logOutUser,
  };
  return (
    <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
