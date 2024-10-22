import {ChangeEvent} from 'react';
import BaseInput from "../components/base/base-input/BaseInput.tsx";
import "./BaseStateComponent.scss"
import {
  ErrorState,
  isNotEmptyValidator,
  isNotLessThanValidator,
  isNotBiggerThanValidator,
  firstCharIsCapitalLetterValidator,
  onlyLettersValidator,
  // birthDateValidator,
  // validateStateFunc,
  ValidatorConfig,
} from "../components/validation/index.ts";

export interface Person {
  name: string;
  surname: string;
  dateOfBirth: string;
  college: string;
  animal: string;
}


export const formValidatorConfig: ValidatorConfig<Person> = {
  name: [
    isNotEmptyValidator<Person>,
    isNotLessThanValidator<Person>(5),
    isNotBiggerThanValidator<Person>(20),
    firstCharIsCapitalLetterValidator<Person>(),
    onlyLettersValidator<Person>("Name")
  ],
  surname: [
    isNotEmptyValidator<Person>,
    isNotLessThanValidator<Person>(5),
    isNotBiggerThanValidator<Person>(25),
    firstCharIsCapitalLetterValidator<Person>(),
    onlyLettersValidator<Person>("Surname")
  ],
  dateOfBirth: [
    isNotEmptyValidator<Person>,
    //birthDateValidator<Person>

  ],
  college: [
    isNotEmptyValidator<Person>,
    isNotLessThanValidator<Person>(2),
    isNotBiggerThanValidator<Person>(25),
  ],
  animal: [
    isNotEmptyValidator<Person>,
    isNotLessThanValidator<Person>(1),
    isNotBiggerThanValidator<Person>(25)
  ]
}

interface BaseStateComponentProps {
  index: number;
  person: Person;
  personErrors: ErrorState<Person>;
  onChange: (part: Partial<Person>, index: number) => void;
}

const BaseStateComponent = ({index, person, personErrors, onChange}: BaseStateComponentProps) => {


  const handleInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    onChange ({
      [name]: value,
    }, index)
  }


  return (
    <div>
      <BaseInput value={person.name} name="name" label={"Name"} onChange={handleInputChange}
                 errorMessage={personErrors.name.join("; ")}/>
      <BaseInput value={person.surname} name="surname" label={"Surname"} onChange={handleInputChange}
                 errorMessage={personErrors.surname.join("; ")}/>
      <BaseInput type="date" value={person.dateOfBirth} name="dateOfBirth" label={"Date Of Birth"}
                 onChange={handleInputChange}
                 errorMessage={personErrors.dateOfBirth.join("; ")}/>
      <BaseInput value={person.college} name="college" label={"College"} onChange={handleInputChange}
                 errorMessage={personErrors.college.join("; ")}/>
      <BaseInput value={person.animal} name="animal" label={"Animal"} onChange={handleInputChange}
                 errorMessage={personErrors.animal.join("; ")}/>
    </div>
  );
};

export default BaseStateComponent;