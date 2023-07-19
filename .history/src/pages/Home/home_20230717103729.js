import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
// import logo1 from "../../images/logo_3.png"
import "./home.css";
import { useContext, useState } from "react";
import { Authcontext } from "../../contextProvider";
import Events from "./Events";

function Home() {
  const [vis, setVis] = useState("hidden");
  const { currentUser } = useContext(Authcontext);

  // const explore = () => {
  //     window.scrollTo({
  //         top: 730,
  //         behavior: 'smooth',
  //     });
  // }

  return (
    <div className="Home" id="H">
      {!currentUser && (
        <div
          className="PopUpWindow"
          onClick={() => {
            setVis("hidden");
          }}
          style={{ visibility: `${vis}` }}
        >
          <div className="PopUpForm">
            <p>
              Hey Learner!! <br></br>Login In or Register to Access all
              features.
            </p>
            <Link id="New" to="../login">
              Login
            </Link>
            <Link id="New1" to="../Register">
              Register
            </Link>
            <input
              className="CancelBtn"
              type="button"
              onClick={() => {
                setVis("hidden");
              }}
              value="Close"
            ></input>
          </div>
        </div>
      )}
      <Navbar />
      <svg
        className="logo_1"
        width="587"
        height="571"
        viewBox="0 0 587 571"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M671.736 204.688C658.481 177.958 626.117 166.916 599.288 180.22C572.46 193.524 561.483 225.938 574.82 252.831L675.497 455.847C688.671 482.413 721.313 493.603 748.207 480.267C774.904 467.027 785.719 434.286 772.544 407.72L671.704 204.377L671.376 204.539L671.736 204.688ZM102.847 437.975L259.117 752.764C273.511 781.789 308.067 793.461 336.568 779.327L371.431 762.038L424.779 869.613C438.116 896.507 470.529 907.484 497.095 894.31C523.661 881.136 534.474 848.804 521.759 822.092L468.411 714.517L533.776 682.102L587.124 789.677C600.51 816.669 632.89 827.581 659.456 814.407C686.448 801.021 697.327 768.656 683.828 741.435L630.48 633.859L665.836 616.326C694.369 602.176 705.878 567.456 691.76 538.988L535.133 223.15L101.404 438.608L102.748 438.023L102.847 437.975ZM371.62 184.958C361.453 190 349.187 185.867 344.145 175.7C339.185 165.697 343.269 153.333 353.404 148.225C363.571 143.183 375.918 147.481 380.878 157.484C385.92 167.651 381.787 179.916 371.62 184.958ZM172.868 283.521C162.701 288.563 150.436 284.43 145.394 274.263C140.4 264.194 144.517 251.896 154.685 246.854C164.852 241.812 177.199 246.109 182.322 256.44C187.445 266.771 183.921 278.04 173.491 283.212L172.868 283.521ZM334.97 8.13523C335.23 3.71563 331.753 0.495331 327.842 0.0241024C323.699 0.239735 320.251 3.17538 319.991 7.59497L316.456 86.9876C281.401 87.8223 245.338 96.5123 211.426 113.33C177.513 130.147 148.737 153.203 126.383 180.144L61.5194 134.548C58.1872 132.196 53.4202 133.048 51.1006 136.445C48.5527 139.548 49.5678 144.561 52.8682 146.602L117.145 191.344C67.5958 258.7 55.0787 346.348 92.3244 421.453L529.447 204.68C492.201 129.574 415.519 88.2455 331.977 86.8911L334.97 8.13523ZM30.469 462.017C3.67357 475.305 -7.25513 507.899 6.04924 534.727L106.759 737.808C120.096 764.702 152.608 775.548 179.502 762.211C206.199 748.972 217.209 716.542 203.872 689.649L103.195 486.633C89.939 459.904 57.5094 448.893 30.9436 462.068L30.469 462.017Z"
          fill="#4AF79D"
        />
      </svg>

      <div className="club-intro" style={{ backgroundSize: "cover" }}>
        <h1 className="heading">
          Welcome to <br></br>
          <div className="line2heading">
            {" "}
            Android Club.{" "}
            <marquee
              className="headingAnimation"
              behavior="scroll"
              direction="up"
              scrollamount="2"
            >
              {" "}
              Hackathons<br></br> Events<br></br> Webinars<br></br> And much
              more!!
            </marquee>
          </div>
        </h1>
        <div className="club-intro-div">
          <p className="club-intro-description">
            Android club VIT Bhopal is dedicated to educating and creating
            awareness about modern Mobile App development. We are driven to
            achieve excellence and solve problems while at it.
          </p>
        </div>
        <div className="main-btn">
          <button
            className="Explorebtn"
            onClick={() => {
              var elmntToView = document.getElementById("upcoming-events");
              elmntToView.scrollIntoView();
            }}
          >
            Explore
          </button>
        </div>
        <img src="../images/logo_3.png"></img>
      </div>
      <Events />
      <Footer />
    </div>
  );
}
export default Home;
