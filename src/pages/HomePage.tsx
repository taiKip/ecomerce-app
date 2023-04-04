import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'

import ProductList from '../features/products/ProductList'

const HomePage = () => {
  return (
    <Box>
      <Toolbar />
      <ProductList />
    </Box>
  )
}

export default HomePage
