import { Add } from '@mui/icons-material'
import { Button, Card, Paper, Stack, TableContainer, TableHead, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import EnhancedTable from '../components/Table/EnhancedTable'

const headerCells = ['#', 'Date', 'Status', 'Customer', 'Purchased', 'Revenue', 'actions']
const Dashboard = () => {
  return (
    <Stack spacing={2} paddingTop={3}>
      <Link to="/dashboard/create" style={{ marginLeft: 'auto' }}>
        <Button variant="contained" color="inherit" startIcon={<Add />}>
          Add New product
        </Button>
      </Link>

      <Card>
        <EnhancedTable
          title={'Orders'}
          subheader={'Orders that need to be fullfilled'}
          headerCells={headerCells}
        />
      </Card>
    </Stack>
  )
}

export default Dashboard
