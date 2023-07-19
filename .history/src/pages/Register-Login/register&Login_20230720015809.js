import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { auth } from "../../firebaseconfig";
import { storage } from "../../firebaseconfig";
import { getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicIcon from "../../images/user.png";
import { db } from "../../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import logo2 from "../../images/logo_3.png";
import "./register&login.css";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";

function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const rgNo = e.target[2].value;
    const MbNo = e.target[3].value;
    const password = e.target[4].value;
    const DP = e.target[5].files[0];
    const storageid = new Date().getTime();
    const User = await createUserWithEmailAndPassword(auth, email, password);
    // await User.user.sendEmailVerification()
    console.log(User);
    const storageRef = ref(storage, `users/${storageid}`);
    await uploadBytesResumable(storageRef, DP).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(User.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", User.user.uid), {
            allRegisteredEvents: [],
            name: displayName,
            email,
            phone: MbNo,
            profilePic: downloadURL,
            regNo: rgNo,
          });
        } catch (err) {
          setErr(true);
        }
        navigate("/AndroidClub");
      });
    });
  };
  return (
    <div className="register">
      {/* <Navbar /> */}
      <div className="Login">
        <img src={logo2} className="backimg" alt="logo2"></img>
        <div className="FormBox FormBox1">
          <form onSubmit={(e) => HandleSubmit(e)}>
            <input type="text" placeholder="Name" required></input>
            <input type="email" placeholder="Email-ID" required></input>
            <input
              type="text"
              placeholder="Registration Number"
              required
            ></input>
            <input type="number" placeholder="Phone Number" required></input>
            <input type="password" placeholder="Password" required></input>
            <label htmlFor="Fl">
              <img
                alt="profilePic"
                src={ProfilePicIcon}
                style={{ height: "50px", alignSelf: "center" }}
              ></img>
              <p style={{ marginLeft: "5%" }}>Add Profile Photo</p>
            </label>
            <input
              id="Fl"
              type="file"
              placeholder="file"
              style={{ display: "none" }}
            ></input>
            <input type="submit" id="S" value="Register"></input>
            {err && (
              <span style={{ alignSelf: "center" }}>
                Something went wrong, Try Again
              </span>
            )}
            <p style={{ width: "26%", color: "black" }}>
              Have an Account?{" "}
              <b>
                <Link
                  style={{ marginLeft: "2%", textDecoration: "none" }}
                  to="/login"
                >
                  Login Now
                </Link>
              </b>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/AndroidClub");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="loginn">
      <Navbar />
      <div className="Login">
        {/* <img src={logo2} className="backimg" alt="backimg"></img> */}
        <div className="FormBox FormBox2">
          <form onSubmit={(e) => HandleSubmit(e)}>
            <input type="email" placeholder="Email-ID" required></input>
            <input type="password" placeholder="Password" required></input>
            <input type="submit" id="S" value="Login"></input>
            {err && (
              <span style={{ alignSelf: "center" }}>
                Email and Password combination wrong, Try Again
              </span>
            )}
            <p style={{ color: "black" }}>
              Don't have an Account? <br />{" "}
              <b>
                <Link style={{ textDecoration: "none" }} to="/Register">
                  Register Now
                </Link>
              </b>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export { Register, Login };
