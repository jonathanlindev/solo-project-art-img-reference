import { useState, useEffect, useCallback, useMemo } from 'react';
import PhotoGallery from './PhotoGallery';
import SearchBar from './SearchBar';

function App() {
  const [searchTerm, setSearchTerm] = useState('featured');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'simple geometric still life',
    'simple geometric rectangle',
    'simple geometric sphere',
    'simple geometric cone',
    'simple geometric cube',
    'simple geometric cylinder',
    'nature',
    'landscape',
    'architecture',
    'animals',
    'food',
    'travel',
    'abstract',
    'people',
  ];
  // Get API key from environment variables and initialize service

  const fetchPhotos = useCallback(
    async (query = 'featured', category, count = 2, page = 1) => {
      setLoading(true);
      setError(null);

      // console.log('Fetching photos for base:', import.meta.env.VITE_BASE_URL);
      console.log('query: ' + encodeURIComponent(query));

      let queryURL = '';

      if (categories.includes(query)) {
        category = query;
      }

      console.log('category: ' + category);
      console.log('query: ' + query);
      // root endpoint
      if (query === 'featured') {
        queryURL = `?featured=true&count=${count}`;
      } // category endpoints
      else if (category !== undefined) {
        queryURL = `category/?category=${encodeURIComponent(
          category
        )}&count=${count}`;
        console.log('category fetch URL: ' + queryURL);
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
    <div className='container-fluid vw-100 vh-100 d-flex flex-column p-0'>
      <header className='bg-primary text-white py-4 mb-4'>
        <div className='container'>
          <h1 className='display-4 text-center'>
            {' '}
            Art Reference Photo Gallery
          </h1>
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
