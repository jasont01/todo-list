import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const PrioritySelect = ({ value, setPriority }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='priority-select-label'>Priority</InputLabel>
        <Select
          labelId='priority-select-label'
          id='priority-select'
          value={value}
          label='Priority'
          size='small'
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value={'none'}>None</MenuItem>
          <MenuItem value={'high'}>High</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'low'}>Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default PrioritySelect
