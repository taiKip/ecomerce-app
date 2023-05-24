import StarIcon from '@mui/icons-material/Star'
const array = [1, 2, 3, 4, 5]
const StarRating = () => {
  return (
    <div>
      {array.map((star) => (
        <label key={star}>
          <StarIcon fontSize={'medium'} />
        </label>
      ))}
    </div>
  )
}

export default StarRating
