import { Box, Card, Typography, Rating, Grow, Chip } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import Image from 'next/image';
import { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const formatReleaseDate = (dateString?: string) => {
  if (!dateString) return 'Release date TBA';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const isUpcoming = (releaseDate?: string) => {
  if (!releaseDate) return false;
  const date = new Date(releaseDate);
  if (isNaN(date.getTime())) return false;
  return date > new Date();
};

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const upcoming = isUpcoming(movie.release_date);
  const rating = movie.vote_average || 0;

  const renderReleaseDate = () => {
    if (!movie.release_date) return 'Release date TBA';
    const date = new Date(movie.release_date);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return upcoming 
      ? `Release: ${formatReleaseDate(movie.release_date)}` 
      : date.getFullYear().toString();
  };

  return (
    <Grow in timeout={500}>
      <Card
        sx={{
          position: 'relative',
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          },
          bgcolor: 'background.paper',
        }}
        onClick={onClick}
      >
        {upcoming && (
          <Chip
            label="Upcoming"
            color="primary"
            size="small"
            icon={<CalendarMonth />}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        )}
        <Box sx={{ position: 'relative', paddingTop: '150%' }}>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={upcoming}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.800',
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
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
              padding: 2,
              transition: 'opacity 0.2s',
            }}
          >
            <Typography variant="h6" component="h3" sx={{ mb: 1, color: 'white' }}>
              {movie.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={rating / 2} precision={0.5} size="small" readOnly />
              <Typography variant="body2" sx={{ color: 'white' }}>
                {rating ? rating.toFixed(1) : 'N/A'}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.400', mt: 1 }}>
              {renderReleaseDate()}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grow>
  );
} 