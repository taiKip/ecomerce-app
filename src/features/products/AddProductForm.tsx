import React, { FormEvent, useState, ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  SelectChangeEvent,
  OutlinedInput,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { Camera } from '@mui/icons-material'
import { useGetCategoriesQuery } from '../categories/categorySlice'
import { useAddNewProductMutation, useUpdateProductMutation } from './productSlice'
import { field } from './Styles'
import { useUploadImageMutation } from '../uploadFile/uploadSlice'

const AddProductForm = () => {
  const [addNewProduct, { isLoading }] = useAddNewProductMutation()

  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [formError, setFormError] = useState(false)

  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageError, setImageError] = useState(false)
  const [imageLoading,setImageLoading] =useState(false)

  const { data: addresses } = useGetCategoriesQuery()
  const [uploadImage, { isError, isLoading: loading, isSuccess }] = useUploadImageMutation()

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }
  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }
  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
    }
    const formData = new FormData()
    if (image) {
      formData.append('file', image)
      try {
        const res = await uploadImage(formData).unwrap()
        console.log(res)
      } catch (error) {
        setFormError(true)
      }
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setFormError(false)
    console.log(imageUrl)
    setTitleError(false)
    setDescriptionError(false)
    if (title === '') {
      setTitleError(true)
    }
    if (description === '') {
      setDescriptionError(true)
    }

    if (title && description && category) {
      console.log('in save')
      const itemPrice = +price
      const id = uuidv4()
      const product = { id, title, description, category, image: imageUrl, price: itemPrice }
      console.log(product)
      try {
        await addNewProduct(product).unwrap()
        console.log(product)
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
    <Container sx={{ paddingTop: 6, height: '100vh', overflow: 'scroll' }}>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Add New Product
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {formError && (
          <Typography color="error" display={'flex'} alignItems={'center'}>
            Something went wrong
            <SentimentVeryDissatisfiedIcon />
          </Typography>
        )}
        <TextField
          onChange={handleTitle}
          sx={field}
          label="Product Title"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={handleDescription}
          sx={field}
          label="Description"
          color="secondary"
          fullWidth
          required
          multiline
          rows={2}
          error={descriptionError}
        />
        {imageError && (
          <Typography color="error" display={'flex'} alignItems={'center'}>
            Something went wrong
            <SentimentVeryDissatisfiedIcon />
          </Typography>
        )}
        <Button
          color="primary"
          component="label"
          variant="contained"
          fullWidth
          endIcon={
            imageLoading ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              <Camera color="success" />
            )
          }
          sx={{ mb: 2 }}>
          Upload Image
          <input hidden accept="image/*" type="file" onChange={handleUploadImage} />
        </Button>
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel htmlFor="outlined-adornment-price" color="secondary">
            Price
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-price"
            type="number"
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
            {addresses?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default AddProductForm
