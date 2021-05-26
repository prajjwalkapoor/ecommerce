import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { authContext } from "./context/AuthContext";

function SignInScreen() {
  const { uiConfig, isSignedIn } = useContext(authContext);
  if (!isSignedIn) {
    return (
      <div className="half-background">
        &nbsp;
        <div className="authContainer">
          <h1>Sign In or Register</h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="half-background">
          &nbsp;
          <div className="authContainer">
            <img
              className="avatar"
              src={firebase.auth().currentUser.photoURL}
              alt=""
            />
            <h1>This is your Dashboard</h1>
            <p>
              Welcome {firebase.auth().currentUser.displayName}! You are now
              signed-in!
            </p>
            <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
          </div>
        </div>
      </>
    );
  }
}

export default SignInScreen;
