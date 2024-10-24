import "./Party.scss"
import AboutParty, {AboutPartyState} from "./components/about-party/AboutParty.tsx";
import GuestsList from "./components/guests-list/GuestsList.tsx";
import {Guest, GuestComponentsProps,} from "./components/guests-list/guest/GuestComponent.tsx";
import {MouseEvent, useReducer} from "react";
import OverViewTable from "./components/overview/OverViewTable.tsx";
import {ErrorState} from "../components/validation";
import {INITIAL_STATE, partyReducer} from "./party-reducer/party-reducer.ts";
import {
  addNewGuestAction,
  changeGuest,
  deleteGuestAction,
  setAboutPartyStateAction,
  submitFormAction
} from "./party-reducer/actions.ts";

export interface PartyState {
  guests: Guest[];
  aboutParty: AboutPartyState;
}

export interface AllPartyState {
  values: PartyState,
  errors: {
    guests: ErrorState<Guest>[]
    aboutParty: ErrorState<AboutPartyState>
  }
}

const Party = () => {

  const [partyState, dispatch] = useReducer(partyReducer, INITIAL_STATE)


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

  return (
    <form className="form">
      <div className="container">
        <AboutParty
          aboutPartyState={partyState.values.aboutParty}
          setAboutPartyState={setAboutPartyState}
          aboutPartyErrors={partyState.errors.aboutParty}
        />
        <GuestsList
          guestsArray={partyState.values.guests}
          onChange={onGuestFieldChange}
          addGuest={addGuest}
          deleteGuest={deleteGuest}
          guestsErrors={partyState.errors.guests}
        />
        <OverViewTable guests={partyState.values.guests}/>
        <div className="button">
          <button
            className="button-submit"
            disabled={partyState.values.guests.length === 0}
            onClick={onClickSubmit}
          >
            Submit
          </button>

        </div>
      </div>
    </form>
  );
};

export default Party;