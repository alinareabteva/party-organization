import dayjs, {Dayjs} from "dayjs";
import "./GuestComponent.scss"
import BaseInput from "../../../../components/base/base-input/BaseInput.tsx";
import {ChangeEvent, useMemo} from "react";
import BaseSelect, {SelectOption} from "../../../../components/base/base-select/BaseSelect.tsx";
import BaseIcon, {IconNames} from "../../../../components/base/icon/BaseIcon.tsx";
import {ALCOHOL_NAMES} from "../../../constants.ts";
import {ErrorState} from "../../../../components/validation";
import {DatePicker} from "@mui/x-date-pickers";
import {FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";

export enum Gender {
  M = 'M',
  F = 'F'
}

const MIN_DATE = dayjs(new Date(1960, 8, 18))
const MAX_DATE = dayjs().subtract(18, "year")


export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Dayjs | null;
  gender: Gender;
  alcohol: Array<AlcoholDto>;
}


export interface AlcoholDto {
  id: string;
  name: string;
}


export interface GuestComponentsProps extends Guest {
  onChange: (id: string, partOfGuest: Partial<Guest>) => void;
  onClickDelete: (id: string) => void;
  errors: ErrorState<Guest>;
}

const mapAlcoholToOption = (alcohol: AlcoholDto): SelectOption => {
  return {
    label: alcohol.name,
    value: alcohol.id
  }
}

const GuestComponent = ({
                          id,
                          firstName,
                          lastName,
                          birthDate,
                          gender,
                          onChange,
                          alcohol,
                          onClickDelete,
                          errors
                        }: GuestComponentsProps) => {

  const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    onChange(id, {[name]: value})
  }

  const handleDateChange = (date: Dayjs | null) => {
    onChange(id, {birthDate: date})
  }

  const handleGenderChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    onChange(id, {gender: value as Gender})
  }

  const alcoholOptions = useMemo(() => {
    return ALCOHOL_NAMES.map(mapAlcoholToOption)
  }, [ALCOHOL_NAMES])

  const selectedAlcoholOptions = useMemo(() => {
    return alcohol.map(({id, name}) => ({
      value: id,
      label: name
    }))
  }, [alcohol])


  const alcoholChange = (e: SelectChangeEvent<SelectOption | Array<SelectOption>>) => {
    const value = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
    const foundAlcohol = ALCOHOL_NAMES.find(alcohol => value.includes(alcohol.id));

    if (foundAlcohol) {
      const newAlcoholArray = alcohol.includes(foundAlcohol) ? alcohol.filter(a => a.id !== foundAlcohol.id) : [...alcohol, foundAlcohol]
      onChange(id, {alcohol: newAlcoholArray})
    } else {
      if (value.includes("")) {
        onChange(id, {alcohol: []})
      }
    }
  }

  return (
    <div className="guest-box">
      <BaseIcon
        onClick={() => onClickDelete(id)}
        size={'badgeIcon'}
        name={IconNames.Close}
      />
      <BaseInput
        name="firstName"
        placeholder="First Name"
        label="First Name:"
        type="text"
        value={firstName}
        onChange={handleChange}
        errorMessage={errors?.firstName?.join("; ")}
      />
      <BaseInput
        name="lastName"
        placeholder="Last Name"
        label="Last Name:"
        value={lastName}
        onChange={handleChange}
        type="text"
        errorMessage={errors?.lastName?.join("; ")}
      />
      <DatePicker
        name="birthDate"
        label="Birth Date:"
        value={birthDate}
        onChange={handleDateChange}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        // errorMessage={errors?.birthDate?.join("; ")}
      />

      <FormControl className="gender">
        <FormLabel id="demo-radio-buttons-group-label">
          Gender
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={gender}
          row
          name="radio-buttons-group"
          onChange={handleGenderChange}
        >
          <FormControlLabel
            value={Gender.M}
            control={<Radio/>}
            label="Male"
          />
          <FormControlLabel
            value={Gender.F}
            control={<Radio/>}
            label="Female"
          />
        </RadioGroup>
      </FormControl>


      <div className="alcohol">
        <FormControl sx={{m: 1, width: 300}}>
          <InputLabel shrink htmlFor="select-multiple-native">
            Alcohol
          </InputLabel>
          <BaseSelect
            selectedOption={selectedAlcoholOptions}
            options={alcoholOptions}
            multiple
            onChange={alcoholChange}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default GuestComponent;