import Select from 'react-select'

const priorityOptions = [
  { value: 'None', label: 'None' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
]

const primaryColor = '#BADA55'
const focusColor = 'rgba(186, 217, 84, 0.5)'
const blackColor = '#495057'

const PrioritySelect = ({ className, placeholder, defaultValue, onChange }) => {
  const priorityStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? primaryColor : '#cccccc',
      boxShadow: state.isFocused ? `0 0 0 0.2rem ${focusColor}` : null,
      '&:hover': { borderColor: primaryColor },
      minHeight: 31,
      height: 31,
    }),

    valueContainer: (provided) => ({
      ...provided,
      top: '-0.2rem',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: 'inherit',
    }),

    option: (provided, state) => ({
      ...provided,
      padding: '2px 12px',
      color: blackColor,
      backgroundColor: state.isSelected
        ? primaryColor
        : state.isFocused
        ? focusColor
        : 'transparent',
    }),
  }

  return (
    <Select
      className={className}
      styles={priorityStyles}
      placeholder={placeholder}
      defaultValue={priorityOptions.find(
        (option) => option.value === defaultValue
      )}
      options={priorityOptions}
      onChange={(selected) => onChange(selected.value)}
    />
  )
}

export default PrioritySelect
