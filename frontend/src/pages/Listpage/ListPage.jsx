import './ListPage.scss';
import { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';

const ListPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiRequest.get("/posts"); 
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="listPage"><p>Loading posts...</p></div>;
  if (error) return <div className="listPage"><p>{error}</p></div>;
 
  return (
    
    <div className='listPage'>
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map(item => (
            <Card key={item._id} item={item} /> 
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
};

export default ListPage;
