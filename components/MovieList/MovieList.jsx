import { Grid, Pagination } from '@mui/material';
import { Movie } from '..';

const MovieList = ({ movies, onMovieClick, page, setPage, totalPages = 0 }) => {
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {movies.map((movie, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
            <Movie movie={movie} i={i} onClick={() => onMovieClick(movie)} />
          </Grid>
        ))}
      </Grid>
      <Grid 
        container 
        justifyContent="center" 
        sx={{ mt: 4, mb: 4 }}
      >
        <Pagination
          count={Math.min(totalPages, 500)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </>
  );
};

export default MovieList; 