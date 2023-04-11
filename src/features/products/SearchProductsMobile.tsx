import React, { useState } from 'react'

import {  AppBar, Toolbar } from '@mui/material'

import SearchBar from '../../components/SearchBar'
const SearchProductsMobilePage = () => {
  const [searchHistoryArray, setSearchHistoryArray] = useState([])
  const [searchValue, setSearchValue] = useState<string>('')
  return (
    <>
      <AppBar>
        <Toolbar>
          <SearchBar handleSearch={setSearchValue} searchValue={searchValue} />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default SearchProductsMobilePage
