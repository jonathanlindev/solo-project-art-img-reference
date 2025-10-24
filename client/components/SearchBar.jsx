import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleQuickSearch = (term) => {
    setSearchInput(term);
    onSearch(term);
  };

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
  return (
    <div className='search-section mb-4 mb-lg-5'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-10 col-lg-8'>
          <form onSubmit={handleSubmit} className='mb-4'>
            <div className='input-group input-group-lg'>
              <input
                type='text'
                className='form-control'
                placeholder='Search for art reference photos...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className='btn btn-primary px-4'
                type='submit'
                disabled={!searchInput.trim()}
              >
                <i className='bi bi-search'></i>
                <span className='d-none d-sm-inline ms-1'>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-12 col-lg-10'>
          <div className='text-center mb-3'>
            <small className='text-muted fw-semibold'>Popular Categories</small>
          </div>
          <div className='d-flex flex-wrap justify-content-center gap-2'>
            {categories.map((term) => (
              <button
                key={term}
                className='btn btn-outline-secondary btn-sm'
                onClick={() => handleQuickSearch(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
