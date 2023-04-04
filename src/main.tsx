import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './app/store'
import App from './App'
import './index.css'
import { extendedProductsApiSlice } from './features/products/productSlice'
import { extendedCategoriesApiSlice } from './features/categories/categorySlice'
import { extendedOrdersApiSlice } from './features/orders/orderSlice'

store.dispatch(extendedProductsApiSlice.endpoints.getProducts.initiate())
store.dispatch(extendedCategoriesApiSlice.endpoints.getCategories.initiate())
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
)
