import { Box, Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { Grow } from '@mui/material';

const Movie = ({ movie, i, onClick }) => {
  return (
    <Grow in timeout={(i + 1) * 250}>
      <Card
        onClick={onClick}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
        }}
      >
        <CardMedia
          component="img"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'https://via.placeholder.com/500x750'
          }
          alt={movie.title}
          sx={{
            height: 0,
            paddingTop: '150%', // 2:3 aspect ratio
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',
            p: 2,
            minHeight: '30%',
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: 'white', mb: 1 }}>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" sx={{ color: 'white', ml: 1 }}>
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {movie.release_date?.split('-')[0]}
          </Typography>
        </Box>
      </Card>
    </Grow>
  );
};

export default Movie; 