import React from 'react'

import { InputAdornment } from '@mui/material'
import { Search } from 'styles/Textfield'
import AppIcon from 'components/AppIcon'
import iconSearch from 'assets/icons/ic_search.svg'
import iconSearchBlur from 'assets/icons/ic_search_blur.svg'
import iconClear from 'assets/icons/ic_clear.svg'
import { theme } from 'theme/theme.config'

const SearchInput = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [focused, setFocused] = React.useState(false)

  return (
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
            <AppIcon
              src={iconClear}
              sx={{
                cursor: 'pointer',
                visibility: searchValue ? 'visible' : 'hidden',
              }}
              onClick={() => setSearchValue('')}
            />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.grey[100],
          borderRadius: '25px',
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
    />
  )
}

export default SearchInput
