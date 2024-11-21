import React, {useContext} from 'react';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import "./DeleteModal.scss"
import {createPortal} from "react-dom";
import {ApplicationContext} from "../../../../context/application-context/ApplicationContext.tsx";

const DeleteModal = () => {
  const {
    applicationState: {selectedParties},
    toggleOpenConfirmDeleteModal,
    deleteSelectedParties
  } = useContext(ApplicationContext)
  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-area">
          <div className="icon-wrapper">
            <IconButton className="close-icon" onClick={toggleOpenConfirmDeleteModal}>
              <CloseIcon fontSize="large"/>
            </IconButton>
          </div>
          <div className="modal-body">
            {selectedParties.length > 1 ? "Are you sure that you want to delete these parties?" : "Are you sure that you want to delete this party?"}
          </div>
          <div className="buttons">
            <Button size="large" variant="contained" color="secondary" onClick={deleteSelectedParties}>
              Yes
            </Button>
            <Button size="large" variant="contained" color="primary" onClick={toggleOpenConfirmDeleteModal}>
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteModalContainer = () => {
  const {applicationState: {modals: {confirmDeleteModalIsOpen}}} = useContext(ApplicationContext)
  if (!confirmDeleteModalIsOpen) {
    return null
  }
  return createPortal(<DeleteModal/>, document.body)
}
export default DeleteModalContainer;