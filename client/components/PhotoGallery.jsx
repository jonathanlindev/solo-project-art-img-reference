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
        <div className='d-flex flex-column align-items-center'>
          <div
            className='spinner-border text-primary mb-3'
            role='status'
            style={{ width: '3rem', height: '3rem' }}
          >
            <span className='visually-hidden'>Loading...</span>
          </div>
          <h4 className='text-primary'>Loading beautiful photos...</h4>
          <p className='text-muted'>
            Please wait while we fetch your art references
          </p>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className='text-center py-5'>
        <div className='d-flex flex-column align-items-center'>
          <div className='display-1 text-muted mb-3'>🎨</div>
          <h3 className='text-muted'>No photos found</h3>
          <p className='text-muted'>Try searching for something different!</p>
          <button
            className='btn btn-primary mt-2'
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='text-center mb-4 mb-lg-5'>
        <h2 className='h3 text-primary'>Search results for "{searchTerm}"</h2>
        <p className='text-muted'>
          <span className='badge bg-light text-dark fs-6'>
            {photos.length} photos found
          </span>
        </p>
      </div>

      <div className='row g-3 g-lg-4 justify-content-center'>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'
          >
            <div className='card h-100 shadow-sm photo-card border-0'>
              <div className='position-relative overflow-hidden'>
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || 'Unsplash photo'}
                  className='card-img-top'
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => handlePhotoClick(photo)}
                />
                <div className='position-absolute top-0 end-0 m-2'>
                  <span className='badge bg-dark bg-opacity-75'>
                    <i className='bi bi-heart-fill text-danger'></i>{' '}
                    {photo.likes}
                  </span>
                </div>
              </div>
              <div className='card-body p-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='flex-grow-1'>
                    <p className='card-text small text-muted mb-1 text-truncate'>
                      By <strong>{photo.user.name}</strong>
                    </p>
                  </div>
                  <a
                    href={photo.links.html}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-sm btn-outline-primary'
                    title='View on Unsplash'
                  >
                    <i className='bi bi-eye'></i>
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
          <div className='modal-dialog modal-xl modal-dialog-centered'>
            <div
              className='modal-content border-0'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='modal-header bg-primary text-white'>
                <h5 className='modal-title'>
                  <i className='bi bi-camera'></i> Photo by{' '}
                  {selectedPhoto.user.name}
                </h5>
                <button
                  type='button'
                  className='btn-close btn-close-white'
                  onClick={closeModal}
                ></button>
              </div>
              <div className='modal-body p-0 text-center'>
                <img
                  src={selectedPhoto.urls.regular}
                  alt={selectedPhoto.alt_description || 'Unsplash photo'}
                  className='img-fluid w-100'
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
              <div className='modal-footer justify-content-between'>
                <div className='d-flex align-items-center gap-3'>
                  <span className='badge bg-light text-dark fs-6'>
                    <i className='bi bi-heart-fill text-danger'></i>{' '}
                    {selectedPhoto.likes} likes
                  </span>
                  <small className='text-muted'>
                    {selectedPhoto.width} × {selectedPhoto.height}
                  </small>
                </div>
                <div className='d-flex gap-2'>
                  <a
                    href={selectedPhoto.links.html}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-outline-primary'
                  >
                    <i className='bi bi-box-arrow-up-right'></i> View on
                    Unsplash
                  </a>
                  <a
                    href={selectedPhoto.links.download}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-success'
                  >
                    <i className='bi bi-download'></i> Download
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
