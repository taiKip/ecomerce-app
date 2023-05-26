import { Box, Typography, Toolbar } from '@mui/material'
import Product from './Product'
import { useGetProductsQuery } from './productApiSlice'
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
import { useGetCategoriesQuery } from '../categories/categoryApiSlice'

const ProductList = () => {
  const { data } = useGetProductsQuery()
  let products: IProduct[] = []
  const [sort, setSort] = useState<sortType>('' as sortType)
  const [searchItem, setSearchItem] = useState<string>('')
  const debounceSearchValue = useDebounce(searchItem, 500)

  // if (debounceSearchValue !== '' && data) {
  //   sortedArray = [...data].filter((item) => item.title.toLowerCase().includes(debounceSearchValue))
  // }
  if (data) {
    products = data.products
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
        {products &&
          products &&
          products.map((item) => (
            <Product
              stock={item.stock}
              reviews={item.reviews}
              id={item.id}
              description={item.description}
              image={item.image}
              price={item.price}
              name={item.name}
              key={item.id}
            />
          ))}
      </Wrapper>
    </>
  )
}

export default ProductList
