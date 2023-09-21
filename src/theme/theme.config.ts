import { cyan } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { ThemeOptions as ThemeOptionsOld } from '@mui/material/styles/createTheme'

// Custom theme: Colors
const themeColors = {
  color: {
    primary: '#6713EF',
    secondary: '#353C49',
    error: '#FF4D4F',
    lightSilver: '#D9E0E8',
  },
} as const

// Override style Mui
const themeOptions: ThemeOptionsOld = {
  ...themeColors,
  palette: {
    primary: {
      light: '#F0E7FD',
      main: themeColors.color.primary,
      contrastText: '#000000',
    },
    secondary: {
      main: themeColors.color.secondary,
      contrastText: '#ffffff',
    },
    error: {
      main: themeColors.color.error,
    },
    grey: {
      100: '#F8F8F9',
      200: themeColors.color.lightSilver,
    },
  },
  typography: {
    fontFamily: ['Pretendard', 'sans-serif'].join(','),
    fontSize: 14,
    h4: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h5: {
      fontSize: '18px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root': {
            borderRadius: '2px',
            '& .MuiOutlinedInput-input': {
              padding: '7px 12px',
              borderRadius: '2px',
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.6,
              color: themeColors.color.secondary,
              fontFamily: 'Pretendard',
              '&::placeholder': {
                color: themeColors.color.lightSilver,
                opacity: 1,
              },
              '&::-ms-input-placeholder': {
                color: themeColors.color.lightSilver,
                opacity: 1,
              },
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard',
          padding: '4px 8px',
          borderRadius: '2px',
          textTransform: 'inherit',
          fontSize: '14px',
          '&.MuiButton-containedPrimary': {
            color: '#ffffff',
            backgroundColor: themeColors.color.primary,
            '&:hover': {
              backgroundColor: cyan[900],
            },
          },
        },
      },
    },
  },
}

// Create theme
export const theme = createTheme({ ...themeColors, ...themeOptions })
