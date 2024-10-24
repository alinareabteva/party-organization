import "./Party.scss"
import AboutParty from "./components/about-party/AboutParty.tsx";
import GuestsList from "./components/guests-list/GuestsList.tsx";
import OverViewTable from "./components/overview/OverViewTable.tsx";
import PartyContextProvider from "./party-context/PartyContext.tsx";
import FormActions from "./components/form-actions/FormActions.tsx";

const Party = () => {
  return (
    <PartyContextProvider>
      <form className="form">
        <div className="container">
          <AboutParty/>
          <GuestsList/>
          <OverViewTable/>
          <FormActions/>
        </div>
      </form>
    </PartyContextProvider>
  );
};

export default Party;