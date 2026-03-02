import Slider from '../../components/Slider/Slider'
import './SinglePage.scss'
import {singlePostData, userData} from '../../lib/dummyData'
import Map from '../../components/Map/Map'
import { useLoaderData } from 'react-router-dom'
import DOMPurify from 'dompurify'


const SinglePage = () => {
  const post = useLoaderData();
  
  return (
    <div className='singlePage'>
      <div className="leftDetails">
        <div className="wrapper">
          <Slider images={post.images}/>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img  src="/images/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">${post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div> 
            <div className="bottom"   dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}>
              
            </div>
          </div>
        </div>
      </div>
      <div className="rightDetails">
        <div className="wrapper">
          <span className="title">General</span>
          <div className="listVertical">
            <div className="feature">
              <img src="/images/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                { post.postDetail.utilities === "owner" ? ( <p>Owner is responsible</p> ) : ( <p>Tenant is responsible</p> ) }
               
              </div>
            </div>
            <div className="feature">
              <img src="/images/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                { post.postDetail.pet === "allowed" ? ( <p>Pets Allowed</p> ) : ( <p>Pets not allowed</p> ) }
               
              </div>
            </div>
            <div className="feature">
              <img src="/images/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <span className="title">Room Sizes</span>
          <div className="sizes">
            <div className="size">
              <img src="/images/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/images/bed.png" alt="" />
              <span>{post.bedroom}beds</span>
            </div>
            <div className="size">
              <img src="/images/bath.png" alt="" />
              <span>{post.bathroom} bathrooms</span>
            </div>
          </div>
            <span className="title">Nearby Places</span>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/images/school.png" alt="" />
                <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/images/pet.png" alt="" />
                <div className="featureText">
                <span>Bus stop</span>
                <p>{post.postDetail.bus}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/images/fee.png" alt="" />
                <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
            <span className="title">Location</span>
            <div className="mapContainer">
              <Map items={[singlePostData]} />
            </div>
            <div className="buttons">
              <button>
                <img src="/images/chat.png" alt="" />
                Send a Message
              </button>
              <button>
                <img src="/images/save.png" alt="" />
                Save the Place
              </button>
            </div>

        </div>
      </div>
    </div>
  )
}

export default SinglePage   