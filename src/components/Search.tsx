import React from 'react'

import { Box, IconButton, InputAdornment } from '@mui/material'
import { Search } from 'styles/Textfield'
import AppIcon from 'components/AppIcon'
import iconSearch from 'assets/icons/ic_search.svg'
import iconSearchBlur from 'assets/icons/ic_search_blur.svg'
import CloseIcon from '@mui/icons-material/Close'
import { theme } from 'theme/theme.config'
import { ButtonCustom } from 'styles/Button'
import { useQuery, useQueryClient } from 'react-query'
import { searchProducts } from 'api/products'
import { IGetProductsApiResponse } from 'types/product'

import localStore from 'stores/store'

interface SearchInputProps {
  searchValue: string
  // eslint-disable-next-line no-unused-vars
  setSearchValue: (value: string) => void
  // eslint-disable-next-line no-unused-vars
  setSearchResult: (value: IGetProductsApiResponse | []) => void
  searchResult: IGetProductsApiResponse | []
  refetchQueries: () => void
}

const SearchInput = ({
  searchValue,
  setSearchValue,
  searchResult,
  setSearchResult,
  refetchQueries,
}: SearchInputProps) => {
  const queryClient = useQueryClient()
  const [focused, setFocused] = React.useState(false)
  const [onSearch, setOnSearch] = React.useState(false)
  const [isEnable, setIsEnable] = React.useState(false)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      localStore.setState({
        searchValue,
      })
      setOnSearch(true)
      setIsEnable(true)
    }
  }

  useQuery<IGetProductsApiResponse | []>(
    ['searchProducts', searchValue],
    async () => {
      const dataFromCache = queryClient.getQueryData<IGetProductsApiResponse>(['searchProducts', searchValue])

      if (dataFromCache) {
        return dataFromCache
      }

      const response = await searchProducts(searchValue)
      return response
    },
    {
      enabled: isEnable,
      onSuccess: (data) => {
        setSearchResult(data)
      },
    },
  )

  React.useEffect(() => {
    if (onSearch) {
      setIsEnable(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult])

  return (
    <Box>
      <Search
        focused={focused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {focused || searchValue ? (
                <AppIcon src={iconSearch} wh="18px" />
              ) : (
                <AppIcon src={iconSearchBlur} wh="18px" />
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setSearchValue('')
                  localStore.setState({
                    searchValue: '',
                  })
                }}
                sx={{ visibility: searchValue ? 'visible' : 'hidden' }}
              >
                <CloseIcon
                  sx={{
                    width: '12px',
                    height: '12px',
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.grey[100],
            borderRadius: '25px !important',
            '& fieldset': {
              borderRadius: '25px',
              padding: '12px, 16px, 12px, 16px',
              borderColor: searchValue ? theme.palette.secondary.main : theme.palette.grey[200],
            },
          },
        }}
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      {onSearch && (
        <ButtonCustom
          sx={{
            ml: 1,
          }}
          onClick={() => {
            localStore.setState({
              searchValue: '',
            })
            setSearchValue('')
            setOnSearch(false)
            refetchQueries()
            setSearchResult([])
          }}
        >
          Cancel
        </ButtonCustom>
      )}
    </Box>
  )
}

export default SearchInput
