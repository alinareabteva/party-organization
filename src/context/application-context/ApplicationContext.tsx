import React, {FunctionComponent, PropsWithChildren, useCallback, useReducer} from "react";
import {applicationReducer, INITIAL_STATE} from "./application-reducer.ts";
import {ApplicationReducerState} from "./types.ts";
import {
  addNewPartyAction,
  deletePartyAction, deleteSelectedPartyAction,
  editPartyAction, toggleConfirmDeleteModalAction,
  toggleSelectAllAction,
  toggleSelectOneAction
} from "./application-actions.ts";
import {PartyState} from "../../pages/party/party-reducer/types.ts";

interface ApplicationContextValue {
  applicationState: ApplicationReducerState;
  addNewParty: (partyState: PartyState) => void;
  deleteParty: (index: number) => void;
  editParty: (index: number, party: PartyState) => void;
  toggleSelectAll: () => void;
  toggleSelectOne: (index: number) => void;
  deleteSelectedParties: () => void;
  toggleOpenConfirmDeleteModal: () => void;
}

export const ApplicationContext = React.createContext<ApplicationContextValue>({} as ApplicationContextValue);

export const ApplicationContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {

  const [applicationState, dispatch] = useReducer(applicationReducer, INITIAL_STATE)

  const addNewParty = (party: PartyState) => {
    dispatch(addNewPartyAction(party))
  }

  const deleteParty = useCallback((index: number) => {
    dispatch(deletePartyAction({index}))
  }, [dispatch])


  const editParty: ApplicationContextValue['editParty'] = (index, party) => {
    dispatch(editPartyAction({party, index}))
  }

  const toggleSelectAll = () => {
    dispatch(toggleSelectAllAction())
  }

  const toggleSelectOne:ApplicationContextValue['toggleSelectOne'] = (index) => {
    dispatch(toggleSelectOneAction({index}))
  }

  const deleteSelectedParties = () => {
    dispatch(deleteSelectedPartyAction())
  }

  const toggleOpenConfirmDeleteModal = () => {
    dispatch(toggleConfirmDeleteModalAction())
  }

  return (
    <ApplicationContext.Provider
      value={{
        applicationState,
        addNewParty,
        deleteParty,
        editParty,
        toggleSelectAll,
        toggleSelectOne,
        deleteSelectedParties,
        toggleOpenConfirmDeleteModal
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}