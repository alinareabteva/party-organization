import {Reducer} from "react";
import {ApplicationActionType, ApplicationReducerState} from "./types.ts";
import {AvailableApplicationAction} from "./application-actions.ts";
import {parties} from "./data.ts";

export const INITIAL_STATE: ApplicationReducerState = {
  parties: [...parties],
  selectedParties: []
}

export const applicationReducer: Reducer<ApplicationReducerState, AvailableApplicationAction> = (state, action) => {
  switch (action.type) {
    case ApplicationActionType.ADD_PARTY: {
      return {
        ...state,
        parties: [...state.parties, action.payload]
      }
    }

    case ApplicationActionType.DELETE_PARTY: {
      const {index} = action.payload;
      return {
        ...state,
        parties: state.parties
          .filter((party, partyIndex) => partyIndex !== index)
      }
    }

    case ApplicationActionType.EDIT_PARTY: {
      const {index, party} = action.payload
      return {
        ...state,
        parties: state.parties.map((originalParty, partyIndex) => {
          if (partyIndex === index) {
            return party
          }
          return originalParty
        })
      }
    }

    case ApplicationActionType.TOGGLE_SELECT_ALL: {
      return  {
        ...state,
        selectedParties: state.selectedParties.length === state.parties.length ? [] : state.parties.map((el, index) => index)
      }
    }

    default: {
      return state;
    }
  }
}