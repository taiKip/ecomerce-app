import { Skeleton, Toolbar } from '@mui/material'
import CategoryItem from './CategoryItem'
import { useGetCategoriesQuery } from './categoryApiSlice'
import { useEffect, useState } from 'react'
import { ICategory } from '../../interfaces'
import { useParams } from 'react-router-dom'

import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { mapRecursive } from './mapRecursive'
import { useAppDispatch } from '../../app/hooks'
import { setPageInfo } from '../page/pageInfoSlice'
const skeletonArray = [1, 2, 3, 4]
const Categories = () => {
  const { categoryId } = useParams()
  const { data, isLoading, isError, isSuccess } = useGetCategoriesQuery()
  const dispatch = useAppDispatch()
  const [menu, setMenu] = useState<ICategory>()
  let parent: ICategory | null = null
  let name = ''
  let description = ''

  if (data && data.length > 0) {
    mapRecursive(data, (item) => {
      const id = categoryId || 1
      if (item.id == +id) {
        name = item.name
        description = item.description

        parent = item
        return { ...item }
      }
      return item
    })
  }

  /**
   * @desc setup Infos on navbar
   */
  useEffect(() => {
    dispatch(setPageInfo({ name, description }))
    if (parent != null) {
      setMenu(parent)
    }
  }, [name, description])

  return (
    <>
      <SmallScreenAppBar />
      <Toolbar sx={{ gap: 2, overflowX: 'scroll' }}>
        <>
          {menu ? (
            <CategoryItem category={menu} disabled={Boolean(menu.categories)} />
          ) : (
            skeletonArray.map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                animation="wave"
                width={'80px'}
                height={'30px'}
                sx={{ borderRadius: 1 }}
              />
            ))
          )}
        </>
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
