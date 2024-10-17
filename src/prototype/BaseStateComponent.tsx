import {ChangeEvent, MouseEvent, useState} from 'react';
import BaseInput from "../components/base/base-input/BaseInput.tsx";
import {
  ErrorState,
  isNotEmptyValidator,
  isNotLessThanValidator,
  isNotBiggerThanValidator,
  firstCharIsCapitalLetterValidator,
  onlyLettersValidator,
  birthDateValidator,
  onlyAbbreviationValidator,
  validateStateFunc,
  ValidatorConfig,
} from "./validation";

interface FormState {
  name: string;
  surname: string;
  dateOfBirth: string;
  college: string;
  animal: string;
}


const formValidatorConfig: ValidatorConfig<FormState> = {
  name: [
    isNotEmptyValidator<FormState>,
    isNotLessThanValidator<FormState>(5),
    isNotBiggerThanValidator<FormState>(20),
    firstCharIsCapitalLetterValidator<FormState>(),
    onlyLettersValidator<FormState>("Name")
  ],
  surname: [
    isNotEmptyValidator<FormState>,
    isNotLessThanValidator<FormState>(5),
    isNotBiggerThanValidator<FormState>(25),
    firstCharIsCapitalLetterValidator<FormState>(),
    onlyLettersValidator<FormState>("Surname")
  ],
  dateOfBirth: [
    isNotEmptyValidator<FormState>,
    birthDateValidator<FormState>

  ],
  college: [
    isNotEmptyValidator<FormState>,
    isNotLessThanValidator<FormState>(2),
    isNotBiggerThanValidator<FormState>(25),
    onlyAbbreviationValidator<FormState>
  ],
  animal: [
    isNotEmptyValidator<FormState>,
    isNotLessThanValidator<FormState>(1),
    isNotBiggerThanValidator<FormState>(25)
  ]
}


const BaseStateComponent = () => {
  const [state, setAppState] = useState<FormState>({
    name: "Alina",
    surname: "Bolbecova",
    dateOfBirth: "01.03.1999",
    college: "USM",
    animal: "dog"
  })

  const [errorState, setErrorState] = useState<ErrorState<FormState>>({
    name: new Array<string>(),
    surname: new Array<string>(),
    dateOfBirth: new Array<string>(),
    college: new Array<string>(),
    animal: new Array<string>(),
  })


  const handleInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setAppState(prevState => ({
        ...prevState,
        [name]: value,
      })
    );
  }

  const onClickCheck = (e: MouseEvent) => {
    e.preventDefault();

    const validationREs = validateStateFunc(state, formValidatorConfig);

    setErrorState(prevState => ({
      ...prevState,
      ...validationREs
    }));
  }

  return (
    <div>
      <BaseInput value={state.name} name="name" label={"Name"} onChange={handleInputChange}
                 errorMessage={errorState.name.join("; ")}/>
      <BaseInput value={state.surname} name="surname" label={"Surname"} onChange={handleInputChange}
                 errorMessage={errorState.surname.join("; ")}/>
      <BaseInput type="date" value={state.dateOfBirth} name="dateOfBirth" label={"Date Of Birth"}
                 onChange={handleInputChange}
                 errorMessage={errorState.dateOfBirth.join("; ")}/>
      <BaseInput value={state.college} name="college" label={"College"} onChange={handleInputChange}
                 errorMessage={errorState.college.join("; ")}/>
      <BaseInput value={state.animal} name="animal" label={"Animal"} onChange={handleInputChange}
                 errorMessage={errorState.animal.join("; ")}/>
      <button onClick={onClickCheck}>Check</button>
    </div>
  );
};

export default BaseStateComponent;