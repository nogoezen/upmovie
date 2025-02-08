'use client';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Collapse,
  CircularProgress,
  Drawer,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
  alpha,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Whatshot,
  Star,
  Upcoming,
  LocalMovies,
  ExpandLess,
  ExpandMore,
  Close as CloseIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useGetGenresQuery } from '@/services/api';

type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

interface SidebarProps {
  setCategory: (category: Category) => void;
  selectedGenreId?: number;
  onGenreSelect: (genreId?: number) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const categories = [
  { label: 'Popular', value: 'popular', icon: <Whatshot /> },
  { label: 'Top Rated', value: 'top_rated', icon: <Star /> },
  { label: 'Upcoming', value: 'upcoming', icon: <Upcoming /> },
  { label: 'Now Playing', value: 'now_playing', icon: <LocalMovies /> },
] as const;

const DRAWER_WIDTH = 280;

export default function Sidebar({ 
  setCategory, 
  selectedGenreId, 
  onGenreSelect,
  mobileOpen = false,
  onMobileClose
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [genresOpen, setGenresOpen] = useState(true);
  const { data: genresData, isLoading: isLoadingGenres } = useGetGenresQuery();

  const handleCategoryClick = (category: Category) => {
    setCategory(category);
    onGenreSelect(undefined);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const handleGenreClick = (genreId: number) => {
    onGenreSelect(genreId === selectedGenreId ? undefined : genreId);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <>
      {isMobile && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.9)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
              UPMOVIE
            </Typography>
          </Box>
          <IconButton 
            onClick={onMobileClose}
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Box sx={{ p: 2, pt: isMobile ? 2 : 8 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 1,
            }}
          >
            Categories
          </Typography>
          <List sx={{ px: 0 }}>
            {categories.map(({ label, value, icon }) => (
              <ListItemButton
                key={value}
                onClick={() => handleCategoryClick(value)}
                selected={!selectedGenreId && value === 'popular'}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.25)',
                    },
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    minWidth: 36,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText 
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#FFFFFF',
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Genres
            </Typography>
            <IconButton
              onClick={() => setGenresOpen(!genresOpen)}
              sx={{
                p: 0.5,
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {genresOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <Collapse in={genresOpen} timeout="auto" unmountOnExit>
            <List 
              sx={{
                maxHeight: isMobile ? 'calc(100vh - 300px)' : '60vh',
                overflowY: 'auto',
                px: 0,
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '2px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              {isLoadingGenres ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
                </Box>
              ) : (
                genresData?.genres.map((genre) => (
                  <ListItemButton
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    selected={genre.id === selectedGenreId}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.25)',
                        },
                      },
                    }}
                  >
                    <ListItemText 
                      primary={genre.name}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#FFFFFF',
                      }}
                    />
                  </ListItemButton>
                ))
              )}
            </List>
          </Collapse>
        </Box>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            backgroundColor: 'rgba(0,0,0,0.95)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '4px 0 12px rgba(0,0,0,0.5)',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            backgroundColor: 'rgba(0,0,0,0.95)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '4px 0 12px rgba(0,0,0,0.5)',
          },
        }}
        open
      >
        {sidebarContent}
      </Drawer>
    </Box>
  );
} 