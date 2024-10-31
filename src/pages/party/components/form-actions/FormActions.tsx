import {useContext} from "react";
import "./FormActions.scss"
import Button from "@mui/material/Button";
import PublishIcon from '@mui/icons-material/Publish';
import {PartyContext} from "../../party-context/PartyContext.tsx";

const FormActions = () => {
  const {partyState, onClickSubmit} = useContext(PartyContext)
  return (
    <div className="form-actions">
      <Button
        variant="contained"
        className="button-submit"
        color="primary"
        disabled={partyState.values.guests.length === 0}
        onClick={onClickSubmit}
        endIcon={<PublishIcon />}
      >
        Submit
      </Button>
    </div>
  );
};

export default FormActions;