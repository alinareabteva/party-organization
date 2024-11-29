import Select, {SelectChangeEvent, SelectProps} from "@mui/material/Select";
import {Checkbox, ListItemText, MenuItem} from "@mui/material";
import {useMemo} from "react";

export interface SelectOption {
  value: string | number;
  label: string;
}

type MultipleSelectProps<T> = {
  multiple: true;
  selectedOption: Array<T>;
  onChange: (e: SelectChangeEvent<Array<T>>) => void;
}

type SingleSelectProps<T> = {
  multiple: false;
  selectedOption: T;
  onChange: (e: SelectChangeEvent<T>) => void;
}


export type BaseSelectProps = Omit<SelectProps<SelectOption>, 'onChange'> & {
  options: Array<SelectOption>;
} & (MultipleSelectProps<SelectOption> | SingleSelectProps<SelectOption>)
//TODO: renderValue - need to allow override
const BaseSelect = ({selectedOption, onChange, options, multiple = false, renderValue, ...rest}: BaseSelectProps) => {

  const selectedOptionValues = useMemo(() => {
    console.log(selectedOption, options)
    return (Array.isArray(selectedOption) ? [...selectedOption] : [selectedOption])
      .map(o => o.value)

  }, [selectedOption])
  debugger

  return (
    <Select
      className="base-select"
      value={selectedOption as unknown as SelectOption}
      multiple={multiple}
      onChange={onChange as unknown as SelectProps['onChange']}
      displayEmpty
      renderValue={(selected) => (Array.isArray(selected) ? selected : [selected]).map(o => o.label).join(', ')}
      {...rest}
    >
      <MenuItem key={'empty'} value={''}>No value</MenuItem>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={selectedOptionValues.includes(option.value)}/>
          <ListItemText primary={option.label}/>
        </MenuItem>

      ))}
    </Select>
  );
};

export default BaseSelect;