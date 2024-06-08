import React from 'react'
import './Dash.css'
import img from "./CSS/Logo.png";
import { FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { GoHome } from 'react-icons/go';
import { GrDocumentUser } from 'react-icons/gr';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';


const Dash = () => {
    return (
        <div className='Dashboard'>
            <div className="DB-Logo">
                <img src={img} alt="logo" className="DB-logoImg" />
                <div>
                    <h1>LOKVANI</h1>
                </div>
            </div>

            <div className="userDetail-1">
                <IconContext.Provider value={{ color: 'black', size: '50px' }}>
                    <FaRegUserCircle />
                </IconContext.Provider>
                <div className='userDetail-name'>
                    <p>ATHARVA279</p>
                    <p>atha</p>
                </div>
            </div>

            <div className='DB-UserOptionP'>
                <div className="UserOption">
                    <div className="UserIcon">
                        {/* <IconContext.Provider value={{ color: 'black', size: '90px' }}> */}
                            <MdOutlineSmsFailed className='A'/>
                        {/* </IconContext.Provider> */}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Dash
