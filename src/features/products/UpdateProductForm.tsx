import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  SelectChangeEvent,
  OutlinedInput,
  InputAdornment
} from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { Camera } from '@mui/icons-material'
import { field } from './Styles'
import { useGetCategoriesQuery } from '../categories/categorySlice'
import { useGetProductsQuery, useUpdateProductMutation } from './productSlice'


const UpdateProductForm = () => {
  const { productId } = useParams()
  const {
    product,
    error,
    isLoading: loading,
    isSuccess
  } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading: loading, error, isSuccess }) => ({
      product: data?.filter((item) => item.id == productId) ?? [],
      error,
      isLoading: loading,
      isSuccess
    })
  })

  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const productObj = product && product[0]
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [formError, setFormError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (isSuccess) {
      setTitle(productObj.title)
      setDescription(productObj.description)
      setPrice(productObj.price.toString())
    }
  }, [isSuccess, productObj?.title, productObj?.category, productObj?.images[0], productObj?.price])
  const { data: categories } = useGetCategoriesQuery()

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }
  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
      const formData = new FormData()

      if (image) {
        formData.append('file', image)
        const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          const data = await response.json()
          if (data) {
            setImageUrl(data.location)
          }
        } else {
          setImageUrl('')
        }
      }
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTitleError(false)
    setDescriptionError(false)
    if (title === '') {
      setTitleError(true)
    }
    if (description === '') {
      setDescriptionError(true)
    }
   
    if (title && description  && price) {
      const itemPrice = +price
 
      //todo : fix image upload

      const product = {
        id:productId,
        title,
        description,
        category,
        images: imageUrl ? [imageUrl] : [],
        price: itemPrice
      }
      try {

      const res=   await updateProduct(product).unwrap()
  console.log(res)
        setTitle('')
        setDescription('')
        setImage(null)
        setPrice('')
        navigate('/')
      } catch (error) {
        setFormError(true)
      }
    }
  }
  return (
    <Container sx={{ marginTop: 2, height: '100vh', overflow: 'scroll' }}>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Update Product
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={field}
          label="Product Title"
          color="secondary"
          fullWidth
          multiline
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDescription(e.target.value)}
          sx={field}
          value={description}
          label="Description"
          color="secondary"
          fullWidth
          required
          multiline
          rows={8}
          error={descriptionError}
        />

        <Button
          color="primary"
          component="label"
          variant="contained"
          fullWidth
          endIcon={<Camera />}
          sx={{ mb: 2 }}>
         {imageUrl?<>Image uploaded</> :<>Upload new Image</> } 
          <input hidden accept="image/*" type="file" onChange={handleUploadImage} />
        </Button>
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel htmlFor="outlined-adornment-price" color="secondary">
            Price
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-price"
            type="number"
            value={price}
            color="secondary"
            onChange={handlePrice}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            label="Price"
          />
        </FormControl>
        <FormControl fullWidth sx={{ paddingBottom: 2 }}>
          <InputLabel id="category-select" color="secondary">
            Category
          </InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleCategory}
            color="secondary">
            {categories?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button  type="submit" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default UpdateProductForm
