import { useState, useEffect, useCallback, useMemo } from 'react';
import PhotoGallery from './PhotoGallery';
import SearchBar from './SearchBar';
import UnsplashService from '../../server/unsplashService';

function App() {
  const [searchTerm, setSearchTerm] = useState('nature');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get API key from environment variables and initialize service
  const UNSPLASH_ACCESS_KEY =
    import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY_HERE';

  const unsplashService = useMemo(
    () => new UnsplashService(UNSPLASH_ACCESS_KEY),
    [UNSPLASH_ACCESS_KEY]
  );

  const fetchPhotos = useCallback(
    async (query = 'nature', page = 1) => {
      setLoading(true);
      setError(null);

      try {
        // Using Unsplash service to fetch photos
        const { photos } = await unsplashService.searchPhotos(query, page, 12);
        setPhotos(photos);
        console.log('photos: ' + JSON.stringify(photos));
      } catch (err) {
        setError(
          'Error fetching photos. Please check your API key and try again.'
        );
        console.error('Error fetching photos:', err);
      } finally {
        setLoading(false);
      }
    },
    [unsplashService]
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
