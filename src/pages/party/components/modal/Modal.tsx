
import "./Modal.scss"
import {useContext} from "react";
import {createPortal} from "react-dom";
import OverViewTable from "../overview/OverViewTable.tsx";
import {PartyContext} from "../../party-context/PartyContext.tsx";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({onClose}: { onClose: () => void }) => {

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-area">
          <div className="icon-wrapper">
            <IconButton className="close-icon" onClick={onClose}>
              <CloseIcon fontSize="large"/>
            </IconButton>
          </div>
          <div className="modal-body">
            <OverViewTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalContainer = () => {
  const {partyState: {modal: {isOpen}}, closeModal} = useContext(PartyContext)
  if (!isOpen) {
    return null
  }
  return createPortal(<Modal onClose={closeModal}/>, document.body)
}
export default ModalContainer;