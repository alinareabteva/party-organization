import "./Party.scss"
import AboutParty, {AboutPartyState} from "./components/about-party/AboutParty.tsx";
import GuestsList from "./components/guests-list/GuestsList.tsx";
import {v4 as uuidv4} from 'uuid';
import {Gender, Guest, GuestComponentsProps} from "./components/guests-list/guest/GuestComponent.tsx";
import {SetStateAction, useState} from "react";
import dayjs from "dayjs";
import OverViewTable from "./components/overview/OverViewTable.tsx";


export interface PartyState {
  guests: Guest[];
  aboutParty: AboutPartyState;
}

const Party = () => {
  const [partyState, setPartyState] = useState<PartyState>({
    guests: [],
    aboutParty: {
      partyName: '',
      organizerFirstName: '',
      organizerLastName: '',
      place: '',
      date: dayjs(),
      phoneNumber: ''
    }
  })

  const onGuestFieldChange: GuestComponentsProps['onChange'] = (id, partOfGuest) => {
    setPartyState(prevState => ({
      ...prevState,
      guests: prevState.guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest,
            ...partOfGuest
          }
        }
        return guest
      }),

    }))
  }

  const addGuest = () => {
    setPartyState(prevState => ({
      ...prevState,
      guests: [...prevState.guests, {
        id: uuidv4(),
        firstName: "",
        lastName: "",
        birthDate: dayjs().subtract(18, 'year'),
        gender: Gender.M,
        alcohol: []
      }]
    }))
  }

  const setAboutPartyState = (stateSetter: SetStateAction<AboutPartyState>) => {

    setPartyState(prevState => {
      const aboutPartyState = typeof stateSetter == 'function' ? stateSetter(prevState.aboutParty) : stateSetter;
      return {
        ...prevState,
        aboutParty: {
          ...prevState.aboutParty,
          ...aboutPartyState
        }
      }
    })
  }

  const deleteGuest = (id: Guest['id']) => {
    setPartyState((prevState) => ({
      ...prevState,
      guests: prevState.guests.filter((guest) => guest.id !== id),
    }))
  }

  return (
    <form className="form">
      <div className="container">
        <AboutParty aboutPartyState={partyState.aboutParty} setAboutPartyState={setAboutPartyState}/>
        <GuestsList
          guestsArray={partyState.guests}
          onChange={onGuestFieldChange}
          addGuest={addGuest}
          deleteGuest={deleteGuest}
        />
        <OverViewTable guests={partyState.guests}/>
      </div>
    </form>
  );
};

export default Party;