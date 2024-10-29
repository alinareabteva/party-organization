import OverViewTable from "../../party/components/overview/OverViewTable.tsx";
import BaseIcon, {IconNames} from "../../components/base/icon/BaseIcon.tsx";
import "./Modal.scss"
import {useContext} from "react";
import {PartyContext} from "../../party/party-context/PartyContext.tsx";
import {createPortal} from "react-dom";

const Modal = ({onClose}: { onClose: () => void }) => {

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-area">
          <div className="icon-wrapper">
            <BaseIcon
              onClick={onClose}
              size={'badgeIcon'}
              name={IconNames.Close}/>
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