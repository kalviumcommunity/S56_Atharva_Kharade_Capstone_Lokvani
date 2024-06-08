import React from 'react'
import Navbar from '../Components/Navbar'
import './CSS/LandingPage.css'
import { Link } from 'react-router-dom'
import img1 from './Assets/Left-img1.png'
import img2 from './Assets/Right-img1.png'


const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className="landingMain">"
                <div className='landingMainTitle'>
                    <h1>Speak Up.  Be Heard.  Make a  Difference.</h1>
                    <p>Your voice matters. It's time to be heard, connect with <br /> Lokvani to address local challenges.</p>
                    <Link to={'./Explore'}>
                        <button className='exploreBtn'>Explore</button>
                    </Link>
                </div>
                <img src={img1} alt="" className='landingMainImg1' />
                <img src={img2} alt="" className='landingMainImg2' />
            </div>
        </>
    )
}

export default LandingPage
