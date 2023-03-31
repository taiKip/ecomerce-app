import { createContext, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'

import SingleProductPage from './features/products/SingleProductPage'
import UseTheme from './hooks/UseTheme'
import AddProductForm from './features/products/AddProductForm'
import UsersList from './features/users/UsersList'
import UpdateProductForm from './features/products/UpdateProductForm'
import Dashboard from './pages/Dashboard'
import { gapi } from 'gapi-script'
import { API_KEY, CLIENT_ID } from './secrets/apiKey'

export const ThemeContext = createContext({
  toggleColorMode: () => {
    /**/
  }
})

const App = () => {
  const { colorMode, theme } = UseTheme()
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID
      })
    }
    gapi.load('client:auth2', start)
  })
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
              <Route path=":productId" element={<SingleProductPage />} />

              <Route path="edit/:productId" element={<UpdateProductForm />} />
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":userId" element={<SingleProductPage />} />
                <Route path="create" element={<AddProductForm />} />
              </Route>
              <Route path="dashboard">
                <Route index element={<Dashboard />} />
                <Route path="create" element={<AddProductForm />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App
