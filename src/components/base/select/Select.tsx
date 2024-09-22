export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProp {
  label: string;
  selectedOption: SelectOption['value'] | Array<SelectOption['value']>;
  options: Array<SelectOption>;
  allowMultiple?: boolean;
  onChange: (value: SelectOption) => void;
}

const Select = ({selectedOption, label, onChange, options, allowMultiple = false}: SelectProp) => {


  const findOptionByValue = (value: SelectOption['value']) => {
    return options.find(option => option.value === value)
  }

  const onClick = (event: React.MouseEvent<HTMLOptionElement>) => {
    const {value} = event.currentTarget
    const selectOption = findOptionByValue(value);
    if (selectOption) {
      onChange(selectOption)
    }
  }

  return (
    <>
      <label className="select-label">
        {label}
      </label>
        <select
          className="base-select"
          value={selectedOption}
          onChange={() => {
          }}
          multiple={allowMultiple}
        >
          {options.map(option => (
            <option
              className="base-option"
              key={option.value}
              value={option.value}
              onMouseDown={onClick}
            >
              {option.label}
            </option>
          ))}
        </select>
      </>
  );
};

export default Select;