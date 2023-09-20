import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import ItemList from 'components/ItemList'
import { theme } from 'theme/theme.config'
import { IProduct } from 'types/product'

interface Props {
  smartphoneData: IProduct[] | []
  laptopData: IProduct[] | []
  fragranceData: IProduct[] | []
}

const Content = ({ smartphoneData, laptopData, fragranceData }: Props) => {
  return (
    <Box
      mt={4}
      sx={{
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Typography variant="h4">Product List</Typography>
        <Box>
          <Divider
            sx={{
              borderStyle: 'dashed',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 200px)',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[200],
            borderRadius: '4px',
          },
        }}
      >
        <ItemList title="Mobile" products={smartphoneData} category="smartphones" />
        <ItemList title="Desktop" products={laptopData} category="laptops" />
        <ItemList title="Tablet" products={fragranceData} category="fragrances" />
      </Box>
    </Box>
  )
}

export default Content
