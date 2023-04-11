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

const Product = ({ id, category, description, image, price, title }: IProduct) => {
  const dispatch = useAppDispatch()
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        category,
        description,
        image,
        price,
        title,
        quantity: 1
      })
    )
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="25%" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ borderTop: 1, borderTopStyle: 'dashed', borderTopColor: 'gray' }}>
        <Typography>€{price.toFixed(2)}</Typography>
        <IconButton sx={{ ml: 'auto', color: 'green' }} onClick={handleAddToCart}>
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
