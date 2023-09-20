import React from 'react'
import { Box } from '@mui/material'

import { theme } from 'theme/theme.config'
import SearchInput from 'components/Search'
import Content from 'components/Content'

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Box
        sx={{
          width: '480px',
          height: '832px',
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '24px',
        }}
      >
        <SearchInput />
        <Content />
      </Box>
    </Box>
  )
}

export default Home
