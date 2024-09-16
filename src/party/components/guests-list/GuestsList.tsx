import "./GuestsList.scss"
import {MouseEvent} from "react"
import GuestComponent, {Guest, GuestComponentsProps} from "./guest/GuestComponent.tsx";

interface GuestsListProps {
  guestsArray: Guest[];
  onChange: GuestComponentsProps['onChange'];
  addGuest: () => void;
}

const GuestsList = ({guestsArray, onChange, addGuest}: GuestsListProps) => {
  const handleClickGuest = (e: MouseEvent) => {
    e.preventDefault();
    addGuest()
  }
  return (
    <div className="guests">
      <h2 className="guests-label">Guests:</h2>
      <div className="guest-list">
        {guestsArray.map(guest => (
          <GuestComponent key={guest.id} {...guest} onChange={onChange}/>
        ))}
      </div>
      <button className="button-add" onClick={handleClickGuest}>Add</button>
    </div>
  );
};

export default GuestsList;