import   './Pin.scss'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Pin = ({item}) => {
  return (
    <div>
        <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.img} alt="" />
                
                <div className="textContainer">
                    <Link to={`/${item.id}`}>{item.title}</Link>
                    <span className='bedroom'>{item.bedroom}</span>
                    <b>${item.price}</b>
                </div>
                </div>
            </Popup>
        </Marker>
    </div>
  )
}

export default Pin