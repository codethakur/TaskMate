import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValiData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignUpForm = () => {
    setIsSignForm(!isSignInForm);
  };

  const handleOnClick = () => {
    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";
    const nameValue = !isSignInForm && name.current ? name.current.value : "";

    const message = checkValiData(emailValue, passwordValue, nameValue);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameValue,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              dispatch(
                addUser({
                  uid: user.uid,
                  email: user.email,
                  displayName: nameValue,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage("Error updating profile");
            });
        })
        .catch((error) => {
          handleAuthError(error);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          handleAuthError(error);
        });
    }
  };

  const handleAuthError = (error) => {
    const errorCode = error.code;
    let errorMessage = "something went wrong/User not found";
    switch (errorCode) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/user-disabled":
        errorMessage = "User account is disabled";
        break;
      case "auth/user-not-found":
        errorMessage = "User not found";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password";
        break;
      // Add more cases as needed
      default:
        break;
    }

    setErrorMessage(errorMessage);
  };

  return (
    <div>
      <Header />
      <div className="absolute"></div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" form m w-4/12 py-2 absolute p-12 my-28 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-20 shadow-slate-950 shadow-2xl"
      >
        <h1 className="font-bold text-3xl py-4 text-green-300">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="w-full p-4 my-4 bg-zinc-900 opacity-45 text-white rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="w-full p-4 my-4 bg-zinc-900 opacity-45 text-white font-semibold rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-4 my-4 bg-zinc-900 opacity-45 text-white font-bold rounded-md"
        />
        <p className="font-bold  text-green-300 p-2 rounded-sm mb-2 ">
          {errorMessage}
        </p>
        <button
          type="submit"
          className="mt-0 py-4 my-6 w-full bg-blue-900 hover:bg-blue-600 rounded-md text-xl"
          onClick={handleOnClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className=" font-bold py-4 cursor-pointer text-green-300"
          onClick={toggleSignUpForm}
        >
          {isSignInForm
            ? "New to Taskmate? Sign Up Now"
            : "Already registered? Sign in Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
