import React, {FunctionComponent, MouseEvent, PropsWithChildren, useEffect, useMemo, useReducer} from "react";
import {INITIAL_STATE, partyReducer} from "../party-reducer/party-reducer.ts";
import {
  addNewGuestAction,
  changeGuest, closeModalAction,
  deleteGuestAction,
  setAboutPartyStateAction, setPartyStateAction,
  submitFormAction
} from "../party-reducer/actions.ts";
import {PartyReducerState} from "../party-reducer/types.ts";
import {AboutPartyState} from "../components/about-party/AboutParty.tsx";
import {Guest, GuestComponentsProps} from "../components/guests-list/guest/GuestComponent.tsx";

interface PartyContextValue {
  partyIndex?: number;
  partyState: PartyReducerState;
  isEditingMode: boolean;
  setAboutPartyState: (aboutParty: Partial<AboutPartyState>) => void;
  addGuest: () => void;
  onGuestFieldChange: (id: string, partOfGuest: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  onClickSubmit: (e: MouseEvent) => void;
  closeModal: () => void;
}

export const PartyContext = React.createContext<PartyContextValue>({} as PartyContextValue);

interface PartyContextProviderProps {
  initialState?: Partial<PartyReducerState>;
  partyIndex?: number;
}

const PartyContextProvider: FunctionComponent<PropsWithChildren<PartyContextProviderProps>> = ({children, initialState, partyIndex}) => {

  const [partyState, dispatch] = useReducer(partyReducer, INITIAL_STATE);

  useEffect(() => {
    if (initialState) {
      dispatch(setPartyStateAction(initialState))
    }
  }, [initialState]);

  const isEditingMode = useMemo(() => {
   return partyIndex !== undefined
  }, [partyIndex])

  const setAboutPartyState = (aboutParty: Partial<AboutPartyState>) => {
    dispatch(setAboutPartyStateAction(aboutParty))
  }

  const addGuest = () => {
    dispatch(addNewGuestAction({}))
  }

  const onGuestFieldChange: GuestComponentsProps['onChange'] = (id, partOfGuest) => {
    dispatch(changeGuest({id, ...partOfGuest}))
  }

  const deleteGuest: GuestComponentsProps['onClickDelete'] = (id) => {
    dispatch(deleteGuestAction({id}))
  }

  const onClickSubmit = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(submitFormAction())
  }

  const closeModal = () => {
    dispatch(closeModalAction())
  }

  return (
    <PartyContext.Provider
      value={{
        partyIndex,
        partyState,
        isEditingMode,
        setAboutPartyState,
        addGuest,
        onGuestFieldChange,
        deleteGuest,
        onClickSubmit,
        closeModal
      }}
    >
      {children}
    </PartyContext.Provider>
  )
};

export default PartyContextProvider;