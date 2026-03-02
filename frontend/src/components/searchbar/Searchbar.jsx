import { useState } from 'react'
import './Searchbar.scss'
import { Link } from 'react-router-dom';

const types = ["buy","rent"]; 
const Searchbar = () => {
    const [query, setQuery] = useState(
        {
            type: "buy",
            location: "",
            minPrice: 0,
            maxPrice: 0
        }
    )
    const switchType = (type) => {
        setQuery((prev) => ({...prev, type:type}))

    }
    const handleChange = (e) => {
                setQuery((prev) => ({...prev, [e.target.name] : e.target.value}))

    }
  return (
    <div className='searchbar'>
        <div className="type">
            {types.map(type => (
            <button className={query.type === type ? "active" : "" } key={type} onClick={() => switchType(type)}>{type}</button>
            ))}
        </div>
        <form className='form'>
            <input type="text"   name='city' placeholder='City' onChange={handleChange} />
            <input type="number" name='minPrice' min={0} max={100000} placeholder='Min Price' onChange={handleChange} />
            <input type="number" name='maxPrice' min={0} max={100000}   placeholder='Max Price' onChange={handleChange} />
            <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
            <button>
                <img src="/images/search.png" alt="" />
            </button></Link>
        </form>
    </div>
  )
}

export default Searchbar