import { Box } from '@mui/material'

import Product from './Product'
import { useGetProductsQuery } from './productSlice'
import Masonry from 'react-masonry-css'
import { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { useGetCategoriesQuery } from '../categories/categorySlice'
import { wrapperStyle, breakpointColumnsObj } from './Styles'

import EnhancedSelect from '../../components/EnhancedSelect'
import { sortItems } from '../../utils/SortValues'
import { sortArray } from '../../utils/Comparator'
import { sortType } from '../../types'
import { IProduct } from '../../interfaces'
const ProductList = () => {
  const { data } = useGetProductsQuery()
  const { data: categories } = useGetCategoriesQuery()
  const [sort, setSort] = useState<sortType>('' as sortType)
  const array1 = [
    { name: 'ken', score: 10 },
    { name: 'vic', score: 20 }
  ]
  let sortedArray: IProduct[] = []
  if (data) {
    sortedArray = [...data]
    switch (sort) {
      case 'nasc':
        sortedArray = sortArray([...data], { key: 'title', direction: 'asc' })
        break
      case 'ndesc':
        sortedArray = sortArray([...data], { key: 'title', direction: 'desc' })
        break
      case 'pasc':
        sortedArray = sortArray([...data], { key: 'price', direction: 'asc' })
        break
      case 'pdesc':
        sortedArray = sortArray([...data], { key: 'price', direction: 'desc' })
        break
      default:
        sortedArray = [...data]
        break
    }
  }
  return (
    <>
      <Box sx={wrapperStyle}>
        <EnhancedSelect items={sortItems} value={sort} handleChange={setSort} />
        <SearchBar />
      </Box>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {data &&
          sortedArray.map((item) => (
            <Product
              id={item.id}
              category={item.category}
              description={item.description}
              image={item.image}
              price={item.price}
              title={item.title}
              key={item.id}
            />
          ))}
      </Masonry>
    </>
  )
}

export default ProductList
