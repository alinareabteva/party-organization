import React, {FunctionComponent, PropsWithChildren, useCallback, useReducer} from "react";
import {applicationReducer, INITIAL_STATE} from "./application-reducer.ts";
import {ApplicationReducerState} from "./types.ts";
import {addNewPartyAction, deletePartyAction} from "./application-actions.ts";
import {PartyState} from "../../pages/party/party-reducer/types.ts";

interface ApplicationContextValue {
  applicationState: ApplicationReducerState;
  addNewParty: (partyState: PartyState) => void;
  deleteParty: (index: number) => void;

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

  return (
    <ApplicationContext.Provider
      value={{
        applicationState,
        addNewParty,
        deleteParty
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}