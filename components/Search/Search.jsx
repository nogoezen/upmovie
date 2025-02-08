import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Search = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchQuery(query);
    }
  };

  return (
    <TextField
      variant="standard"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'white' }} />
          </InputAdornment>
        ),
        style: { color: 'white' },
      }}
      sx={{
        width: '30%',
        marginLeft: '2rem',
        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
        '& .MuiInput-underline:after': { borderBottomColor: 'white' },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'white',
        },
      }}
      placeholder="Search movies..."
    />
  );
};

export default Search; 