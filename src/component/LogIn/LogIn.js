import React, { useState ,useContext} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory,useLocation } from 'react-router';
import './logIn.css';
import facebook from '../LogIn/logo/facebook.png';
import google from '../LogIn/logo/google.png';

const LogIn = () => {
    const history= useHistory();
    const location=useLocation();
    const {from} =location.state || {from:{pathname:'/'}}
    const[loggedInUser,setLoggedInUser]= useContext(UserContext);
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const [newUser, setNewUser] = useState(true)
    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        confirmPassword:''

    })
    console.log(user.email, user.password);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    // const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { email, photoURL, displayName } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL

                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                console.log(email, photoURL, displayName);
                history.replace(from);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }

    const handleFbSignIn = () => {
        firebase
          .auth()
          .signInWithPopup(fbProvider)
          .then(res => {
            const { email, photoURL, displayName } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL

            }
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            console.log(email, photoURL, displayName);
            history.replace(from);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
      }
       
    const handleBlur = (event) => {
        let isFormValid = true;
        if (event.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasValid = /\d{1}/.test(event.target.value);
            // console.log(isPasswordHasValid && isPasswordHasValid);
            isFormValid = isPasswordValid && isPasswordHasValid;

        }
        if (isFormValid) {
            let newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (!newUser && user.email && user.password === user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log(res)
                    console.log(res);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(error.message);
                    // ..
                });
        }
        if (newUser && user.email && user.password ) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    console.log(res)
                    console.log(res);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(function (error) {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(error.message);
                    // ..
                })
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // Update successful.
            console.log("UserName Update Successfully");
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }
    return (
        <div>
            <div className="form-validationArea">
                <form action="" onSubmit={handleSubmit}>
                    {!newUser && <input type="text" name="" placeholder="Enter Name" onBlur={handleBlur} id="" />}<br/><br/>
                    <input type="email" name="email" onBlur={handleBlur} placeholder="Your Email Address" required /><br/><br/>
                    <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required /><br /><br/>
                  {!newUser && <input type="password" onBlur={handleBlur} name="confirmPassword" id="" placeholder="Confirm Password" required />}<br />
                  
                  <br/>
                  <input   className="btn btn-danger" type="submit" value={newUser ? 'Sign In' : 'Sign Up'}/>
                </form>

                {<label htmlFor="newUser">Don't have a Account ?</label>}
                <button className="btn btn-primary" onClick={() => setNewUser(!newUser)} name="newUser">logIn</button>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logIn'} Successfully</p>}

            </div>
            <div className="logo-area">
                <button onClick={handleFbSignIn} className="logo-area"><img src={facebook} alt=""/> </button>
                <button onClick={handleGoogleSignIn} className="logo-area"><img src={google} alt=""/> </button>
                 
            </div>

        </div>
    );
};

export default LogIn;