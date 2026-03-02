import { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";


function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {updateUser} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formdata = new FormData(e.target)
    const username = formdata.get("username")
    const password = formdata.get("password")
    try {     
      const res = await apiRequest.post('/auth/login', {username, password})
     toast.success(res.data.message || "Login Successful")    
     updateUser(res.data)
     navigate('/')
    } catch (error) {
      toast.error(error.response.data.message || 'Login failed')
    }finally {
      setIsLoading(false)
    }

    
  }

  
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}  
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="images/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;