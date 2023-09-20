import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { IProduct } from 'types/product'
import AppIcon from 'components/AppIcon'
import { theme } from 'theme/theme.config'
import { InputEdit } from 'styles/Textfield'

interface ProductProps {
  data: IProduct
  // eslint-disable-next-line no-unused-vars
  handleEditProduct: (id: number, title: string) => void
}

const Product = ({ data, handleEditProduct }: ProductProps) => {
  const [edit, setEdit] = React.useState(false)
  const [title, setTitle] = React.useState(data.title)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEdit(false)
      handleEditProduct(data.id, title)
    }
  }

  return (
    <Box
      sx={{
        padding: '12px 16px',
        borderRadius: '8px',
        '&:hover': {
          cursor: 'pointer',
          border: `1px solid ${theme.palette.primary.light}`,
        },
      }}
    >
      <Grid container>
        <Grid item md={2.5}>
          <AppIcon
            src={data.thumbnail}
            wh="72px"
            sx={{
              borderRadius: '8px',
              objectFit: 'cover',
              userSelect: 'none',
            }}
          />
        </Grid>
        <Grid
          item
          md={9.5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {edit ? (
            <InputEdit
              onKeyUp={handleKeyPress}
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value)
              }}
            />
          ) : (
            <Typography
              variant="h6"
              sx={{
                p: 0.5,
                userSelect: 'none',
                borderRadius: '8px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                '&:active': {
                  backgroundColor: theme.palette.grey[200],
                },
              }}
              onClick={() => {
                setEdit(true)
              }}
            >
              {data.title}
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{
              p: 0.5,
              userSelect: 'none',
            }}
          >
            $ {data.price}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Product
