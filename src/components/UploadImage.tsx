import { CircularProgress, Button } from '@mui/material'
import { Camera } from '@mui/icons-material'

const UploadImage = () => {
  const handleUploadImage = () => {}
  return (
    <Button
      color="primary"
      component="label"
      variant="contained"
      fullWidth
      endIcon={
        imageLoading ? <CircularProgress color="secondary" size={20} /> : <Camera color="success" />
      }
      sx={{ mb: 2 }}>
      Upload Image
      <input hidden accept="image/*" type="file" onChange={handleUploadImage} />
    </Button>
  )
}

export default UploadImage
