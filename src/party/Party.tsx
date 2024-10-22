import "./Party.scss"
import AboutParty, {AboutPartyState} from "./components/about-party/AboutParty.tsx";
import GuestsList from "./components/guests-list/GuestsList.tsx";
import {
  Guest,
  GuestComponentsProps,
} from "./components/guests-list/guest/GuestComponent.tsx";
import {MouseEvent, SetStateAction, useState} from "react";
import dayjs from "dayjs";
import OverViewTable from "./components/overview/OverViewTable.tsx";
import {ErrorState, validateArray, validateStateFunc} from "../components/validation";
import {
  buildDefaultGuest,
  buildEmptyGuestErrors,
  guestValidatorConfig
} from "./components/guests-list/guest/constants.ts";
import {aboutPartyValidatorConfig} from "./components/about-party/constants.ts";

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
  const [partyState, setPartyState] = useState<AllPartyState>({
    values: {
      guests: [],
      aboutParty: {
        partyName: '',
        organizerFirstName: '',
        organizerLastName: '',
        place: '',
        date: dayjs(),
        phoneNumber: ''
      }
    },
    errors: {
      guests: [],
      aboutParty: {
        partyName: [],
        organizerFirstName: [],
        organizerLastName: [],
        place: [],
        date: [],
        phoneNumber: []
      }
    }
  })

  const onClickSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setPartyState(prevState => {
      const {errors, isValid} = validateStateFunc(prevState.values.aboutParty, aboutPartyValidatorConfig);
      if(!isValid) {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            aboutParty: errors
          }
        }
      }
      return {
        ...prevState,
        values: {
          ...prevState.values,
          aboutParty:{
            ...prevState.values.aboutParty
          }
        },
        errors: {
          ...prevState.errors,
          aboutParty: errors
        }
      }
    })
  }

  const onGuestFieldChange: GuestComponentsProps['onChange'] = (id, partOfGuest) => {
    setPartyState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        guests: prevState.values.guests.map(guest => {
          if (id === guest.id) {
            return {
              ...guest,
              ...partOfGuest
            }
          }
          return guest
        }),
      }

    }))
  }

  const addGuest = () => {
    setPartyState(prevState => {
      const {errors, isValid} = validateArray(prevState.values.guests, guestValidatorConfig);
      if (!isValid) {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            guests: errors
          }
        }
      }
      return {
        ...prevState,
        values: {
          ...prevState.values,
          guests: [...prevState.values.guests, buildDefaultGuest()]
        },
        errors: {
          ...prevState.errors,
          guests: [...errors, buildEmptyGuestErrors()]
        }
      }
    })
  }

  const setAboutPartyState = (stateSetter: SetStateAction<AboutPartyState>) => {

    setPartyState(prevState => {
      const aboutPartyState = typeof stateSetter == 'function' ? stateSetter(prevState.values.aboutParty) : stateSetter;
      return {
        ...prevState,
        values: {
          ...prevState.values,
          aboutParty: {
            ...prevState.values.aboutParty,
            ...aboutPartyState
          }
        }
      }
    })
  }

  const deleteGuest = (id: Guest['id']) => {
    setPartyState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        guests: prevState.values.guests.filter((guest) => guest.id !== id),
      }
    }))
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