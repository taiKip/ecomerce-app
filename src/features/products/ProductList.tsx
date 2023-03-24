import { Toolbar, Typography, Box, FormControl } from '@mui/material'
import { Container } from '@mui/system'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import Product from './Product'
import { useGetProductsQuery } from './productSlice'
import Masonry from 'react-masonry-css'
import { useState } from 'react'
import SearchBar from '../../components/SearchBar'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
}
const ProductList = () => {
  const { data } = useGetProductsQuery()
  const [category, setCategory] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    setCategory(event.target.value)
  }
  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center'
        }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small" color="secondary">
            Category
          </InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={category}
            label="Category"
            color="secondary"
            onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <SearchBar />
      </Box>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {data &&
          data.map((item) => (
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
