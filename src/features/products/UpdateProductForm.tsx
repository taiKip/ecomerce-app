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
import { useGetCategoriesQuery } from '../categories/categoryApiSlice'
import { useGetProductsQuery, useUpdateProductMutation } from './productApiSlice'
import { useUploadImageMutation } from '../uploadFile/uploadSlice'
import { IProduct } from '../../interfaces'
const UpdateProductForm = () => {
  const { productId } = useParams()
  const {
    product,
    error,
    isLoading: loading,
    isSuccess
  } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading: loading, error, isSuccess }) => ({
      product: data?.products.find((item) => item.id == +productId!),
      error,
      isLoading: loading,
      isSuccess
    })
  })

  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [uploadImage, { isError }] = useUploadImageMutation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [formError, setFormError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [newStock, setNewStock] = useState(20)
  useEffect(() => {
    if (isSuccess) {
      setName(product?.name ?? '')
      setDescription(product?.description ?? '')
      setPrice(product?.price.toString() ?? '')
    }
  }, [isSuccess, product?.name, product?.image, product?.price])
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
        await uploadImage(formData)
          .unwrap()
          .then((payload) => console.log(payload))
          .catch((error) => console.log(error))
        console.log('Uploading image')
      }
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setNameError(false)
    setDescriptionError(false)
    if (name === '') {
      setNameError(true)
    }
    if (description === '') {
      setDescriptionError(true)
    }

    if (name && description && price) {
      const itemPrice = +price

      //todo : fix image upload

      const product: IProduct = {
        id: +productId!,
        name,
        description,
        stock: newStock,
        image: imageUrl,
        price: itemPrice
      }
      try {
        console.log(product)
        const res = await updateProduct(product).unwrap()
        console.log(res)
        setName('')
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
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={field}
          label="Product Name"
          color="secondary"
          fullWidth
          multiline
          required
          error={nameError}
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
          disabled
          endIcon={<Camera />}
          sx={{ mb: 2 }}>
          {imageUrl ? <>Image uploaded</> : <>Upload new Image</>}
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

        <Button type="submit" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default UpdateProductForm
