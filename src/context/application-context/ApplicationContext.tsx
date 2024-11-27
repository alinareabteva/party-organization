import React, {FunctionComponent, PropsWithChildren, useCallback, useEffect, useReducer} from "react";
import {applicationReducer, INITIAL_STATE} from "./application-reducer.ts";
import {ApplicationReducerState} from "./types.ts";
import {
  addNewPartyAction,
  deletePartyAction, deleteSelectedPartyAction,
  editPartyAction, setPartiesAction, setPartiesLoadingAction, toggleConfirmDeleteModalAction,
  toggleSelectAllAction,
  toggleSelectOneAction
} from "./application-actions.ts";
import {PartyState} from "../../pages/party/party-reducer/types.ts";
import {getAllPartiesApi} from "../../api/parties.ts";
import dayjs from "dayjs";

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

  const toggleSelectOne: ApplicationContextValue['toggleSelectOne'] = (index) => {
    dispatch(toggleSelectOneAction({index}))
  }

  const deleteSelectedParties = () => {
    dispatch(deleteSelectedPartyAction())
  }

  const toggleOpenConfirmDeleteModal = () => {
    dispatch(toggleConfirmDeleteModalAction())
  }

  const fetchParties = (offset: number, limit: number) => {
    dispatch(setPartiesLoadingAction(true))
    getAllPartiesApi(offset, limit)
      .then((parties) => {
        const remappedParties = parties.map(party => {
          const DEFAULT_FORMAT = 'M/D/YYYY';
          const aboutPartyDate = dayjs(party.aboutParty.date, DEFAULT_FORMAT)

          return {
            ...party,
            aboutParty: {
              ...party.aboutParty,
              date: aboutPartyDate
            },
            guests: party.guests.map(guest => ({
              ...guest,
              birthDate: dayjs(guest.birthDate, DEFAULT_FORMAT)
            }))
          }
        })
        dispatch(setPartiesAction(remappedParties))
      })
      .catch(e => {
        alert(e.message || e)
        dispatch(setPartiesLoadingAction(false))
      })
  }


  useEffect(() => {
   fetchParties(30, 100)
  }, [])


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