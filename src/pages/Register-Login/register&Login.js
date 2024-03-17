import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable } from "firebase/storage";
import Navbar from "../../components/Navbar/Navbar"
import { useState } from "react";
import { auth } from '../../firebaseconfig';
import { storage } from "../../firebaseconfig";
import { getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicIcon from "../../images/user.png"
import { db } from "../../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import logo2 from "../../images/logo_3.png"
import "./register&login.css";
import { Helmet } from 'react-helmet'
import aclogo337 from "../../images/aclogo337-0mv-300h.png"
import ellipse1036 from "../../images/ellipse1036-cd3r-200h.png"
import image4328 from "../../images/image4328-hd6r-200h.png"
import image5336 from "../../images/image5336-ukkp-200w.png"
import image7311 from "../../images/image7311-7sep-700h.png"
import polygon1310 from "../../images/polygon1310-riur.svg"
import rectangle5334 from "../../images/rectangle5334-568t-1100h.png"
import rectangle5638 from "../../images/rectangle5638-cjas-800w.png"
import rectangle5739 from "../../images/rectangle5739-y1fp-900h.png"
import rectangle42332 from "../../images/rectangle42332-js0n-200w.png"
import rectangle43317 from "../../images/rectangle43317-vty-200h.png"
import rectangle44318 from "../../images/rectangle44318-c177-200h.png"
import rectangle45319 from "../../images/rectangle45319-6zq9-200h.png"

function Register() {
  const navigate = useNavigate();
  const redirectToGoogle = () => {
    window.location.href = "google-page.html";
  };

  const redirectToFacebook = () => {
    window.location.href = "facebook-page.html";
  };

  const redirectToGitHub = () => {
    window.location.href = "github-page.html";
  };


  const handleForgotPassword = () => {
    console.log("Forgot Password clicked");
  };

  const handleLogin = () => {
    console.log("Login clicked");
  };

  const handleSignUp = () => {
    console.log("Sign Up clicked");
  };

  const [err, setErr] = useState(false)
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value
    const email = e.target[1].value
    const rgNo = e.target[2].value
    const MbNo = e.target[3].value
    const password = e.target[4].value
    const DP = e.target[5].files[0]
    const storageid = new Date().getTime()
    const User = await createUserWithEmailAndPassword(auth, email, password)
    // await User.user.sendEmailVerification()
    console.log(User)
    const storageRef = ref(storage, `${storageid}`)
    await uploadBytesResumable(storageRef, DP)
      .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(User.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "users", User.user.uid), {
              allRegisteredEvents: [],
              name: displayName,
              email,
              phone: MbNo,
              profilePic: downloadURL,
              regNo: rgNo
            });
          }
          catch (err) {
            setErr(true)
          }
          navigate("/AndroidClub")
        })
      })


  }
  return (

    <div className="register">
      <div className="login">
        <div className="logo-container">
          <img src={logo2} alt="Club Logo" className="logo" />
        </div>
        <div className="form-box form-box1">
          <form onSubmit={(e) => HandleSubmit(e)}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email-ID" required />
            <input type="text" placeholder="Registration Number" required />
            <input type="number" placeholder="Phone Number" required />
            <input type="password" placeholder="Password" required />
            <label htmlFor="profilePic" className="profile-label">
              <img src={ProfilePicIcon} alt="Profile Icon" className="profile-icon" />
              <p className="profile-text">Add Profile Photo</p>
            </label>
            <input id="profilePic" type="file" style={{ display: 'none' }} />
            <input type="submit" id="submitBtn" value="Register" className="submit-btn" />
            <span id="error-msg" className="error-msg">Something went wrong, Try Again</span>
            <p>Have an Account? <b><Link to="/login">Login Now</Link></b></p>
          </form>
        </div>
      </div>
    </div>
  )
}

