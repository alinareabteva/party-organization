import "./GuestsList.scss"
import {MouseEvent, useContext} from "react"
import GuestComponent from "./guest/GuestComponent.tsx";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
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
            isLastItem={index === guestsArray.length - 1}
          />
        ))}
      </div>

      <div className="button">
        <Button variant="contained" color="secondary" className="button-add" onClick={handleClickGuest} endIcon={<AddIcon />}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default GuestsList;