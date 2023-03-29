import { createContext } from 'react'

import { Routes, Route } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'

import SingleProductPage from './features/products/SingleProductPage'
import UseTheme from './hooks/UseTheme'
import AddProductForm from './features/products/AddProductForm'
import UsersList from './features/users/UsersList'
import UpdateProductForm from './features/products/UpdateProductForm'

export const ThemeContext = createContext({
  toggleColorMode: () => {
    /**/
  }
})

const App = () => {
  const { colorMode, theme } = UseTheme()
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
              <Route path="create" element={<AddProductForm />} />
              <Route path="edit/:productId" element={<UpdateProductForm />} />
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":userId" element={<SingleProductPage />} />
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
