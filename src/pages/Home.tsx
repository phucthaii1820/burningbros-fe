import React from 'react'
import { Box } from '@mui/material'

import { theme } from 'theme/theme.config'
import SearchInput from 'components/Search'
import Content from 'components/Content'
import { useQueries, useQueryClient } from 'react-query'
import { getProductsByCategory } from 'api/products'
import { IGetProductsApiResponse, IProduct } from 'types/product'

const Home = () => {
  const queryClient = useQueryClient()
  const [smartphoneData, setSmartphoneData] = React.useState<IProduct[] | []>([])
  const [laptopData, setLaptopData] = React.useState<IProduct[] | []>([])
  const [fragranceData, setFragranceData] = React.useState<IProduct[] | []>([])
  const [searchValue, setSearchValue] = React.useState('')
  const [searchResult, setSearchResult] = React.useState<IGetProductsApiResponse | []>([])

  useQueries([
    {
      queryKey: ['getProductsByCategory', 'smartphones'],
      queryFn: () => getProductsByCategory('smartphones'),
      onSuccess: (data: IGetProductsApiResponse) => {
        setSmartphoneData(data?.data?.products)
      },
    },
    {
      queryKey: ['getProductsByCategory', 'laptops'],
      queryFn: () => getProductsByCategory('laptops'),
      onSuccess: (data: IGetProductsApiResponse) => {
        setLaptopData(data?.data?.products)
      },
    },
    {
      queryKey: ['getProductsByCategory', 'fragrances'],
      queryFn: () => getProductsByCategory('fragrances'),
      onSuccess: (data: IGetProductsApiResponse) => {
        setFragranceData(data?.data?.products)
      },
    },
  ])

  const refetchFromCache = async () => {
    const smartphones = await queryClient.fetchQuery(['getProductsByCategory', 'smartphones'])
    const laptops = await queryClient.fetchQuery(['getProductsByCategory', 'laptops'])
    const fragrances = await queryClient.fetchQuery(['getProductsByCategory', 'fragrances'])

    console.log('smartphones', smartphones)
    console.log('laptops', laptops)
    console.log('fragrances', fragrances)
  }

  React.useEffect(() => {
    let productsLaptop = []
    let productsSmartphone = []
    let productsFragrance = []
    const data = searchResult instanceof Array ? [] : searchResult.data?.products

    if (searchResult) {
      productsLaptop = data.filter((item) => item.category === 'laptops')
      productsSmartphone = data.filter((item) => item.category === 'smartphones')
      productsFragrance = data.filter((item) => item.category === 'fragrances')

      setLaptopData(productsLaptop)
      setSmartphoneData(productsSmartphone)
      setFragranceData(productsFragrance)
    }
  }, [searchResult])

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
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          refetchQueries={refetchFromCache}
        />
        <Content
          smartphoneData={smartphoneData || []}
          laptopData={laptopData || []}
          fragranceData={fragranceData || []}
        />
      </Box>
    </Box>
  )
}

export default Home
