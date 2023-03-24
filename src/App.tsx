import { useState, useMemo, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import { Button, Box, Grid, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { RootState } from './app/store'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import { Snowshoeing } from '@mui/icons-material'
import SingleProductPage from './features/products/SingleProductPage'

export const ThemeContext = createContext({
  toggleColorMode: () => {
    /**/
  }
})

const App = () => {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    const localData = localStorage.getItem('theme')
    return localData ? JSON.parse(localData) : 'light'
  })
  localStorage.setItem('theme', JSON.stringify(mode))
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#fefefe'
          },
          secondary: purple,
          mode: mode
        },

        typography: {
          fontFamily: 'Quicksand',
          fontWeightLight: 400,
          fontWeightRegular: 500,
          fontWeightMedium: 600,
          fontWeightBold: 700,
          button: {
            textTransform: 'none'
          }
        },
        components: {
          MuiCardMedia: {
            styleOverrides: {
              root: {
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform .3s ease-in-out'
                },
                objectFit: 'cover'
              }
            }
          }
        }
      }),
    [mode]
  )
  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <main
          style={{
            background: theme.palette.mode === 'dark' ? 'black' : ''
          }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path=":propertyId" element={<SingleProductPage />} />
            </Route>
          </Routes>
        </main>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App
