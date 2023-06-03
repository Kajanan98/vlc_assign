import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const usersCollection = firestore().collection("Users");

  console.log(user);
  function onAuthStateChanged(user) {
    setUser(user);
    setIsLoggedIn(user && user.email ? true : false);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signup = (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userData) => {
        console.log("User account created & signed in!");
        setUserDetails(data);
        firestore()
          .collection("Users")
          .doc(userData.user.uid)
          .set({
            firstName: data.firstName,
            lastName: data.lastName,
          })
          .then(() => {
            console.log("User added!");
          });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  const login = (data) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userData) => {
        console.log("User signed in!", userData.user.uid);
        firestore()
          .collection("Users")
          .doc(userData.user.uid)
          .get()
          .then((userDetails) => {
            if (userDetails.exists) {
              setUserDetails(userDetails.data());
              console.log(userDetails.data());
              console.log("User data fetched!");
            } else {
              console.log("User data Not Found!");
            }
          });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          console.log(
            "The password is invalid or the user does not have a password."
          );
        }
        if (error.code === "auth/user-not-found") {
          console.log("There is no user record corresponding to this email.");
        }
        console.error(error);
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
    setIsLoggedIn(false);
  };

  const deleteAccount = () => {
    let currentUser = auth().currentUser;
    firestore()
      .collection("Users")
      .doc(user.uid)
      .delete()
      .then(() => {
        console.log("User data deleted!");
        currentUser
          .delete()
          .then(() => console.log("User deleted"))
          .catch((error) => console.log(error));
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        userDetails,
        signup,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
