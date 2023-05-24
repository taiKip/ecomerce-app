import { Button, Toolbar } from '@mui/material'
import CategoryItem from './CategoryItem'
import { useFetchCategoryByIdQuery, useGetCategoriesQuery } from './categoryApiSlice'
import { ReactNode, useEffect, useState } from 'react'
import { ICategory } from '../../interfaces'
import { useParams } from 'react-router-dom'

import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { mapRecursive } from './mapRecursive'
import { useAppDispatch } from '../../app/hooks'
import { setCategory } from './categorySlice'

const Categories = () => {
  const { categoryId } = useParams()
  const { data } = useGetCategoriesQuery()
  const dispatch = useAppDispatch()
  const [menu, setMenu] = useState<ICategory>()
  let parent: ICategory | null = null
  let currentCategory: ICategory
  let name = ''
  let description = ''

  if (data) {
    currentCategory = data[0]
    mapRecursive(data, (item) => {
      let id = categoryId || 1
      if (item.id == +id) {
        name = item.name
        description = item.description
        currentCategory = item
        parent = item
        return { ...item, open: !item.open }
      }
      return item
    })
  }
  console.log(parent)
  /**
   * @desc setup header titles on navbar
   */
  useEffect(() => {
    dispatch(setCategory({ name, description }))
    if (parent != null) {
      setMenu(parent)
    }
  }, [name, description])

  return (
    <>
      <SmallScreenAppBar />
      <Toolbar sx={{ gap: 2, overflowX: 'scroll' }}>
        <>{menu && <CategoryItem category={menu} disabled={Boolean(menu.categories)} />}</>
        <>
          {menu &&
            menu.categories &&
            menu.categories.map((childCategory) => (
              <CategoryItem
                key={childCategory.id}
                category={childCategory}
                disabled={Boolean(!menu.categories)}
              />
            ))}
        </>
      </Toolbar>
    </>
  )
}

export default Categories
