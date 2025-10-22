import { useState, useEffect, useCallback, useMemo } from 'react';
import PhotoGallery from './PhotoGallery';
import SearchBar from './SearchBar';
import UnsplashService from '../../server/unsplashService';

function App() {
  const [searchTerm, setSearchTerm] = useState('featured');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get API key from environment variables and initialize service

  const fetchPhotos = useCallback(
    async (query = 'featured', count = 16, page = 1, categories) => {
      setLoading(true);
      setError(null);

      console.log('Fetching photos for base:', import.meta.env.VITE_BASE_URL);
      console.log('query: ' + encodeURIComponent(query));

      let queryURL = '';

      // root endpoint
      if (query === 'featured') {
        queryURL = `?featured=true&count=${count}`;
      } // category endpoints
      else if (categories !== undefined) {
        queryURL = `category/?category=${encodeURIComponent(
          categories
        )}&count=${count}`;
      } // search endpoint
      else {
        queryURL = `search/?search=${encodeURIComponent(query)}&count=${count}`;
      }

      fetch(import.meta.env.VITE_BASE_URL + queryURL)
        .then((res) => res.json())
        .then((data) => {
          const photos = JSON.parse(data)['photos'];

          // console.log(
          //   'data from backend API: ' + JSON.stringify(JSON.parse(data)['photos'])
          // );

          setPhotos(photos);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching from backend API:', err);
          setError(
            'Error fetching photos. Please check your API key and try again.'
          );

          setLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    fetchPhotos(searchTerm);
  }, [searchTerm, fetchPhotos]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className='container-fluid'>
      <header className='bg-primary text-white py-4 mb-4'>
        <div className='container'>
          <h1 className='display-4 text-center'>Unsplash Photo Gallery</h1>
          <p className='lead text-center'>Beautiful photos from Unsplash API</p>
        </div>
      </header>

      <div className='container'>
        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )}

        <PhotoGallery
          photos={photos}
          loading={loading}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

export default App;
