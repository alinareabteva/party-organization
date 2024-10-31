import dayjs from "dayjs";
import {Reducer} from "react";
import {
  buildDefaultGuest,
  buildEmptyGuestErrors,
  guestValidatorConfig
} from "../components/guests-list/guest/constants.ts";
import {PartyActionType, PartyReducerState} from "./types.ts";
import {AvailablePartyAction} from "./actions.ts";
import {validateArray, validateStateFunc} from "../../../components/validation";
import {aboutPartyValidatorConfig} from "../components/about-party/constants.ts";

export const INITIAL_STATE: PartyReducerState = {
  values: {
    guests: [],
    aboutParty: {
      partyName: '',
      organizerFirstName: '',
      organizerLastName: '',
      place: '',
      date: dayjs(),
      phoneNumber: ''
    }
  },
  errors: {
    guests: [],
    aboutParty: {
      partyName: [],
      organizerFirstName: [],
      organizerLastName: [],
      place: [],
      date: [],
      phoneNumber: []
    }
  },
  modal: {
    isOpen: false,

  }
}

export const partyReducer: Reducer<PartyReducerState, AvailablePartyAction> = (state, action) => {
  switch (action.type) {
    case PartyActionType.SET_ABOUT_PARTY_STATE: {
      const payload = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          aboutParty: {
            ...state.values.aboutParty,
            ...payload
          }
        }
      }
    }
    case PartyActionType.ADD_GUEST: {
      const {guest = buildDefaultGuest(), error = buildEmptyGuestErrors()} = action.payload;
      const {errors, isValid} = validateArray(state.values.guests, guestValidatorConfig);

      if (!isValid) {
        return {
          ...state,
          errors: {
            ...state.errors,
            guests: errors
          }
        }
      }

      return {
        ...state,
        values: {
          ...state.values,
          guests: [...state.values.guests, guest]
        },
        errors: {
          ...state.errors,
          guests: [...errors, error]
        }
      }
    }
    case PartyActionType.CHANGE_GUEST: {
      const {id, ...partOfGuest} = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          guests: state.values.guests.map(guest => {
            if (id === guest.id) {
              return {
                ...guest,
                ...partOfGuest
              }
            }
            return guest
          }),
        }
      }
    }

    case PartyActionType.DELETE_GUEST: {
      const {id} = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          guests: state.values.guests
            .filter((guest) => guest.id !== id),
        }
      }
    }

    case PartyActionType.SUBMIT_FORM: {
      const {
        errors: aboutPartyErrors,
        isValid: isValidAboutPartyErrors
      } = validateStateFunc(state.values.aboutParty, aboutPartyValidatorConfig);

      const {
        errors: guestsErrors,
        isValid: isValidGuestsErrors
      } = validateArray(state.values.guests, guestValidatorConfig)

      if (!isValidAboutPartyErrors || !isValidGuestsErrors) {
        return {
          ...state,
          errors: {
            ...state.errors,
            aboutParty: aboutPartyErrors,
            guests: guestsErrors,
          }
        }
      }
      return {
        ...state,
        errors: {
          ...state.errors,
          aboutParty: aboutPartyErrors,
          guests: guestsErrors,
        },
        modal: {
          ...state.modal,
          isOpen: true
        }
      }
    }

    case PartyActionType.CLOSE_MODAL: {
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: false
        }
      }
    }

    default:
      return state;
  }
}