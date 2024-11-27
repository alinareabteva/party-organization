import Select, {SelectChangeEvent, SelectProps} from "@mui/material/Select";
import {Checkbox, ListItemText, MenuItem} from "@mui/material";
import {useMemo} from "react";

export interface SelectOption {
  value: string | number;
  label: string;
}

export type BaseSelectProps = SelectProps<SelectOption> & {
  selectedOption: SelectOption | Array<SelectOption>;
  options: Array<SelectOption>;
  onChange: (e: SelectChangeEvent<SelectOption | Array<SelectOption>>) => void;
}
//TODO: renderValue - need to allow override
const BaseSelect = ({selectedOption, onChange, options, multiple = false, renderValue, ...rest}: BaseSelectProps) => {

  const selectedOptionValues = useMemo(() => {
    return (Array.isArray(selectedOption) ? [...selectedOption] : [selectedOption])
      .map(o => o.value)

  }, [selectedOption])

  return (
    <Select
      className="base-select"
      value={selectedOption}
      multiple={multiple}
      onChange={onChange}
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