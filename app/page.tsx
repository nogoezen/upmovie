'use client';

import { Box, CircularProgress, Typography, Container, Chip, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useGetMoviesQuery, useGetGenresQuery } from '@/services/api';
import { MovieList, Navbar, Sidebar, MovieInfo } from '@/components';
import type { Movie } from '@/types';

export default function Home() {
  const [category, setCategory] = useState<'popular' | 'top_rated' | 'upcoming' | 'now_playing'>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<number>();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: genresData } = useGetGenresQuery();
  const { data, error, isFetching } = useGetMoviesQuery(
    { 
      category,
      page,
      searchQuery: searchQuery || undefined,
      genreId: selectedGenreId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const selectedGenre = genresData?.genres.find(genre => genre.id === selectedGenreId);

  const handleGenreSelect = (genreId?: number) => {
    setSelectedGenreId(genreId);
    setPage(1);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    if (isFetching) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress size="4rem" />
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography variant="h6" color="error">
            An error has occurred. Please try again later.
          </Typography>
        </Box>
      );
    }

    if (selectedMovie) {
      return <MovieInfo movie={selectedMovie} onClose={() => setSelectedMovie(null)} />;
    }

    return (
      <Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          gap: 2, 
          mb: 4 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              {searchQuery
                ? `Search Results for: ${searchQuery}`
                : category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Typography>
          </Box>
          {selectedGenre && (
            <Chip
              label={selectedGenre.name}
              color="primary"
              onDelete={() => handleGenreSelect(undefined)}
              sx={{ height: 32 }}
            />
          )}
        </Box>
        <MovieList
          movies={data?.results || []}
          onMovieClick={setSelectedMovie}
          page={page}
          setPage={setPage}
          totalPages={data?.total_pages}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar setSearchQuery={setSearchQuery} />
      <Sidebar
        setCategory={setCategory}
        selectedGenreId={selectedGenreId}
        onGenreSelect={handleGenreSelect}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { sm: `${240}px` },
          mt: '64px',
          p: { xs: 1, sm: 2, md: 3 },
          width: { sm: `calc(100% - ${240}px)` },
        }}
      >
        <Container maxWidth="xl">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
} 