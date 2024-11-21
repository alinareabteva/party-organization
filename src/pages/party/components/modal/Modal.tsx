import "./Modal.scss"
import {useContext, useMemo} from "react";
import {createPortal} from "react-dom";
import OverViewTable from "../overview/OverViewTable.tsx";
import {PartyContext} from "../../party-context/PartyContext.tsx";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ApplicationContext} from "../../../../context/application-context/ApplicationContext.tsx";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {AppPath} from "../../../../routes-constants.ts";


const Modal = () => {
  const {partyState: {values}, closeModal, isEditingMode, partyIndex} = useContext(PartyContext)
  const {addNewParty, editParty} = useContext(ApplicationContext)

  const navigate = useNavigate()

  const onClickCreateParty = () => {
    addNewParty(values)
    navigate(AppPath.DEFAULT)
  }

  const onClickEditParty = () => {
    if(partyIndex !== undefined){
      editParty(partyIndex, values)
      navigate(AppPath.DEFAULT)
    }
  }

  const {title: buttonTitle, ...buttonProps} = useMemo(() => {
    if (isEditingMode) {
      return {
        title: 'Update Party',
        onClick: onClickEditParty
      }
    }
    return {
      title: 'Create Party',
      onClick: onClickCreateParty
    }
  }, [isEditingMode])

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-area">
          <div className="icon-wrapper">
            <IconButton className="close-icon" onClick={closeModal}>
              <CloseIcon fontSize="large"/>
            </IconButton>
          </div>
          <div className="modal-body">
            <OverViewTable/>
          </div>
          <div className="create-party">
            <Button size="large" variant="contained" color="success" {...buttonProps}>
              {buttonTitle}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

const ModalContainer = () => {
  const {partyState: {modal: {isOpen}}} = useContext(PartyContext)
  if (!isOpen) {
    return null
  }
  return createPortal(<Modal/>, document.body)
}
export default ModalContainer;