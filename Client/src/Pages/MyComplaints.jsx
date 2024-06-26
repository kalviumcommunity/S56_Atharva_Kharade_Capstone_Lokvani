import React, { useState, useEffect } from 'react';
import './CSS/MyComplaint.css';
import UserDashboard from '../Components/UserDashboard';
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState();
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    fetchComplaints();
  }, [userId]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/MyComplaint/${userId}`);
      const data = response.data;
      setComplaints(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  return (
    <>
      <div className="My-Complaint-main-body">
        <UserDashboard />
        <div className="MyComplaint-body">
          {!complaints ? (
            <div className="No-complaints-message">
              <p>No complaints logged by you.</p>
            </div>
          ) : (
            complaints.map(complaint => (
              <div key={complaint._id} className="MyComplaint-complaint-box">
                <div className="MyComplaint-box-title">
                  <h1>{complaint.title}</h1>
                </div>
                <div className="MyComplaint-img">
                  <img src={complaint.Image} alt="Complaint Image" className='complaint-img-size' />
                </div>
                <div className="MyComplaint-descp">
                  <p>{complaint.description}</p>
                </div>
                <div className="MyComplaint-function">
                  <div className="MyComplaint-upvote">
                    <BiUpvote className="vote-arrows" />
                  </div>
                  <div className="MyComplaint-comment">
                    <FaRegComment className="vote-arrows" />
                  </div>
                  <div className="MyComplaint-status">
                    <Chip label="Not Verified" color="warning" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

//   return (
//     <>
//       <div className="My-Complaint-main-body">
//         <UserDashboard />
//         <div className="MyComplaint-body">
//           {!complaints ? (
//             <div className="No-complaints-message">
//               <p>No complaints logged by you.</p>
//             </div>
//           ) : (
//             complaints.map(complaint => (
//               <div key={complaint._id} className="MyComplaint-complaint-box">
//                 <div className="MyComplaint-box-title">
//                   <h1>{complaint.title}</h1>
//                 </div>
//                 <div className="MyComplaint-img">
//                   <img src={complaint.Image} alt="Complaint Image" className='complaint-img-size' />
//                 </div>
//                 <div className="MyComplaint-descp">
//                   <p>{complaint.description}</p>
//                 </div>
//                 <div className="MyComplaint-function">
//                   <div className="MyComplaint-upvote">
//                     <BiUpvote className="vote-arrows" />
//                     <h1>{((complaint.upvotedBy && complaint.upvotedBy.length) || 0) - ((complaint.downvotedBy && complaint.downvotedBy.length) || 0)}</h1>
//                   </div>
//                   <div className="MyComplaint-comment">
//                     <FaRegComment className="vote-arrows" />
//                   </div>
//                   <div className="MyComplaint-status">
//                     <Chip label={complaint.verified ? "Verified" : "Not Verified"} color={complaint.verified ? "success" : "warning"} />
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

export default MyComplaints;
