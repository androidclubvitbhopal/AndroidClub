import Navbar from "../../components/Navbar/Navbar"
import { useEffect, useState } from "react";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import "./about.css"
import { Footer } from "../../components/Footer/Footer";

function AboutUs() {
    const [teamMembers, setTeamMembers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const teamMembersRef = doc(db, "Our Team", "ADMIN", "President", "1");
          const teamMembersSnapshot = await getDoc(teamMembersRef);
          if (teamMembersSnapshot.exists()) {
            setTeamMembers(teamMembersSnapshot.data());
          }
        };
    
        fetchData();
      }, []);
    

    return (
        <div className="About">
            <Navbar className="navbar-about" />
            <div className="about-club">
                <br />
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
                <br />
            <div className="blue-container1">
                <h2>President</h2>
                <p>{teamMembers.name}</p>
                <p>{teamMembers.email}</p>

            </div>
                <br />
                <div className="blue-container2"></div>
                <div className="blue-container3"></div>
                <div className="blue-container4"></div>
                <div className="blue-container5"></div>
                <div className="blue-container6"></div>
                <div className="blue-container7"></div>

            <Footer/>

        </div>

    )
}
export default AboutUs