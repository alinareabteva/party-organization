import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";
import {Gender, Guest} from "./GuestComponent.tsx";
import {
  firstCharIsCapitalLetterValidator,
  isNotBiggerThanValidator,
  isNotEmptyValidator,
  isNotLessThanValidator, onlyLettersValidator,
  ValidatorConfig
} from "../../../../../components/validation";

export const buildDefaultGuest = () => {
  return  {
    id: uuidv4(),
    firstName: "",
    lastName: "",
    birthDate: dayjs().subtract(18, 'year'),
    gender: Gender.M,
    alcohol: []
  }
}

export const buildEmptyGuestErrors = () => {
  return  {
    id: [],
    firstName: [],
    lastName: [],
    birthDate: [],
    gender: [],
    alcohol: [],
  }
}

export const guestValidatorConfig: ValidatorConfig<Guest> = {
  firstName: [
    isNotEmptyValidator<Guest>,
    isNotLessThanValidator<Guest>(5),
    isNotBiggerThanValidator<Guest>(20),
    firstCharIsCapitalLetterValidator<Guest>(),
    onlyLettersValidator<Guest>("First Name")
  ],
  lastName: [
    isNotEmptyValidator<Guest>,
    isNotLessThanValidator<Guest>(5),
    isNotBiggerThanValidator<Guest>(25),
    firstCharIsCapitalLetterValidator<Guest>(),
    onlyLettersValidator<Guest>("Last Name")
  ],
  birthDate: [
    isNotEmptyValidator<Guest>,
    //birthDateValidator<Guest>

  ]
}