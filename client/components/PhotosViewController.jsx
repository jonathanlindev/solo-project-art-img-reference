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
    <div className='container-fluid min-vh-100 d-flex flex-column'>
      <header className='bg-primary text-white py-4 py-lg-5 mb-4'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-lg-10 text-center'>
              <h1 className='display-4 display-lg-3 mb-3'>
                Art Reference Photo Gallery
              </h1>
              <p className='lead fs-5'>
                Beautiful photos from Unsplash API for your artistic inspiration
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className='flex-grow-1'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-xl-10'>
              <SearchBar onSearch={handleSearch} />

              {error && (
                <div className='row justify-content-center mb-4'>
                  <div className='col-12 col-md-8'>
                    <div
                      className='alert alert-danger text-center'
                      role='alert'
                    >
                      {error}
                    </div>
                  </div>
                </div>
              )}

              <PhotoGallery
                photos={photos}
                loading={loading}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className='bg-light text-center py-3 mt-5'>
        <div className='container'>
          <small className='text-muted'>
            Powered by{' '}
            <a
              href='https://unsplash.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Unsplash API
            </a>
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