function Login() {

  const navigate = useNavigate()
  const [err, setErr] = useState(false)
  const handleForgotPassword = () => {
    console.log("Forgot Password clicked");
  };

  const handleLogin = () => {
    console.log("Login clicked");
  };
  const redirectToHome = () => {
    navigate("/AndroidClub"); // Replace "/home" with the desired path to your home page
  };

  const redirectToEvents = () => {
    navigate("/RegisteredEvents");
  };

  const redirectToContact = () => {
    window.location.href = "/ContactUs";
  };

  const redirectToAboutUs = () => {
    window.location.href = "/AboutUs";
  };
  const HandleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/AndroidClub")
    }
    catch (err) {
      setErr(true)
    }

  }
  return (
    <div className="home-container">
      <Helmet>
        <title>Login Page</title>
        <meta property="og:title" content="Giant Big Hearted Hare" />
      </Helmet>
      <div className="home-pro1619">
        <img
          src={rectangle5334}
          alt="Rectangle5334"
          className="home-rectangle53"
        />

        <div className="home-group25">
          <img
            src={rectangle5638}
            alt="Rectangle5638"
            className="home-rectangle56"
          />
          <img
            src={rectangle5739}
            alt="Rectangle5739"
            className="home-rectangle57"
          />
          <img
            src={polygon1310}
            alt="Polygon1310"
            className="home-polygon1"
          />
          <img
            src={image7311}
            alt="image7311"
            className="home-image7"
          />
        </div>
        <div className="home-group24">
          <div className="home-group"></div>
          <span className="home-text">
            <span>user login</span>
          </span>
          <span className="home-text02">
            <span>Hey, Enter your details and dive into the Android Club</span>
          </span>
          <div>

            <img
              src={rectangle43317}
              alt="Rectangle43317"
              className="home-rectangle43 input"

            />

          </div>
          <img
            src={rectangle44318}
            alt="Rectangle44318"
            className="home-rectangle44 input"
          />

          <button
            className="home-rectangle45 button"
            onClick={handleLogin}
          >

            <img className="home-rectangle69" src={rectangle45319} />
            <span className="home-text007">Login</span>
          </button>

          <span className="home-text04">

            <input type="text" className='home-input01' placeholder='Enter Email' />
            <span>

              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
          <span className="home-text06">
            <input type="text" className='home-input-02' placeholder='Password (at least 8 character)' />

          </span>
          <span className="home-text08">
            <span>LOGIN</span>
          </span>
          <span className="home-text10">
            <span>-Or Sign up with-</span>
          </span>

          <button
            className="home-text12 button"
            onClick={handleForgotPassword}
          >
            <span>Forgot Password?</span>
          </button>
          <div className="home-group20 button" onClick="redirectToGoogle()">
            <span className="home-text14">
              <button>
                <span>Google</span>
              </button>
            </span>
            <img
              src={image4328}
              alt="image4328"
              className="home-image4"
            />
          </div>
          <div className="home-group22 button" onClick="redirectToFacebook()">
            <span className="home-text16">
              <button>
                <span>Facebook</span>
              </button>
            </span>
            <img
              src={rectangle42332}
              alt="Rectangle42332"
              className="home-rectangle42"

            />
          </div>
          <div className="home-group21 button" onClick="redirectToGitHub()">
            <span className="home-text18">
              <button>
                <span>GitHub</span>
              </button>
            </span>
            <img
              src={image5336}
              alt="image5336"
              className="home-image5"
            />
          </div>
        </div>
        <a href="/AndroidClub">
          <img
            src={aclogo337}
            alt="AClogo337"
            className="home--clogo"
          />
        </a>
        <div className="home-group241">
          <span className="home-text20 button" onClick={() => redirectToHome()}>
            <button>
              <span>HOME</span>
            </button>
          </span>
          <span className="home-text22 button" onClick={() => redirectToEvents()}>
            <button>
              <span>EVENTS</span>
            </button>
          </span>

          <span className="home-text24 button" onClick={() => redirectToContact()}>
            <button>
              <span>CONTACT</span>
            </button>
          </span>
          <span className="home-text26 button" onClick={() => redirectToAboutUs()}>
            <button>
              <span>ABOUT US</span>
            </button>
          </span>
        </div>

      </div>
    </div>
  )
}
export { Register, Login }