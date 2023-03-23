import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import Corousel from '../components/corousel/Corousel'
import ProductList from '../features/products/ProductList'

const HomePage = () => {
  const slides = [
    { url: 'http://localhost:5173/building.jpg', title: 'building' },
    { url: 'http://localhost:5173/building.jpg', title: 'building' },
    { url: 'http://localhost:5173/building.jpg', title: 'building' }
  ]
  return (
    <Box>
      <Toolbar />
      <Corousel slides={slides} />
      <ProductList />
    </Box>
  )
}

export default HomePage
