import React from 'react'

import { useQueryClient } from 'react-query'
import { Box, Collapse, IconButton, List, Typography } from '@mui/material'
import Product from 'components/Product'
import AppIcon from 'components/AppIcon'

import IconDown from 'assets/icons/ic_down.svg'
import IconRight from 'assets/icons/ic_right.svg'
import { IGetProductsApiResponse, IProduct } from 'types/product'
import { theme } from 'theme/theme.config'

// eslint-disable-next-line no-unused-vars
type Updater = (oldData: IGetProductsApiResponse) => IGetProductsApiResponse

interface ItemListProps {
  title: string
  products: IProduct[]
}

const ItemList = ({ title, products }: ItemListProps) => {
  const [open, setOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const handleClick = () => {
    setOpen(!open)
  }

  const handleEditProduct = (idP: number, titleP: string) => {
    queryClient.setQueryData<Updater>(['getProductsByCategory', 'smartphones'], (oldData: IGetProductsApiResponse) => {
      const newData = oldData?.data?.products.map((item: IProduct) => {
        if (item.id === idP) {
          return {
            ...item,
            title: titleP,
          }
        }
        return item
      })

      return {
        ...oldData,
        data: {
          ...oldData.data,
          products: newData,
        },
      }
    })
  }

  return (
    <Box mt={2}>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
            cursor: 'pointer',
          },
        }}
      >
        <IconButton onClick={handleClick}>{open ? <AppIcon src={IconDown} /> : <AppIcon src={IconRight} />}</IconButton>
        <Typography
          variant="h5"
          sx={{
            userSelect: 'none',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {products?.map((item: IProduct) => (
            <Product key={item.id} data={item} handleEditProduct={handleEditProduct} />
          ))}
        </List>
      </Collapse>
    </Box>
  )
}

export default ItemList
