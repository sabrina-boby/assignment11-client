import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useEffect } from "react";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userCount, setUserCount] = useState(0);

  // when user registers, increment the count
  // const incrementUserCount = () => {
  //   setUserCount((prev) => prev + 1);
  // };
  // =============
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem("userCount"));
    if (!isNaN(savedCount)) {
      setUserCount(savedCount);
    }
  }, []);
  // =============
  const incrementUserCount = () => {
    setUserCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("userCount", newCount);
      return newCount;
    });
  };
  // =============
  //signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        incrementUserCount();
        return result;
      }
    );
  };
  //update user
  const updateUser = (updatedData) => {
    // console.log(updatedData);
    return updateProfile(auth.currentUser, updatedData);
  };
  //signIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //logOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  //observe
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log("Auth state change", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  //google sign in
  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        incrementUserCount();
        // console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const authInfo = {
    loading,
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    googleSignIn,
    updateUser,
    userCount,
  };
  // return <AuthContext value={authInfo}>{children}</AuthContext>;
    return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
