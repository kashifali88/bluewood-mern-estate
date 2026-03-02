import { useSearchParams } from 'react-router-dom';
import './Filter.scss';
import { useState } from 'react';

const Filter = () => {

    const[searchParams, setSearchParams] = useSearchParams()
    const[query, setQuery]  = useState({
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || 0,
        maxPrice: searchParams.get("maxPrice") || 100000000,
        bedroom: searchParams.get("bedroom") || 1,
    })
    const handleChange = (e) => {
        setQuery({...query, [e.target.name]: e.target.value})
    }
    const handleFilter = () =>  {

        setSearchParams(query)
    }
    return (
        <div className='filter'>
            <h1>Search results for <span>{searchParams.get("city")}</span></h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city">location</label>
                    <input type="text" id='city' defaultValue={query.city} name='city' placeholder='City Location' onChange={handleChange} />
                </div>
            </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select id='type' name='type' onChange={handleChange} defaultValue={query.type}>
                        <option value="any">any</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
                        <option value="any">any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input type="number" id='minPrice' name='minPrice' placeholder='any' onChange={handleChange} defaultValue={query.minPrice} />
                </div>

                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input type="number" id='maxPrice' name='maxPrice' placeholder='any' onChange={handleChange} defaultValue={query.maxPrice} />
                </div>

                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input type="text" id='bedroom' name='bedroom' placeholder='any' onChange={handleChange} defaultValue={query.bedroom} />
                </div>
                <button onClick={handleFilter}><img src="/images/search.png" alt="" /></button>
            </div>
        </div>
    )
}

export default Filter