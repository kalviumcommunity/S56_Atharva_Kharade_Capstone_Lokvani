import React from 'react'
import Navbar from '../Components/Navbar'
import './LandingPage.css'
import { Link } from 'react-router-dom'


const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className="Landing-main">
                <div className="Landing-Heading">
                    <h1>Speak Up. Be Heard. Make a Difference.</h1>
                </div>
                <div className="Landing-subHeading">
                    <h1>Your voice matters. It's time to be heard, connect with your community to address local challenges.</h1>
                </div>
                <button className="explore-btn" role="button">Explore</button>
                <div className="Landing-Img">

                </div>
            </div>
        </>
    )
}

export default LandingPage
