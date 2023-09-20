import React from 'react'

import { Box, IconButton, InputAdornment } from '@mui/material'
import { Search } from 'styles/Textfield'
import AppIcon from 'components/AppIcon'
import iconSearch from 'assets/icons/ic_search.svg'
import iconSearchBlur from 'assets/icons/ic_search_blur.svg'
import CloseIcon from '@mui/icons-material/Close'
import { theme } from 'theme/theme.config'
import { ButtonCustom } from 'styles/Button'
import { useQuery } from 'react-query'
import { searchProducts } from 'api/products'
import { IGetProductsApiResponse } from 'types/product'

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
  const [focused, setFocused] = React.useState(false)
  const [onSearch, setOnSearch] = React.useState(false)
  const [isEnable, setIsEnable] = React.useState(false)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setOnSearch(true)
      setIsEnable(true)
    }
  }

  useQuery({
    queryKey: ['searchProducts', searchValue],
    queryFn: () => searchProducts(searchValue),
    onSuccess: (data: IGetProductsApiResponse) => {
      setSearchResult(data)
      setIsEnable(false)
    },
    enabled: isEnable,
  })

  React.useEffect(() => {
    if (onSearch) {
      setIsEnable(false)
    }
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
              <IconButton onClick={() => setSearchValue('')} sx={{ visibility: searchValue ? 'visible' : 'hidden' }}>
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
            setSearchValue('')
            setOnSearch(false)
            refetchQueries()
          }}
        >
          Cancel
        </ButtonCustom>
      )}
    </Box>
  )
}

export default SearchInput
