import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import { Link } from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  Movie as MovieIcon,
  Theaters,
  Favorite,
  Whatshot,
  Star,
  LiveTv,
} from '@mui/icons-material';

const categories = [
  { label: 'Popular', value: 'popular', icon: <Whatshot /> },
  { label: 'Top Rated', value: 'top_rated', icon: <Star /> },
  { label: 'Upcoming', value: 'upcoming', icon: <MovieIcon /> },
  { label: 'Now Playing', value: 'now_playing', icon: <Theaters /> },
];

const Sidebar = ({ setCategory }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 240,
        height: '100%',
        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: theme.palette.background.default,
      }}
    >
      <List>
        <ListSubheader sx={{ bgcolor: 'inherit', color: 'white' }}>Categories</ListSubheader>
        {categories.map(({ label, value, icon }) => (
          <ListItem
            button
            key={value}
            onClick={() => setCategory(value)}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
      <List>
        <ListSubheader sx={{ bgcolor: 'inherit', color: 'white' }}>Genres</ListSubheader>
        {/* Add genre list items here when implementing genre functionality */}
      </List>
    </Box>
  );
};

export default Sidebar; 