import './ProfilePage.scss'
import List from '../../components/List/List'
import Chat from '../../components/Chat/Chat'
import { toast } from 'react-toastify'
import apiRequest from '../../lib/apiRequest'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
    const navigate = useNavigate()
    const { updateUser, currentUser } = useContext(AuthContext)

    

    useEffect(()=>{
        if(!currentUser){
            navigate('/login')
        }
    },[currentUser, navigate])

    const handleLogout = async () => {
        try {
             await apiRequest.post('/auth/logout')
             updateUser(null)
            navigate('/')
            toast.success("Logout Successful")

        } catch (error) {
            toast.error(error)
        }
    }
    return (
         currentUser && (
        <div className='profilePage'>
           
           <div className="left">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to='/profile/update'>
                        <button>Update Profile</button></Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img src={currentUser?.avatar || "/images/kashif.jpg"} alt="" />
                        </span>
                        <span>Username: <b>{currentUser.username}</b></span>
                        <span>Email: <b>{currentUser.email}</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <Link to='/add'>
                        <button>Create New Post</button></Link>
                    </div>
                    <List />
                    <div className="title">
                        <h1>saved Post</h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="right">
                <div className="wrapper">
                    <Chat />

                </div>
            </div>
        </div>
      
)
    )
}

export default ProfilePage