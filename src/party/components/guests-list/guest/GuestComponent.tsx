import dayjs, {Dayjs} from "dayjs";
import "./GuestComponent.scss"
import BaseInput from "../../../../components/base/base-input/BaseInput.tsx";
import {ChangeEvent, useMemo} from "react";
import {v4 as uuidv4} from 'uuid';
import Select, {SelectOption, SelectProp} from "../../../../components/base/select/Select.tsx";
import {BASE_DATE_FORMAT} from "../../../../utilities.ts";

export enum Gender {
  M = 'M',
  F = 'F'
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Dayjs;
  gender: Gender;
  alcohol: Array<AlcoholDto>;
}


interface AlcoholDto {
  id: string;
  name: string;
}

export const ALCOHOL_NAMES: Array<AlcoholDto> = [
  { name: "Vodka", id: uuidv4() },
  { name: "Wine", id: uuidv4() },
  { name: "Beer", id: uuidv4() },
  { name: "Sangria", id: uuidv4() },
  { name: "Champagne", id: uuidv4() },
  { name: "Rum", id: uuidv4() },
  { name: "Calvados", id: uuidv4() },
  { name: "Brandy", id: uuidv4() },
];


export interface GuestComponentsProps extends Guest {
  onChange: (id: string, partOfGuest: Partial<Guest>) => void;

}

const mapAlcoholToOption = (alcohol: AlcoholDto): SelectOption => {
  return  {
    label: alcohol.name,
    value: alcohol.id
  }
}




const GuestComponent = ({id, firstName, lastName, birthDate, gender, onChange, alcohol}:GuestComponentsProps) => {

  const handleChange = ({target: {name, value}} : ChangeEvent<HTMLInputElement>) => {
    onChange(id, {[name]: value})
  }

  const handleDateChange =  ({target: {name, value}} : ChangeEvent<HTMLInputElement>) => {
    onChange(id, {[name]: dayjs(value, BASE_DATE_FORMAT)})
  }

  const alcoholOptions = useMemo(() => {
    return ALCOHOL_NAMES.map(mapAlcoholToOption)
  }, [ALCOHOL_NAMES])

  const selectedAlcoholOptions = useMemo(() => {
    return alcohol.map(({id}) => id)
  }, [alcohol])


  const alcoholChange: SelectProp['onChange'] = (selectedOption) => {
    const foundAlcohol = ALCOHOL_NAMES.find(alcohol => alcohol.id === selectedOption.value);
    if (foundAlcohol) {
      const newAlcoholArray = alcohol.includes(foundAlcohol) ? alcohol.filter(a => a.id !== foundAlcohol.id) :  [...alcohol, foundAlcohol]

      onChange(id, {alcohol:newAlcoholArray})
    }

  }

  return (
    <div className="guest-box">
      <BaseInput
        name="firstName"
        placeholder="First Name"
        label="First Name:"
        type="text"
        value={firstName}
        onChange={handleChange}
      />
      <BaseInput
        name="lastName"
        placeholder="Last Name"
        label="Last Name:"
        value={lastName}
        onChange={handleChange}
        type="text"
      />
      <BaseInput
        name="birthDate"
        type="date"
        label="Birth Date:"
        placeholder="Birth Date"
        value={birthDate.format(BASE_DATE_FORMAT)}
        onChange={handleDateChange}
      />

      <div className="gender">
        <label className="gender-label">Gender:</label>
        <fieldset className="radio-group" >
          <input
            value={Gender.M}
            name="gender"
            type="radio"
            checked={Gender.M === gender}
            onChange={handleChange}
          />
          <input
            value={Gender.F}
            name="gender"
            type="radio"
            checked={Gender.F === gender}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <div className="alcohol">

        <Select
          label="Alcohol"
          selectedOption={selectedAlcoholOptions}
          options={alcoholOptions}
          allowMultiple
          onChange={alcoholChange}
          />

        {/*<label className="alcohol-label">Alcohol:</label>*/}
        {/*<select className="select-alcohol">*/}
        {/*  <option value="value1">Wine</option>*/}
        {/*  <option value="value2"> Beer</option>*/}
        {/*  <option value="value3">Vodka</option>*/}
        {/*</select>*/}
      </div>
    </div>
  );
};

export default GuestComponent;