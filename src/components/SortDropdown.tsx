// src/components/SortDropdown.tsx
import { ChevronDown } from 'lucide-react'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const options = [
    { value: 'name', label: 'Name' },
    { value: 'risk', label: 'Risk' },
    { value: 'returns', label: 'Expected Returns' }
  ]

  return (
    <div className="relative inline-block text-left">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-primary text-text rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  )
}

export default SortDropdown