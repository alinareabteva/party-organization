import {Reducer} from "react";
import {ApplicationActionType, ApplicationReducerState} from "./types.ts";
import {AvailableApplicationAction} from "./application-actions.ts";

const TOTAL_ITEMS = 650;
const DEFAULT_LIMIT = 10;


export const INITIAL_STATE: ApplicationReducerState = {
  parties: [],
  selectedParties: [],
  isPartiesFetched: false,
  loading: false,
  modals: {
    confirmDeleteModalIsOpen: false,
  },
  pageable: {
    totalItems: TOTAL_ITEMS,
    limit: DEFAULT_LIMIT,
    currentPage: 0,//if zero based then  page is calculated: limit * offset
    totalPages: TOTAL_ITEMS / DEFAULT_LIMIT,
    offset: 0,
  }
}

export const applicationReducer: Reducer<ApplicationReducerState, AvailableApplicationAction> = (state, action) => {
  switch (action.type) {
    case ApplicationActionType.SET_PARTIES: {
      return {
        ...state,
        parties: action.payload,
        selectedParties: [],
        loading: false,
        isPartiesFetched: true
      }
    }

    case ApplicationActionType.SET_PARTIES_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

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
      return {
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
    case ApplicationActionType.SET_LIMIT: {
      const limit = action.payload;
      return {
        ...state,
        pageable: {
          ...state.pageable,
          limit,
          totalPages: state.pageable.totalItems / limit,
          currentPage: 0,
          offset: 0
        }
      }
    }

    case ApplicationActionType.SET_CURRENT_PAGE: {
      const currentPage = action.payload;
      return {
        ...state,
        pageable: {
          ...state.pageable,
          offset: currentPage * state.pageable.limit,
          currentPage
        }
      }
    }

    default: {
      return state;
    }
  }
}