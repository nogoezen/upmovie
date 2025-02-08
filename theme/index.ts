import { createTheme } from '@mui/material/styles';

// Custom color palette
const colors = {
  primary: '#E50914',    // Netflix Red
  secondary: '#141414',  // Netflix Dark Gray
  accent: '#B81D24',     // Netflix Dark Red
  white: '#FFFFFF',      // Pure white
  // Additional shades for depth
  primaryDark: '#B30710',
  primaryLight: '#E87C86',
  secondaryDark: '#000000',
  secondaryLight: '#2F2F2F',
  accentDark: '#8C161B',
  accentLight: '#DC4853',
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#808080',
  // Dark theme colors (Netflix is primarily dark)
  darkBackground: '#141414',
  darkPaper: '#1F1F1F',
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
  gradientSecondary: 'linear-gradient(135deg, #141414 0%, #2F2F2F 100%)',
  gradientAccent: 'linear-gradient(135deg, #B81D24 0%, #8C161B 100%)',
};

// Modern shadows with Netflix's dark theme
const shadows = {
  soft: `0 2px 4px ${colors.secondaryDark}80`,
  medium: `0 4px 8px ${colors.secondaryDark}90`,
  strong: `0 8px 16px ${colors.secondaryDark}`,
  card: `
    0 2px 4px ${colors.secondaryDark}80,
    0 8px 16px ${colors.secondaryDark}40
  `,
  hover: `
    0 6px 12px ${colors.secondaryDark}90,
    0 12px 24px ${colors.secondaryDark}60
  `,
};

// Transitions
const transitions = {
  quick: 'all 0.2s ease-in-out',
  medium: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

export const lightTheme = createTheme({
  palette: {
    mode: 'dark', // Netflix is primarily dark
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      light: colors.primaryLight,
    },
    secondary: {
      main: colors.secondary,
      dark: colors.secondaryDark,
      light: colors.secondaryLight,
    },
    background: {
      default: colors.darkBackground,
      paper: colors.darkPaper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  shape: {
    borderRadius: 4, // Netflix uses smaller border radius
  },
  typography: {
    fontFamily: '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      color: colors.textPrimary,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      color: colors.textPrimary,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      color: colors.textPrimary,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.darkBackground,
          scrollbarColor: `${colors.secondaryLight} ${colors.secondaryDark}`,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: colors.secondaryDark,
            width: '8px',
            height: '8px',
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 4,
            backgroundColor: colors.secondaryLight,
            border: `2px solid ${colors.secondaryDark}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkPaper,
          borderRadius: 4,
          boxShadow: shadows.card,
          transition: transitions.medium,
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: shadows.hover,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.gradientSecondary,
          boxShadow: shadows.medium,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 24px',
          transition: transitions.medium,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          background: colors.gradientPrimary,
          boxShadow: shadows.soft,
          '&:hover': {
            background: colors.gradientAccent,
            boxShadow: shadows.medium,
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            borderWidth: 2,
            borderColor: colors.primaryLight,
            color: colors.primaryLight,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          transition: transitions.quick,
          backgroundColor: colors.secondaryLight,
          color: colors.textPrimary,
          fontWeight: 500,
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: colors.secondary,
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: colors.secondaryLight,
          '&:hover': {
            borderColor: colors.primary,
            backgroundColor: `${colors.primary}1A`,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.darkPaper,
          borderRight: 'none',
          boxShadow: shadows.strong,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          margin: '4px 8px',
          transition: transitions.quick,
          '&:hover': {
            backgroundColor: colors.secondaryLight,
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: colors.secondary,
            '&:hover': {
              backgroundColor: colors.secondaryLight,
            },
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: colors.primary,
          transition: transitions.quick,
          '& .MuiRating-iconHover': {
            transform: 'scale(1.2)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          background: colors.gradientPrimary,
        },
        root: {
          '& .MuiTab-root': {
            transition: transitions.quick,
            '&:hover': {
              color: colors.primary,
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          color: colors.textSecondary,
          '&.Mui-selected': {
            color: colors.textPrimary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.darkPaper,
          boxShadow: shadows.card,
          borderRadius: 4,
        },
        elevation1: {
          boxShadow: shadows.soft,
        },
        elevation2: {
          boxShadow: shadows.medium,
        },
        elevation3: {
          boxShadow: shadows.strong,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          backgroundColor: colors.darkPaper,
          boxShadow: shadows.strong,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: colors.secondaryLight,
          transition: transitions.quick,
          '&.Mui-focused': {
            transform: 'translateY(-2px)',
          },
          '& input': {
            color: colors.textPrimary,
          },
          '&::placeholder': {
            color: colors.textSecondary,
            opacity: 0.7,
          },
        },
      },
    },
  },
});

export const darkTheme = lightTheme; // Netflix uses dark theme by default 