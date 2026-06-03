import type { SelectHTMLAttributes } from 'react';
import './dropdown.css';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
}

const Dropdown = ({ label, options, placeholder = 'Select option', id, ...props }: DropdownProps): React.ReactElement => {
  const selectId = id ?? `dropdown-${label?.replace(/\s+/g, '-').toLowerCase() ?? 'field'}`;

  return (
    <label className="ui-dropdown" htmlFor={selectId}>
      {label && <span>{label}</span>}
      <select id={selectId} {...props}>
        <option value="">{placeholder}</option>
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
};

export default Dropdown;
