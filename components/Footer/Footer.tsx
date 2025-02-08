'use client';

import { Box, Container, Typography, Link, IconButton, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: theme.palette.text.secondary,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Left side - Copyright and Author */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}
            >
              UPMOVIE
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              © {currentYear} UpMovie. All rights reserved.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Created with passion by{' '}
              <Link
                href="https://github.com/nogoezen"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Nogoezen
              </Link>
            </Typography>
          </Box>

          {/* Right side - Social Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              href="https://github.com/nogoezen"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.2s',
                '&:hover': {
                  color: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/nogoezen"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.2s',
                '&:hover': {
                  color: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://twitter.com/nogoezen"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.2s',
                '&:hover': {
                  color: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Twitter />
            </IconButton>
          </Box>
        </Box>

        {/* Additional Links */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 2, sm: 4 },
            mt: 4,
          }}
        >
          <Link
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            TMDB API
          </Link>
          <Link
            href="/terms"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="https://github.com/nogoezen/upmovie"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            GitHub Repository
          </Link>
        </Box>
      </Container>
    </Box>
  );
} 