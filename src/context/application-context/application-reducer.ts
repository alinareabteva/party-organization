import {Reducer} from "react";
import {ApplicationActionType, ApplicationReducerState} from "./types.ts";
import {AvailableApplicationAction} from "./application-actions.ts";
import {parties} from "./data.ts";

export const INITIAL_STATE: ApplicationReducerState = {
  parties: [...parties],
  selectedParties: [],
  modals: {
    confirmDeleteModalIsOpen: false,
  }
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
        selectedParties: state.selectedParties.length === state.parties.length ? new Array<number>() : state.parties.map((el, index) => index)
      }
    }


    case ApplicationActionType.TOGGLE_SELECT_ONE: {
      const {index} = action.payload
      return {
        ...state,
        selectedParties: state.selectedParties.includes(index) ? state.selectedParties.filter(selectedPartyIndex => selectedPartyIndex !== index) : [...state.selectedParties, index]
      }
    }

    case ApplicationActionType.DELETE_SELECTED: {
      return {
        ...state,
        parties: state.parties.filter((el, index) => !state.selectedParties.includes(index)),
        selectedParties: [],
        modals: {
          ...state.modals,
          confirmDeleteModalIsOpen: false
        }
      }
    }

    case ApplicationActionType.TOGGLE_CONFIRM_DELETE_MODAL: {
      return {
        ...state,
        modals: {
          ...state.modals,
          confirmDeleteModalIsOpen: !state.modals.confirmDeleteModalIsOpen
        }
      }
    }

    default: {
      return state;
    }
  }
}