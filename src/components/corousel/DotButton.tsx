import { Button } from '@mui/material'
import classes from './Corousel.module.css'
import React from 'react'

export const DotButton = () => {
  return (
    <div className={classes.dotbuttons}>
      <button className={classes.dotbutton}></button>
      <button className={classes.dotbutton}></button>
      <button className={classes.dotbutton}></button>
      <button className={classes.dotbutton}></button>
    </div>
  )
}
