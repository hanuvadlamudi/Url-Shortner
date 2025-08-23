import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UrlShortenerUI from './UrlShortenerUI';
import { getUserUrls } from "../api/User.Api";
import RecentUrls from './RecentUrls';

const Home = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUrls();
    }
  }, [isAuthenticated]);

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const data = await getUserUrls();
      if(data?.success){
        setUrls(data.urls);
      } else {
        setError(data?.message || 'Failed to fetch URLs');
      }
    } catch (e) {
      setError('Error fetching URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlAdded = (shortUrl, originalUrl) => {
    setUrls(prev => [{ originalUrl, shortUrl, clicks: 0 }, ...prev]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <UrlShortenerUI onUrlAdded={handleUrlAdded} />
      {isAuthenticated && <RecentUrls urls={urls.slice(0, 5)} />}
    </div>
  );
};

export default Home;
