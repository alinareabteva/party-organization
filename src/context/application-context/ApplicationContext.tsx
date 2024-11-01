import React, {FunctionComponent, PropsWithChildren, useReducer} from "react";
import {applicationReducer, INITIAL_STATE} from "./application-reducer.ts";
import {ApplicationReducerState} from "./types.ts";
import {addNewPartyAction} from "./application-actions.ts";
import {PartyState} from "../../pages/party/party-reducer/types.ts";

interface ApplicationContextValue {
  applicationState: ApplicationReducerState;
  addNewParty: (partyState: PartyState) => void;
}

export const ApplicationContext = React.createContext<ApplicationContextValue>({} as ApplicationContextValue);

export const ApplicationContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {

  const [applicationState, dispatch] = useReducer(applicationReducer, INITIAL_STATE)

  const addNewParty = (party: PartyState)=>{
    dispatch(addNewPartyAction(party))
  }

  return (
    <ApplicationContext.Provider
      value={{
        applicationState,
        addNewParty
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}