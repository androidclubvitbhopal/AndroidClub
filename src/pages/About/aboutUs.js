import Navbar from "../../components/Navbar/Navbar"
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { getDocs } from "firebase/firestore";
import "./about.css"
import { Footer } from "../../components/Footer/Footer";

function AboutUs() {
    const [team, setTeam] = useState([])

    const usersRef = collection(db, "team");
    const FetchEvents = async () => {
        const q = query(usersRef)
        const temp = []
        const querySnapShot = await getDocs(q)
        try {
            querySnapShot.forEach((doc) => {
                temp.push(doc.data())
            })
            setTeam(temp)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        FetchEvents()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="About">
            <Navbar className="navbar-about" />
            <div className="about-club">
                <h1>Welcome to <br /> Android club VIT Bhopalll </h1> <br />
                {/* <h1>Android club VIT Bhopal </h1> <br /> */}
                <p>
                    Welcome to the Android club for students of Vit Bhopal. Our club is dedicated to promoting the learning and development of Android app development among our members. We provide a platform for students to learn about the latest trends and technologies in the Android world, share their knowledge and experiences, and collaborate on exciting projects. <br /> <br />
                    <strong>Membership:</strong> <br />
                    Membership is open to all students of our college who are interested in Android app development. You don't need any prior experience in Android development to join our club. We welcome students from all backgrounds who are enthusiastic about learning and growing with us. <br /> <br />

                    <strong>Activities and Events:</strong><br />
                    We organize a variety of activities and events throughout the academic year to help our members learn and grow. <br /> Our events include: <br /> <br />

                    Workshops: <br /> We host workshops on various topics related to Android development, such as UI design, Android Studio, app development frameworks, etc. These workshops are designed to help beginners get started with Android app development and to help more experienced developers enhance their skills. <br /> <br />

                    Hackathons: <br /> We organize hackathons where members can work together to create innovative Android apps. These events are a great opportunity to collaborate with like-minded individuals and showcase your skills. <br /> <br />

                    Guest Lectures: <br /> We invite industry experts and seasoned professionals to speak on topics related to Android development. These lectures provide valuable insights into the latest trends and best practices in the industry. <br /> <br />

                    Code Sprints: We organize code sprints where members can work on open-source Android projects. These events are a great opportunity to contribute to the community while learning from experienced developers. <br /> <br />

                    <strong>Club Achievements:</strong><br />
                    Our club has won several awards and accolades for our contributions to the Android development community. We have developed several Android apps that have been featured on the Play Store and have been downloaded by thousands of users worldwide. Our members have also won several coding competitions and hackathons. <br /> <br />

                    <strong>Leadership:</strong><br />
                    Our club is led by a team of passionate and dedicated students who are committed to promoting the learning and development of Android app development among our members. Our leadership team includes: <br /> <br />

                    President: [Name] <br />
                    Vice-President: [Name] <br />
                    Treasurer: [Name] <br /> <br />
                    <strong>Call to action:</strong> <br />
                    If you are interested in joining our club or have any questions, please don't hesitate to get in touch with us. You can reach us at [Email Address] or [Social Media Handles]. We look forward to hearing from you!
                </p>
            </div>
                <h1 className="meet-team-heading">Meet the Team</h1>
            <div className="teams">
                {
                    team.map((data) => (
                        <div key={Math.random()} className="team">
                            <div className="team-member-info" >
                                <p className="photo"><b></b> <img src={data.photo} alt="" className="team-member-img" /> </p>
                                <p className="team-member-name">{data.name}</p>
                                <p className="team-member-desc">{data.description}</p>
                                <p className="team-member-pos"><b></b>{data.position}</p>
                                <a href="https://www.linkedin.com" target="_blank">
                                    <i className=" linkedin icon fa-brands fa-linkedin"></i>
                                </a>
                                <a href="https://www.instagram.com/" target="_blank">
                                    <i className=" insta icon fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://www.github.com/" target="_blank">
                                    <i className=" github icon fa-brands fa-github"></i>
                                </a>
                                
                            </div>
                        </div>
                    ))
                }
            </div>
            <Footer/>

        </div>

    )
}
export default AboutUs