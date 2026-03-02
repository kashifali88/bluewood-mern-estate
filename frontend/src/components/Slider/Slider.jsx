import { useState } from 'react';
import './Slider.scss';

const Slider = ({ images }) => {
    const [imageIndex, setImageIndex] = useState(null);
    const changeSlide = (direction) => {
       direction === 'left' ? 
       setImageIndex(imageIndex === 0 ? images.length -1 : imageIndex -1) : 
       setImageIndex(imageIndex === images.length -1 ? 0 : imageIndex +1)
    }
    
    return (
        <div className='slider'>
            {imageIndex !== null && (
                <div className="fullSlider">
                    <div className="arrow" onClick={()=> changeSlide('left')}>
                        <img src="/images/arrow.png" alt=""  />
                    </div>
                    <div className="imgContainer">
                        <img src={images[imageIndex]} alt="" />
                    </div>
                    <div className="arrow" onClick={()=> changeSlide('right')}>
                        <img src="/images/arrow.png" className='right' alt="" />
                    </div>
                    <div className="close" onClick={()=> setImageIndex(null)}>X</div>
                </div>
            )}
            <div className="leftImage">
                <img src={images[0]} alt="" onClick={()=> setImageIndex(0)} />
            </div>
            <div className="rightImages">
                {images.slice(1).map((image, index) => (
                    <img src={image} key={index} alt='' onClick={()=> setImageIndex(index+1)} />
                ))}
            </div>
        </div>
    )
}

export default Slider