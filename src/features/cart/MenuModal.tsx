import { Menu } from '@mui/material'
import { ReactNode } from 'react'

const MenuModal = ({
  anchorEl,
  onClose,
  children,
  id
}: {
  anchorEl: HTMLElement | null
  onClose: () => void
  children: ReactNode
  id: string
}) => {
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}>
      {children}
    </Menu>
  )
}

export default MenuModal
