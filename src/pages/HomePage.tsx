import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'

import ProductList from '../features/products/ProductList'
import SmallScreenAppBar from '../components/SmallScreenAppBar'

const HomePage = () => {
  return (
    <Box>
      <SmallScreenAppBar extraInfo="value for money" title="Products" />
      <Toolbar />

      <ProductList />
    </Box>
  )
}

export default HomePage
