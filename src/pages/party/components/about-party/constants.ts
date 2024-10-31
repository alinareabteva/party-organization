import {AboutPartyState} from "./AboutParty.tsx";
import {
  firstCharIsCapitalLetterValidator,
  isNotBiggerThanValidator,
  isNotEmptyValidator,
  isNotLessThanValidator, onlyLettersValidator, phoneNumberValidator,
  ValidatorConfig
} from "../../../../components/validation";

export const aboutPartyValidatorConfig: ValidatorConfig<AboutPartyState> = {
  partyName: [
    isNotEmptyValidator<AboutPartyState>,
    isNotLessThanValidator<AboutPartyState>(2),
    isNotBiggerThanValidator<AboutPartyState>(30),
    firstCharIsCapitalLetterValidator<AboutPartyState>(),
  ],
  organizerFirstName: [
    isNotEmptyValidator<AboutPartyState>,
    isNotLessThanValidator<AboutPartyState>(4),
    isNotBiggerThanValidator<AboutPartyState>(25),
    firstCharIsCapitalLetterValidator<AboutPartyState>(),
    onlyLettersValidator<AboutPartyState>("First Name")
  ],
  organizerLastName: [
    isNotEmptyValidator<AboutPartyState>,
    isNotLessThanValidator<AboutPartyState>(5),
    isNotBiggerThanValidator<AboutPartyState>(25),
    firstCharIsCapitalLetterValidator<AboutPartyState>(),
    onlyLettersValidator<AboutPartyState>("Last Name")
  ],
  place: [
    isNotEmptyValidator<AboutPartyState>,
    isNotLessThanValidator<AboutPartyState>(3),
    isNotBiggerThanValidator<AboutPartyState>(30),
  ],
  date: [
    isNotEmptyValidator<AboutPartyState>,
   ],
  phoneNumber: [
    isNotEmptyValidator<AboutPartyState>,
    phoneNumberValidator<AboutPartyState>
  ],
}