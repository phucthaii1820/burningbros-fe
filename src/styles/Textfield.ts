import { TextField, styled } from '@mui/material'
import { theme } from 'theme/theme.config'

export const Search = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '25px',
      padding: '12px, 16px, 12px, 16px',
      borderColor: theme.palette.grey[200],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}))

export const InputEdit = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '8px',
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  '.MuiInputBase-input': {
    padding: '6px 8px !important',
    fontSize: '16px !important',
    fontWeight: '600 !important',
  },
}))
