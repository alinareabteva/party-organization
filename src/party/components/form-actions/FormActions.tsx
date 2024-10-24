import {useContext} from "react";
import {PartyContext} from "../../party-context/PartyContext.tsx";
import "./FormActions.scss"

const FormActions = () => {
  const {partyState, onClickSubmit} = useContext(PartyContext)
  return (
    <div className="form-actions">
      <button
        className="button-submit"
        disabled={partyState.values.guests.length === 0}
        onClick={onClickSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default FormActions;