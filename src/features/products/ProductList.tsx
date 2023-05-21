import { Box, Typography, Toolbar } from '@mui/material'
import Product from './Product'
import { useGetProductsQuery } from './productSlice'
import { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { wrapperStyle } from './Styles'
import EnhancedSelect from '../../components/EnhancedSelect'
import { sortItems } from '../../utils/functions/extraValues'
import { sortArray } from '../../utils/functions/Comparator'
import { sortType } from '../../types'
import { IProduct } from '../../interfaces'
import useDebounce from '../../utils/hooks/useDebounce'
import Wrapper from '../../components/Wrapper'
import Corousel from '../../components/Corousel'
import Categories from '../categories/Categories'
import { useParams } from 'react-router-dom'

const ProductList = () => {
  const { data } = useGetProductsQuery()
  const [sort, setSort] = useState<sortType>('' as sortType)
  const [searchItem, setSearchItem] = useState<string>('')
  const debounceSearchValue = useDebounce(searchItem, 500)
  let sortedArray: IProduct[] = []
  if (data) {
    sortedArray = [...data]
    switch (sort) {
      case 'nasc': //sort by name asc
        sortedArray = sortArray([...data], { key: 'title', direction: 'asc' })
        break
      case 'ndesc': //sort by name desc
        sortedArray = sortArray([...data], { key: 'title', direction: 'desc' })
        break
      case 'pasc': //sort by price ascending
        sortedArray = sortArray([...data], { key: 'price', direction: 'asc' })
        break
      case 'pdesc': //sort by price descending
        sortedArray = sortArray([...data], { key: 'price', direction: 'desc' })
        break
      default:
        sortedArray = [...data]
        break
    }
  }
  if (debounceSearchValue !== '' && data) {
    sortedArray = [...data].filter((item) => item.title.toLowerCase().includes(debounceSearchValue))
  }

  return (
    <>
      <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
      <Categories />
      <Box sx={wrapperStyle}>
        <EnhancedSelect items={sortItems} value={sort} handleChange={setSort} />
        <Box component={'span'} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SearchBar handleSearch={setSearchItem} searchValue={searchItem} />
        </Box>
      </Box>
      <Wrapper>
        <Corousel />
        {data && sortedArray.length !== 0 ? (
          sortedArray.map((item) => (
            <Product
              id={item.id}
              category={item.category}
              description={item.description}
              images={item.images}
              price={item.price}
              title={item.title}
              key={item.id}
            />
          ))
        ) : (
          <Typography color="purple" display={'flex'} alignItems={'center'} gap={1}>
            Loading...
          </Typography>
        )}
      </Wrapper>
    </>
  )
}

export default ProductList
