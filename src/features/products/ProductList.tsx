import { Toolbar, Typography, Box, FormControl, Button } from '@mui/material'
import { Container } from '@mui/system'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import Product from './Product'
import { useGetProductsQuery } from './productSlice'
import Masonry from 'react-masonry-css'
import { ChangeEvent, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { useGetCategoriesQuery } from '../categories/categorySlice'
import { wrapperStyle, breakpointColumnsObj } from './Styles'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const { data } = useGetProductsQuery()
  const { data: categories } = useGetCategoriesQuery()
  const [category, setCategory] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    setCategory(event.target.value)
  }

  return (
    <>
      <Box sx={wrapperStyle}>
        <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
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
            {categories?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SearchBar />
        <Link to="/create">
          <Button variant="contained" color="primary">
            Add New product
          </Button>
        </Link>
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
