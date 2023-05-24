import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions, IconButton } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { addToCart } from '../cart/cartSlice'
import { IProduct } from '../../interfaces'

const Product = ({ id, image, name, price }: IProduct) => {
  const dispatch = useAppDispatch()
  // const handleAddToCart = () => {
  //   dispatch(
  //     addToCart({
  //       id,
  //       description,
  //       image,
  //       price,
  //       name,
  //       quantity: 1
  //     })
  //   )
  // }
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height={200} image={image} alt={name} loading="lazy" />
        <CardContent sx={{ padding: 0.5 }}>
          <Typography gutterBottom component="div" fontSize="1em" fontWeight="bold">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ borderTop: 1, borderTopStyle: 'dashed', borderTopColor: 'gray' }}>
        <Typography>€{price.toFixed(2)}</Typography>
        <IconButton sx={{ ml: 'auto', color: 'green' }} onClick={() => console.log(name)}>
          <AddShoppingCartOutlinedIcon />
        </IconButton>
        <NavLink to={`/products/${id}`}>
          <IconButton>
            <ArrowForward />
          </IconButton>
        </NavLink>
      </CardActions>
    </Card>
  )
}

export default Product
