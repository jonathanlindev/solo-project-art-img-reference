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
    <div className='search-section mb-4'>
      <form onSubmit={handleSubmit} className='mb-3'>
        <div className='row g-2'>
          <div className='col-md-8'>
            <div className='input-group'>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Search for photos...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className='btn btn-primary btn-lg'
                type='submit'
                disabled={!searchInput.trim()}
              >
                <i className='bi bi-search'></i> Search
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className='quick-searches'>
        <small className='text-muted d-block mb-2'>Categories:</small>
        <div className='d-flex flex-wrap gap-2'>
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
  );
};

export default SearchBar;
