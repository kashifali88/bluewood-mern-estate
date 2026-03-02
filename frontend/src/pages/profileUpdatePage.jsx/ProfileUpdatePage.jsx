import React, { useContext, useState } from 'react'
import './ProfileUpdatePage.scss'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import apiRequest from '../../lib/apiRequest'
import { useNavigate } from 'react-router-dom'
import UploadWidget from '../../components/uploadWidget/UploadWidget'

const ProfileUpdatePage = () => {
    const {currentUser, updateUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState("")
    console.log(currentUser);
    
    

    const handleSubmit = async (e)=> {
        e.preventDefault();
        
  if (!currentUser?._id) {
    toast.error("User not loaded yet");
    return;
  }

        const formData = new FormData(e.target)
        const username = formData.get('username');
        const email = formData.get("email");
        const password = formData.get("password")
        const body = { username, email };
  if (password) body.password = password;
  if (avatar) body.avatar = avatar;

        

        try {
            const res = await apiRequest.put(`/users/${currentUser._id}`, body)
            updateUser(res.data)
            navigate("/profile")
            console.log(res.data);
            console.log(res);
            
            
            
            
            
        } catch (error) { 
            toast.error(error.response?.data?.message || "Failed to update profile");
            
        }
    }
  return (
    
    <div className='profileUpdatePage'>
        { currentUser ? 
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <input name="username" type="text" placeholder="Username" defaultValue={currentUser.username} />
          <input name="email" type="text" placeholder="Email" defaultValue={currentUser.email} />
          <input name="password" type="password" placeholder="Password" />
          <button>Update</button>
        </form>
      </div> : <p>Loading user info...</p>
}
    
      <div className="imgContainer">
        <img src={avatar || currentUser.avatar} alt="" />
        <UploadWidget setAvatar={setAvatar} uwConfig={{ cloudName: "dlx02bhkh", uploadPreset: "estate", multiple: false, maxImageFileSize: 2000000, folder: "avatars"}} />
        </div>
        </div>
        
       
  );
}


export default ProfileUpdatePage