import {
  TableContainer,
  TableHead,
  Table,
  CardHeader,
  TableCell,
  TableRow,
  TableBody
} from '@mui/material'
import { ITableProps } from '../../interfaces'

const EnhancedTable = ({ title, subheader, headerCells }: ITableProps) => {
  return (
    <TableContainer>
      <CardHeader title={title} subheader={subheader} />
      <Table>
        <TableHead>
          <TableRow>
            {headerCells.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  )
}

export default EnhancedTable
