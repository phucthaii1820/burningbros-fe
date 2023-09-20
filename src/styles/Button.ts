import { Button, styled } from '@mui/material'
import { theme } from 'theme/theme.config'

export const ButtonCustom = styled(Button)({
  borderRadius: '8px',
  padding: '12px 16px',
  color: 'black',
  fontSize: '14px',
  height: '42px',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  '&:active': {
    backgroundColor: theme.palette.grey[200],
  },
})
