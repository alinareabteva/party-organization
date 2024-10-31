import "./Party.scss"
import PartyContextProvider from "./party-context/PartyContext.tsx";
import AboutParty from "./components/about-party/AboutParty.tsx";
import GuestsList from "./components/guests-list/GuestsList.tsx";
import Modal from "./components/modal/Modal.tsx";
import FormActions from "./components/form-actions/FormActions.tsx";

const Party = () => {
  return (
    <PartyContextProvider>
      <form className="form">
        <div className="container">
          <AboutParty/>
          <GuestsList/>
          <Modal/>
          <FormActions/>
        </div>
      </form>
    </PartyContextProvider>
  );
};

export default Party;