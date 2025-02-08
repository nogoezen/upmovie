import { Grid, Pagination, Box } from '@mui/material';
import { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}

export default function MovieList({ movies, onMovieClick, page, setPage, totalPages = 1 }: MovieListProps) {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} onClick={() => onMovieClick(movie)} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Pagination
            count={Math.min(totalPages, 500)} // TMDB API limit is 500 pages
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
} 