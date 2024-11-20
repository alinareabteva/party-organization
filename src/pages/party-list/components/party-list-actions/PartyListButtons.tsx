import React, {useContext} from 'react';
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import {AppPath} from "../../../../routes-constants.ts";
import {ApplicationContext} from "../../../../context/application-context/ApplicationContext.tsx";
import "./PartyListButtons.scss"

const PartyListButtons = () => {
  const {toggleOpenConfirmDeleteModal, applicationState: {selectedParties}} = useContext(ApplicationContext);
  return (
    <div className="party-list-buttons">
      {selectedParties.length > 0 &&
        <Button variant="contained" className="btn-delete" color="error" onClick={toggleOpenConfirmDeleteModal}>
          Delete
        </Button>
      }
      <NavLink to={AppPath.CREATE_PARTY_PAGE}>
        <Button variant="contained" className="btn-add" color="success">
          Add Party
        </Button>
      </NavLink>
    </div>
  );
};

export default PartyListButtons;