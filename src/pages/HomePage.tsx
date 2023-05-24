import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'

import ProductList from '../features/products/ProductList'
import SmallScreenAppBar from '../components/SmallScreenAppBar'
import { useAppSelector } from '../app/hooks'
import { seletCurrentCategory } from '../features/page/pageTitleSlice'

const HomePage = () => {
  return (
    <Box>
      <SmallScreenAppBar />
      <ProductList />
    </Box>
  )
}

export default HomePage
