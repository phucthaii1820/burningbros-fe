import React from 'react'

import { useQueryClient } from 'react-query'
import { Box, Collapse, List, Typography } from '@mui/material'
import Product from 'components/Product'
import AppIcon from 'components/AppIcon'

import IconRight from 'assets/icons/ic_right.svg'
import { IGetProductsApiResponse, IProduct } from 'types/product'
import { theme } from 'theme/theme.config'

import localStore from 'stores/store'

// eslint-disable-next-line no-unused-vars
type Updater = (oldData: IGetProductsApiResponse) => IGetProductsApiResponse

interface ItemListProps {
  title: string
  products: IProduct[]
  category: string
}

const ItemList = ({ title, products, category }: ItemListProps) => {
  const searchValue = localStore((state) => state.searchValue)
  const [open, setOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const handleClick = () => {
    setOpen(!open)
  }

  const handleEditProduct = (idP: number, titleP: string) => {
    queryClient.setQueryData<Updater>(['getProductsByCategory', category], (oldData: IGetProductsApiResponse) => {
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

    queryClient.setQueriesData<Updater>(['searchProducts', searchValue], (oldData: IGetProductsApiResponse) => {
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
        <AppIcon
          src={IconRight}
          sx={{
            margin: '16px',
            userSelect: 'none',
            rotate: open ? '90deg' : '0deg',
          }}
        />
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
