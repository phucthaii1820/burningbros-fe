import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import ItemList from 'components/ItemList'
import { useQueries } from 'react-query'
import { getProductsByCategory } from 'api/products'
import { theme } from 'theme/theme.config'

const Content = () => {
  const [{ data: smartphoneData }, { data: laptopData }, { data: fragranceData }] = useQueries([
    {
      queryKey: ['getProductsByCategory', 'smartphones'],
      queryFn: () => getProductsByCategory('smartphones'),
    },
    {
      queryKey: ['getProductsByCategory', 'laptops'],
      queryFn: () => getProductsByCategory('laptops'),
    },
    {
      queryKey: ['getProductsByCategory', 'fragrances'],
      queryFn: () => getProductsByCategory('fragrances'),
    },
  ])

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
        <ItemList title="Mobile" products={smartphoneData?.data?.products} />
        <ItemList title="Desktop" products={laptopData?.data?.products} />
        <ItemList title="Tablet" products={fragranceData?.data?.products} />
      </Box>
    </Box>
  )
}

export default Content
