import 'Components/SearchBar/search.css';

const SearchBar = ({ handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit} className='form-inline'>
      <label>
        <input
          type='text'
          onChange={handleChange}
          placeholder='Enter pokemon&#39;s name'
          required
          className='search-radius'
        />
        <button className='btn'>
          <img
            onSubmit={handleSubmit}
            src='https://www.svgrepo.com/show/276264/pokeball-pokemon.svg'
            alt='search button'
            width='20px'
            height='20px'
          />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
