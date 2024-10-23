import dayjs from "dayjs";
import {Reducer} from "react";
import {
  buildDefaultGuest,
  buildEmptyGuestErrors,
  guestValidatorConfig
} from "../components/guests-list/guest/constants.ts";
import {PartyActionType, PartyReducerState} from "./types.ts";
import {AvailablePartyAction} from "./actions.ts";
import {validateArray} from "../../components/validation";


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
    default:
      return state;
  }
}