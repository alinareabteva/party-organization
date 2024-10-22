import "./GuestsList.scss"
import {MouseEvent} from "react"
import GuestComponent, {Guest, GuestComponentsProps} from "./guest/GuestComponent.tsx";
import {ErrorState} from "../../../components/validation";

interface GuestsListProps {
  guestsArray: Guest[];
  guestsErrors: ErrorState<Guest>[];
  onChange: GuestComponentsProps['onChange'];
  addGuest: () => void;
  deleteGuest: (id: string) => void;
}

const GuestsList = ({
                      guestsArray,
                      guestsErrors,
                      onChange,
                      addGuest,
                      deleteGuest
                    }: GuestsListProps) => {

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
            onChange={onChange}
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