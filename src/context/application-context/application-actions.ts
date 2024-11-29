import {
  AppActionFuncWithPayload,
  AppActionVoidFunction,
  ApplicationAction,
  ApplicationActionType,
  Pageable
} from "./types.ts";
import {PartyState} from "../../pages/party/party-reducer/types.ts";


type AddNewPartyActionReturnType = ApplicationAction<ApplicationActionType.ADD_PARTY, PartyState>;
export const addNewPartyAction: AppActionFuncWithPayload<AddNewPartyActionReturnType['type'], AddNewPartyActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.ADD_PARTY,
    payload
  }
}


interface DeletePartyActionProps {
  index: number;
}

type DeletePartyActionReturnType = ApplicationAction<ApplicationActionType.DELETE_PARTY, DeletePartyActionProps>
export const deletePartyAction: AppActionFuncWithPayload<DeletePartyActionReturnType['type'], DeletePartyActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.DELETE_PARTY,
    payload
  }
}


interface EditPartyActionProps {
  index: number;
  party: PartyState;
}

type EditPartyActionReturnType = ApplicationAction<ApplicationActionType.EDIT_PARTY, EditPartyActionProps>
export const editPartyAction: AppActionFuncWithPayload<EditPartyActionReturnType['type'], EditPartyActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.EDIT_PARTY,
    payload
  }
}


type ToggleSelectAllReturnType = ApplicationAction<ApplicationActionType.TOGGLE_SELECT_ALL, null>
export const toggleSelectAllAction: AppActionVoidFunction<ToggleSelectAllReturnType['type'], ToggleSelectAllReturnType['payload']> = () => {
  return {
    type: ApplicationActionType.TOGGLE_SELECT_ALL,
    payload: null
  }
}


interface ToggleSelectOneActionProps {
  index: number;
}

type ToggleSelectOneReturnType = ApplicationAction<ApplicationActionType.TOGGLE_SELECT_ONE, ToggleSelectOneActionProps>
export const toggleSelectOneAction: AppActionFuncWithPayload<ToggleSelectOneReturnType['type'], ToggleSelectOneReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.TOGGLE_SELECT_ONE,
    payload
  }
}


type DeleteSelectedPartyReturnType = ApplicationAction<ApplicationActionType.DELETE_SELECTED, null>
export const deleteSelectedPartyAction: AppActionVoidFunction<DeleteSelectedPartyReturnType['type'], DeleteSelectedPartyReturnType['payload']> = () => {
  return {
    type: ApplicationActionType.DELETE_SELECTED,
    payload: null
  }
}

type ToggleConfirmDeleteModalReturnType = ApplicationAction<ApplicationActionType.TOGGLE_CONFIRM_DELETE_MODAL, null>
export const toggleConfirmDeleteModalAction: AppActionVoidFunction<ToggleConfirmDeleteModalReturnType['type'], ToggleConfirmDeleteModalReturnType['payload']> = () => {
  return {
    type: ApplicationActionType.TOGGLE_CONFIRM_DELETE_MODAL,
    payload: null
  }
}

type SetPartiesActionReturnType = ApplicationAction<ApplicationActionType.SET_PARTIES, Array<PartyState>>

export const setPartiesAction: AppActionFuncWithPayload<SetPartiesActionReturnType['type'], SetPartiesActionReturnType['payload']> = (parties) => {
  return {
    type: ApplicationActionType.SET_PARTIES,
    payload: parties
  }
}

type SetPartiesLoadingActionReturnType = ApplicationAction<ApplicationActionType.SET_PARTIES_LOADING, boolean>

export const setPartiesLoadingAction: AppActionFuncWithPayload<SetPartiesLoadingActionReturnType['type'], SetPartiesLoadingActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.SET_PARTIES_LOADING,
    payload
  }
}

type SetPageableLimitActionReturnType = ApplicationAction<ApplicationActionType.SET_LIMIT, Pageable['limit']>;

export const setPageableLimitAction: AppActionFuncWithPayload<SetPageableLimitActionReturnType['type'], SetPageableLimitActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.SET_LIMIT,
    payload
  }
}

type SetPageableCurrentPageActionReturnType = ApplicationAction<ApplicationActionType.SET_CURRENT_PAGE, Pageable['currentPage']>;

export const setPageableCurrentPageAction: AppActionFuncWithPayload<SetPageableCurrentPageActionReturnType['type'], SetPageableCurrentPageActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.SET_CURRENT_PAGE,
    payload
  }
}


export type AvailableApplicationAction = AddNewPartyActionReturnType
  | DeletePartyActionReturnType
  | EditPartyActionReturnType
  | ToggleSelectAllReturnType
  | ToggleSelectOneReturnType
  | DeleteSelectedPartyReturnType
  | ToggleConfirmDeleteModalReturnType
  | SetPartiesActionReturnType
  | SetPartiesLoadingActionReturnType
  | SetPageableLimitActionReturnType
  | SetPageableCurrentPageActionReturnType
