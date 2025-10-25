import { useState } from 'react';

const PhotoGallery = ({ photos, loading, searchTerm }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className='text-center py-5'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <p className='mt-3'>Loading beautiful photos...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className='text-center py-5'>
        <h3>No photos found</h3>
        <p>Try searching for something different!</p>
      </div>
    );
  }

  return (
    <>
      <div className='mb-4'>
        <h2 className='h4'>Search results for "{searchTerm}"</h2>
        <p className='text-muted'>{photos.length} photos found</p>
      </div>

      <div className='row g-3'>
        {photos.map((photo) => (
          <div key={photo.id} className='col-lg-3 col-md-4 col-sm-6'>
            <div className='card h-100 shadow-sm photo-card'>
              <img
                src={photo.urls.small}
                alt={photo.alt_description || 'Unsplash photo'}
                className='card-img-top'
                style={{
                  height: '200px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => handlePhotoClick(photo)}
              />
              <div className='card-body p-2'>
                <p className='card-text small text-muted mb-1'>
                  By {photo.user.name}
                </p>
                <div className='d-flex justify-content-between align-items-center'>
                  <small className='text-muted'>❤️ {photo.likes}</small>
                  <a
                    href={photo.links.html}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-sm btn-outline-primary'
                  >
                    View on Unsplash
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className='modal fade show d-block'
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={closeModal}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered'>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  Photo by {selectedPhoto.user.name}
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={closeModal}
                ></button>
              </div>
              <div className='modal-body p-0'>
                <img
                  src={selectedPhoto.urls.regular}
                  alt={selectedPhoto.alt_description || 'Unsplash photo'}
                  className='img-fluid w-100'
                />
              </div>
              <div className='modal-footer'>
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  <div>
                    <small className='text-muted'>
                      ❤️ {selectedPhoto.likes} likes
                    </small>
                  </div>
                  <a
                    href={selectedPhoto.links.download}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-success'
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
