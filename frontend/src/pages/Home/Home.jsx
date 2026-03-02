import { useContext } from 'react';
import Searchbar from '../../components/searchbar/Searchbar';
import { AuthContext } from '../../context/AuthContext';
import './Home.scss'

const Home = () => {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser);
  
  return (
    <div className='home'>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>Find your dream home. Discover the lifestyle you deserve.</h1>
          <p>Welcome to Bluewood Estate, where your journey to finding the perfect home begins.
            about discovering a space that reflects your
            lifestyle.</p>
            <Searchbar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>1200+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/images/bg.png" alt="" />
      </div>
    </div>
  )
}

export default Home;