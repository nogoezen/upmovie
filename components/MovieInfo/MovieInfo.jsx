import {
  Modal,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
  ButtonGroup,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const MovieInfo = ({ movie, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const addToFavorites = () => {
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = () => {
    setIsMovieWatchlisted((prev) => !prev);
  };

  return (
    <Modal
      open
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '90%',
          height: '90%',
          bgcolor: theme.palette.background.default,
          borderRadius: '10px',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <Grid container sx={{ height: '100%' }}>
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              width: '100%',
              height: isMobile ? '350px' : '100%',
              position: 'relative',
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item sm={12} md={8} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              {movie.title} ({movie.release_date.split('-')[0]})
            </Typography>
            <Typography variant="h6" gutterBottom>
              {movie.tagline}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                {movie.vote_average.toFixed(1)} / 10
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {movie.overview}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Featured Cast
              </Typography>
              <Grid container spacing={2}>
                {movie?.credits?.cast?.slice(0, 6).map((character) => (
                  <Grid key={character.id} item xs={4} md={2}>
                    <Typography variant="subtitle2">{character.name}</Typography>
                    <Typography variant="caption">
                      {character.character.split('/')[0]}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
              <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${movie?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={movie?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
                <Button
                  onClick={addToFavorites}
                  endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button onClick={onClose} endIcon={<ArrowBack />}>
                  Back
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default MovieInfo; 