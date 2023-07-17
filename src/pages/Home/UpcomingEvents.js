import React from "react";
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { getDocs, doc } from "firebase/firestore";
import { Authcontext } from "../../contextProvider";
import gif from "../../images/android_gif.gif";
import gif2 from "../../images/gif2.webp";
import groupimg from "../../images/groupimg.jpg";
import logo2 from "../../images/logo_background.png";
import homeBg from "../../images/home-bg.png";
import { Link, useNavigate } from "react-router-dom";
import "./UpcomingEvents.css";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const [UEvent, setUEvent] = useState([]);
  const [CEvent, setCEvent] = useState([]);

  const [UserDetails, setDetails] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [vis, setVis] = useState("hidden");
  const [detailsVis, setDetailsVis] = useState(false);
  const { currentUser } = useContext(Authcontext);
  const { Evpayment, setEvPay } = useContext(Authcontext);
  const [j, setj] = useState(null);
  let p = 0;
  const eventsRef = collection(db, "events");
  const usersRef = collection(db, "users");

  const FetchUserDetails = async () => {
    const q = query(usersRef, where("email", "==", currentUser.email));
    const temp = [];
    const querySnapShot = await getDocs(q);
    try {
      querySnapShot.forEach((doc) => {
        temp.push(doc.data());
      });
      setDetails({
        email: temp[0].email,
        name: `${temp[0].name}`,
        paymentVerified: "N",
        phone: `${temp[0].phone}`,
        regNo: `${temp[0].regNo}`,
        paymentImgURL: "",
        location: "",
      });
      setUserEvents(temp[0].allRegisteredEvents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchEvents();
    FetchUserDetails();
  }, []);

  useEffect(() => {
    if (UEvent[0] != null) {
      setj(true);
    }
    console.log(j);
  }, [UEvent]);

  useEffect(() => {
    p = p + 1;
    console.log(p);
  }, [UserDetails]);

  const HandleInit = (Event) => {
    setEvPay(Event);
    navigate("/Payments");
  };
  const HandleUpcomingClick = (Event, mode) => {
    setDetailsVis(mode);
  };
  const HandleRegister = async (EventName) => {
    setVis("visible");
    let k = false;
    const q = query(
      eventsRef,
      where("notificationGroup", "==", `${EventName}`)
    );
    const querySnapShot = await getDocs(q);
    const temp = [];
    try {
      querySnapShot.forEach((doc) => {
        temp.push(doc.data());
      });
      // setEv(temp)
      let RegEmails = temp[0]["Registered Emails"];
      for (let i = 0; i < RegEmails.length; i++) {
        if (RegEmails[i] == `${currentUser.email}`) {
          k = true;
        }
      }
      if (k) {
        alert("You have Already Registered for this Event");
        navigate("/RegisteredEvents");
      } else if (!k) {
        RegEmails = [...RegEmails, `${currentUser.email}`];
        let RegInfo = temp[0]["Registered Users"];
        RegInfo = [...RegInfo, UserDetails];
        console.log(UserDetails);
        let UserEvents = userEvents;
        UserEvents = [...UserEvents, `${temp[0].notificationGroup}`];
        await updateDoc(doc(db, "events", EventName), {
          "Registered Emails": RegEmails,
          "Registered Users": RegInfo,
        }).then(async () => {
          await updateDoc(doc(db, "users", currentUser.uid), {
            allRegisteredEvents: UserEvents,
          });
        });
        navigate("/RegisteredEvents");
        alert(`Registered for ${EventName}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const FetchEvents = async () => {
    const q1 = query(eventsRef, where("completion", "==", false));
    const temp1 = [];
    const querySnapShot1 = await getDocs(q1);
    try {
      querySnapShot1.forEach((doc) => {
        temp1.push(doc.data());
      });
      setUEvent(temp1);
    } catch (err) {
      console.log(err);
    }
    const q2 = query(eventsRef, where("completion", "==", true));
    const temp2 = [];
    const querySnapShot2 = await getDocs(q2);
    try {
      querySnapShot2.forEach((doc) => {
        temp2.push(doc.data());
      });
      setCEvent(temp2);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="upcoming-events" id="upcoming-events">
        <p className="upcoming-events-heading">
          Upcoming <br /> Events
        </p>
        <div className="upcoming-events-container">
          {j &&
            UEvent.map((Events) => (
              <div key={Math.random()} className="upcoming-event-block">
                <div
                  className="upcoming-event-area"
                  onClick={() => {
                    HandleUpcomingClick(Events, true);
                  }}
                >
                  <div className="upcoming-event-info">
                    <img
                      src={Events.bannerURL}
                      className="upcoming-event-img"
                      alt="eventImg"
                    />{" "}
                    <br />
                    <div className="upcoming-event-name">{Events.name}</div>
                    <div className="upcoming-events-details">
                      {currentUser && Events.price === 0 && (
                        <button
                          className="RegisterBtn"
                          onClick={() => {
                            HandleRegister(Events.notificationGroup);
                          }}
                        >
                          <span type="text">Register</span>
                        </button>
                      )}
                      {currentUser && Events.price !== 0 && (
                        <button
                          className="RegisterBtn"
                          onClick={() => {
                            HandleInit(Events);
                          }}
                        >
                          <span type="text">Register</span>
                        </button>
                      )}
                      <p className="upcoming-event-date">
                        {Events.date} -- {Events.time}
                      </p>

                      {/* <p className="upcoming-event-description">{Events.description}</p> */}
                    </div>
                  </div>
                </div>
                {detailsVis ? (
                  <div
                    className="upcoming-event-details-popup-block"

                  // style={{ visibility: `${detailsVis}` }}
                  >
                    <div className="upcoming-event-details-popup">
                      <button
                        type="button"
                        className="btn-close close-button"
                        aria-label="Close"
                        onClick={() => {
                          HandleUpcomingClick(Events, false);
                        }}
                      ></button>

                      <div className="upcoming-event-info-popup">
                        <div className="left-section">
                          <img
                            src={Events.bannerURL}
                            className="upcoming-event-img-popup"
                            alt="eventImg"
                          />
                          <div className="register-block">
                            {currentUser && Events.price === 0 && (
                              <button
                                className="RegisterBtn-popup"
                                onClick={() => {
                                  HandleRegister(Events.notificationGroup);
                                }}
                              >
                                <span type="text">Register</span>
                              </button>
                            )}
                            {currentUser && Events.price !== 0 && (
                              <button
                                className="RegisterBtn-popup"
                                onClick={() => {
                                  HandleInit(Events);
                                }}
                              >
                                <span type="text">Register</span>
                              </button>
                            )}
                          </div>{" "}
                        </div>
                        <br />
                        <div className="upcoming-events-details-popup-inside">
                          <h1 className="upcoming-event-name-popup">
                            {Events.name}
                          </h1>
                          <p className="upcoming-event-date">{Events.date} -- {Events.time}</p>
                          <p className="upcoming-event-location">
                            {" "}
                            Venue: {Events.location}
                          </p>
                          <p className="upcoming-event-time">
                            {Events.description}
                          </p>

                          {/* <p className="upcoming-event-description">{Events.description}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          {!j && (
            <div
              className="Event"
              onClick={() => {
                setVis("visible");
              }}
              style={{ background: "green" }}
            >
              <p className="EventName">
                No Events Scheduled as of Now <br></br>Come back later!!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;