import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery, Drawer, Box } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Search } from '..';
import { useTheme } from '@mui/material/styles';
import { Link } from 'next/link';

const Navbar = ({ setSearchQuery }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = false;

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ height: '80px', display: 'flex', justifyContent: 'space-between', ml: '240px' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
        )}
        <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobile && <Search setSearchQuery={setSearchQuery} />}
        <Box>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => {}}>
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              href="/profile/:id"
              sx={{
                '&:hover': {
                  color: 'white !important',
                  textDecoration: 'none',
                },
              }}
            >
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar
                style={{ width: 30, height: 30 }}
                alt="Profile"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              />
            </Button>
          )}
        </Box>
        {isMobile && <Search setSearchQuery={setSearchQuery} />}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 