import React from 'react'
import './CSS/ProfileEdit.css'
import { MdEdit } from "react-icons/md";

const ProfileEdit = () => {
  return (
    <div className='profileEditMain'>
      <div className="profileImageDiv">
        <div className="profileImage">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" />
        </div>
        <div className="profileEditDetail">
          <div className="profileEditPersonal">
            <MdEdit className='profilePerEditPen' />
            <div className="profileEditName">
              <h6>UserName</h6>
              <h1>Atharva</h1>
            </div>
            <div className="profileEditName">
              <h6>Email</h6>
              <h1>shreyashwagh2004@gmail.com</h1>
            </div>
          </div>
          <div className="profileEditBio">
            <MdEdit className='profileBioEditPen' />
            <h1>Bio</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet efficitur nulla. Aliquam mattis justo eros, ac malesuada ipsum varius id. Morbi in ligula venenatis, convallis erat a, placerat.</p>
          </div>
        </div>
      </div>
      <div className="profileEditComplaints">
        <div className="profileComplaintLiked">
          <h1>Liked Posts</h1>
          <div>
            <div className="profileLikedPost">
              <div className='profileLikedBox'>
                <h1>Post Detail</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="profileComplaintCommented">
          <h1>Posts Made </h1>
          <div>
            <div className="profileLikedPost">
              <div className='profileLikedBox'>
                <h1>Post Detail</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
