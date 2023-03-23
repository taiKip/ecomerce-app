import { Box, Container, IconButton } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import classes from './Corousel.module.css'
import { DotButton } from './DotButton'
export type slide = {
  url: string
  title: string
}
const slider = [1, 2, 3, 4]
const Corousel = ({ slides }: { slides: slide[] }) => {
  return (
    <Container
      sx={{
        width: '100%',
        height: '40vh',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
      {slider.map((item, index) => {
        return (
          <div key={index} className={classes.corousel}>
            <img src={window.location.origin + `/assets/img${index + 1}.jpeg`} />
          </div>
        )
      })}
      <DotButton />
    </Container>
  )
}

export default Corousel
