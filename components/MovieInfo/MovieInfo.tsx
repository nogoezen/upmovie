'use client';

import {
  Modal,
  Typography,
  Button,
  Grid,
  Box,
  useMediaQuery,
  Rating,
  ButtonGroup,
  Chip,
  IconButton,
  Tabs,
  Tab,
  useTheme,
  Fade,
  Slide,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  Launch,
  AccessTime,
  AttachMoney,
  CalendarMonth,
  Close,
  PlayArrow,
} from '@mui/icons-material';
import { useState } from 'react';
import { Movie, CastMember, CrewMember } from '@/types/movie';
import Image from 'next/image';
import { useGetRecommendationsQuery } from '@/services/api';

interface MovieInfoProps {
  movie: Movie;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`movie-tabpanel-${index}`}
      aria-labelledby={`movie-tab-${index}`}
      {...other}
    >
      {value === index && <Fade in><Box sx={{ p: 3 }}>{children}</Box></Fade>}
    </div>
  );
}

const MovieInfo = ({ movie, onClose }: MovieInfoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isMovieFavorited, setIsMovieFavorited] = useState<boolean>(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  
  const { data: recommendations } = useGetRecommendationsQuery(movie.id.toString());

  const addToFavorites = () => {
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = () => {
    setIsMovieWatchlisted((prev) => !prev);
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const directors = movie.credits?.crew?.filter(crew => crew.job === 'Director') || [];
  const writers = movie.credits?.crew?.filter(crew => 
    ['Screenplay', 'Writer', 'Story'].includes(crew.job)
  ) || [];

  return (
    <Modal
      open
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Slide direction="up" in mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'background.default',
            overflow: 'auto',
            position: 'relative',
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.grey[700]} ${theme.palette.background.paper}`,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.background.paper,
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.grey[700],
              borderRadius: '4px',
            },
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'fixed',
              right: 16,
              top: 16,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              '&:hover': { 
                bgcolor: 'rgba(0, 0, 0, 0.9)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
              zIndex: 2,
            }}
          >
            <Close />
          </IconButton>

          {/* Backdrop Image with Gradient Overlay */}
          <Box
            sx={{
              position: 'relative',
              height: { xs: '300px', sm: '400px', md: '600px' },
              width: '100%',
            }}
          >
            {movie.backdrop_path ? (
              <>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.9) 90%, rgba(0,0,0,1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: { xs: 3, sm: 4, md: 6 },
                  }}
                >
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    sx={{ 
                      color: 'white',
                      fontWeight: 700,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                      mb: 2,
                    }}
                  >
                    {movie.title}
                  </Typography>
                  
                  {movie.tagline && (
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        mb: 2,
                        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      {movie.tagline}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      sx={{
                        bgcolor: 'white',
                        color: 'black',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.9)',
                        },
                        fontWeight: 600,
                        px: 4,
                      }}
                    >
                      Watch Trailer
                    </Button>
                    <ButtonGroup variant="contained" sx={{ bgcolor: 'rgba(0,0,0,0.6)' }}>
                      <Button
                        onClick={addToFavorites}
                        startIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                        sx={{ 
                          backdropFilter: 'blur(4px)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                        }}
                      >
                        {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                      </Button>
                      <Button
                        onClick={addToWatchlist}
                        startIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                        sx={{ 
                          backdropFilter: 'blur(4px)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                        }}
                      >
                        Watchlist
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.900',
                }}
              >
                <MovieIcon sx={{ fontSize: 60, color: 'grey.700' }} />
              </Box>
            )}
          </Box>

          <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
            <Grid container spacing={4}>
              {/* Main Content */}
              <Grid item xs={12} md={8}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    Overview
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {movie.overview}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Runtime
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {formatRuntime(movie.runtime)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Release Date
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Budget
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {formatCurrency(movie.budget)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Revenue
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {formatCurrency(movie.revenue)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    Genres
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {movie.genres?.map((genre) => (
                      <Chip
                        key={genre.id}
                        label={genre.name}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: 'text.primary',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {directors.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                      Director{directors.length > 1 ? 's' : ''}
                    </Typography>
                    {directors.map((director) => (
                      <Typography key={director.id} variant="body1" color="text.secondary">
                        {director.name}
                      </Typography>
                    ))}
                  </Box>
                )}

                {writers.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                      Writer{writers.length > 1 ? 's' : ''}
                    </Typography>
                    {writers.map((writer) => (
                      <Typography key={writer.id} variant="body1" color="text.secondary">
                        {writer.name} ({writer.job})
                      </Typography>
                    ))}
                  </Box>
                )}

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    Cast
                  </Typography>
                  <Grid container spacing={2}>
                    {movie.credits?.cast?.slice(0, 6).map((actor) => (
                      <Grid item xs={6} sm={4} md={4} key={actor.id}>
                        <Box
                          sx={{
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          {actor.profile_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                              alt={actor.name}
                              width={300}
                              height={450}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: '100%',
                                pt: '150%',
                                bgcolor: 'grey.800',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              No Image
                            </Box>
                          )}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              p: 1,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                            }}
                          >
                            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                              {actor.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                              {actor.character}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {recommendations?.results && recommendations.results.length > 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                      More Like This
                    </Typography>
                    <Grid container spacing={2}>
                      {recommendations.results.slice(0, 6).map((movie) => (
                        <Grid item xs={6} sm={4} md={4} key={movie.id}>
                          <Box
                            sx={{
                              position: 'relative',
                              borderRadius: 2,
                              overflow: 'hidden',
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                          >
                            {movie.poster_path ? (
                              <Image
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                alt={movie.title}
                                width={300}
                                height={450}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                  borderRadius: '8px',
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: '100%',
                                  pt: '150%',
                                  bgcolor: 'grey.800',
                                  borderRadius: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                No Image
                              </Box>
                            )}
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                p: 1,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                              }}
                            >
                              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                                {movie.title}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Rating value={movie.vote_average / 2} precision={0.5} size="small" readOnly />
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Grid>

              {/* Side Content */}
              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'sticky', top: 20 }}>
                  {movie.poster_path && (
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                        mb: 3,
                      }}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={500}
                        height={750}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {movie.imdb_id && (
                      <Button
                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        endIcon={<Launch />}
                        fullWidth
                        sx={{
                          bgcolor: '#f3ce13',
                          color: 'black',
                          '&:hover': {
                            bgcolor: '#dab70d',
                          },
                        }}
                      >
                        View on IMDB
                      </Button>
                    )}
                    {movie.homepage && (
                      <Button
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        endIcon={<Launch />}
                        fullWidth
                      >
                        Official Website
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default MovieInfo; 