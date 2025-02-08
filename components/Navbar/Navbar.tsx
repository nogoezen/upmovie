'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
  alpha,
  useTheme,
  useMediaQuery,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  MovieFilter as MovieIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDebounce } from '@/hooks/useDebounce';

interface NavbarProps {
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ setSearchQuery }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Debounce search term to avoid too many API calls
  useDebounce(() => {
    setSearchQuery(searchTerm);
  }, 500, [searchTerm]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)',
        backdropFilter: 'blur(16px)',
        borderBottom: 'none',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile && (
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                letterSpacing: '-0.01em',
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              UPMOVIE
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: 'rgba(0,0,0,0.75)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.85)',
            },
            transition: theme.transitions.create(['background-color', 'box-shadow', 'width']),
            width: isSearchFocused 
              ? { xs: '100%', sm: '400px' }
              : { xs: '100%', sm: '300px' },
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Box
            sx={{
              px: 2,
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search movies…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            endAdornment={
              searchTerm && (
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm('')}
                  sx={{
                    mr: 0.5,
                    color: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      color: '#FFFFFF',
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )
            }
            sx={{
              color: '#FFFFFF',
              width: '100%',
              '& .MuiInputBase-input': {
                py: 1,
                pl: '40px',
                pr: searchTerm ? '40px' : '16px',
                width: '100%',
                fontSize: '0.95rem',
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.5)',
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Coming soon">
            <IconButton
              sx={{
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <MovieIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 