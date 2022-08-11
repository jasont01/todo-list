import Box from '@mui/material/Box'
import {
  formatDistanceToNow,
  differenceInDays,
  startOfDay,
  parseJSON,
} from 'date-fns'

const DueDate = ({ date }) => {
  const formatDate = () => {
    switch (differenceInDays(parseJSON(date), startOfDay(new Date()))) {
      case -1:
        return 'yesterday'
      case 0:
        return 'today'
      case 1:
        return 'tomorrow'
      default:
        return formatDistanceToNow(parseJSON(date), { addSuffix: true })
    }
  }

  return <Box sx={{ marginRight: '1em' }}>{formatDate()}</Box>
}
export default DueDate
