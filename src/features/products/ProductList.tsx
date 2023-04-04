import { Box, Typography } from '@mui/material'
import Product from './Product'
import { useGetProductsQuery } from './productSlice'
import Masonry from 'react-masonry-css'
import { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { wrapperStyle, breakpointColumnsObj } from './Styles'
import EnhancedSelect from '../../components/EnhancedSelect'
import { sortItems } from '../../utils/functions/SortValues'
import { sortArray } from '../../utils/functions/Comparator'
import { sortType } from '../../types'
import { IProduct } from '../../interfaces'
import useDebounce from '../../utils/hooks/useDebounce'
import { SentimentVeryDissatisfied } from '@mui/icons-material'

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
      <Box sx={wrapperStyle}>
        <EnhancedSelect items={sortItems} value={sort} handleChange={setSort} />
        <SearchBar handleSearch={setSearchItem} searchValue={searchItem} />
      </Box>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {data && sortedArray.length !== 0 ? (
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
          ))
        ) : (
          <Typography color="purple" display={'flex'} alignItems={'center'} gap={1}>
            Product does not exist
            <SentimentVeryDissatisfied />
          </Typography>
        )}
      </Masonry>
    </>
  )
}

export default ProductList
