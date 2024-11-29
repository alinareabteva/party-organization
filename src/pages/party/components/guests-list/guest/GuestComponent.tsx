import dayjs, {Dayjs} from "dayjs";
import "./GuestComponent.scss"
import {ChangeEvent, useEffect, useMemo, useRef} from "react";

import {DatePicker} from "@mui/x-date-pickers";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton, InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup
} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import CloseIcon from '@mui/icons-material/Close';
import LiquorIcon from '@mui/icons-material/Liquor';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import {ErrorState} from "../../../../../components/validation";
import BaseSelect, {SelectOption} from "../../../../../components/base/base-select/BaseSelect.tsx";
import {ALCOHOL_NAMES} from "../../../constants.ts";
import BaseInput from "../../../../../components/base/base-input/BaseInput.tsx";


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
  id: number;
  name: string;
}


export interface GuestComponentsProps extends Guest {
  onChange: (id: string, partOfGuest: Partial<Guest>) => void;
  onClickDelete: (id: string) => void;
  errors: ErrorState<Guest>;
  isLastItem: boolean;
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
                          errors,
                          isLastItem,
                        }: GuestComponentsProps) => {

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLastItem && ref.current) {
      ref.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    }
  }, [ref, isLastItem])

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
    const foundAlcohol = ALCOHOL_NAMES.find(alcohol => value.includes(alcohol.id + ''));

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
    <div className="guest-box" ref={ref}>
      <div className="header-actions">
        <IconButton className="close-icon" onClick={() => onClickDelete(id)}>
          <CloseIcon fontSize="large"/>
        </IconButton>
      </div>

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
        <FormLabel id="radio-buttons-group-label">
          Gender
        </FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          value={gender}
          row
          name="radio-buttons-group"
          onChange={handleGenderChange}
        >
          <FormControlLabel
            value={Gender.M}
            control={<Radio/>}
            label={<ManIcon fontSize="large"/>}

          />
          <FormControlLabel
            value={Gender.F}
            control={<Radio/>}
            label={<WomanIcon fontSize="large"/>}
          />
        </RadioGroup>
      </FormControl>

      <div className="alcohol">
        <FormControl sx={{m: 1, width: 300}}>
          <InputLabel id={`select-multiple-${id}`}>
            Alcohol
          </InputLabel>
          <BaseSelect
            selectedOption={selectedAlcoholOptions}
            options={alcoholOptions}
            multiple
            labelId={`select-multiple-${id}`}
            onChange={alcoholChange}
            input={(
              <OutlinedInput
                label="Alcohol"
                startAdornment={(
                  <InputAdornment position="start">
                    <LiquorIcon/>
                  </InputAdornment>
                )}
              />
            )}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default GuestComponent;