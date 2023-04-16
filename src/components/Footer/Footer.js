import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Authcontext } from "../../contextProvider"
import "./Footer.css";


export const Footer = () => {
    const { currentUser } = useContext(Authcontext)

    return (
        <div className='reg'>
            <div className="footer">
                <footer>
                    <div className="footer-top">
                        <div className="email">
                            <i className="fa-solid fa-envelope"></i>
                            <Link to="mailto: androidclub@vitbhopal.ac.in" target="_blank">
                                <p>androidclub@vitbhopal.ac.in</p>
                            </Link>
                        </div>
                        <div className="socials">
                            {/* <p>www.avinashsingh.workset.in</p> */}
                            <Link to="https://www.linkedin.com/company/android-club-vit-bhopal/" target="_blank">
                                <i className="fa-brands fa-linkedin socials-icon ln"></i>
                            </Link>
                            <Link to="https://www.instagram.com/androidclub.vitb/" target="_blank">
                                <i className="fa-brands fa-instagram socials-icon insta"></i>
                            </Link>
                            <Link to="https://github.com/androidclubvitbhopal" target="_blank">
                                <i className="fa-brands fa-github socials-icon github"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="footer-mid">
                        <h5>Explore</h5>
                        <div className="footer-nav">
                            <Link to="/home">
                                <li>Home</li>
                            </Link>
                            <Link to="/AboutUs">
                                <li>About</li>
                            </Link>
                            <Link to="/OurProjects">
                                <li>Projects</li>
                            </Link>
                            {
                                currentUser && 
                                <Link to="/RegisteredEvents" style={{fontSize:'20px',marginLeft:'2%'}}>Registered Events</Link>
                            }
                            {
                                !currentUser && 
                                <Link to="/login">Login</Link>
                            }
                        </div>
                    </div>
                    <h3 className="footer-heading">ANDROID CLUB</h3>
                    <p className="footer-text">Enrich your life as a student || <Link style={{color: "white"}}
                        to="/AboutUs">Android club</Link></p>
                    <hr className="hr"/>
                        <p className="copyrights">© 2017 Android Club VIT Bhopal. All Rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}
