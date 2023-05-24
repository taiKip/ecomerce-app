import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Typography
} from '@mui/material'
import { FormEvent, useState, ChangeEvent } from 'react'
import { field } from './Styles'

const AddReviewForm = ({ open, toggle }: { open: boolean; toggle: () => void }) => {
  const [rating, setRating] = useState<number | null>(5)
  const [review, setReview] = useState('')
  const handleClose = () => {
    toggle()
  }

  const handleChangeReview = (event: ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value)
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="add review"
      aria-describedby="add a review to  product">
      <DialogTitle>Add Review 😊 </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography component={'legend'} color={'grayText'}>
              Rating
            </Typography>
            <Rating
              name="Overall rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
            <TextField
              onChange={handleChangeReview}
              sx={field}
              label="Review"
              color="secondary"
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Button variant="outlined">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddReviewForm
