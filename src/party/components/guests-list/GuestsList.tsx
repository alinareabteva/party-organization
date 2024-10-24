import "./GuestsList.scss"
import {MouseEvent, useContext} from "react"
import GuestComponent from "./guest/GuestComponent.tsx";
import {PartyContext} from "../../party-context/PartyContext.tsx";


const GuestsList = () => {
  const {
    addGuest,
    deleteGuest,
    onGuestFieldChange,
    partyState: {values: {guests: guestsArray}, errors: {guests: guestsErrors}}
  } = useContext(PartyContext)

  const handleClickGuest = (e: MouseEvent) => {
    e.preventDefault();
    addGuest()
  }

  const onClickDelete = (id: string) => {
    deleteGuest(id);
  }

  return (
    <div className="guests">
      <h2 className="guests-label">Guests:</h2>
      <div className="guest-list">
        {guestsArray.map((guest, index) => (
          <GuestComponent
            key={guest.id}
            {...guest}
            onChange={onGuestFieldChange}
            onClickDelete={onClickDelete}
            errors={guestsErrors[index]}
          />
        ))}
      </div>
      <button className="button-add" onClick={handleClickGuest}>Add</button>
    </div>
  );
};

export default GuestsList;