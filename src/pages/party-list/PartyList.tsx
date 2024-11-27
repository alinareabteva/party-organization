import "./PartyList.scss"
import {usePartyListData} from "./usePartyListData.ts";
import PartyListButtons from "./components/party-list-actions/PartyListButtons.tsx";
import DeleteModalContainer from "./components/delete-modal/DeleteModal.tsx";
import NoneParty from "../../components/base/none-party/NoneParty.tsx";
import PartyListTable from "./components/party-list-table/PartyListTable.tsx";
import {CircularProgress} from "@mui/material";
import {useContext} from "react";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";

const PartyList = () => {
  const data = usePartyListData()
  const {applicationState: {isPartiesFetched, loading}} = useContext(ApplicationContext)

  if (!isPartiesFetched || loading) {
    return (
      <div className="loading-progress">
        <CircularProgress color="success"/>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="none-party-container">
        <NoneParty/>
        <PartyListButtons/>
      </div>
    );
  }
  return (
    <div>
      <PartyListTable data={data}/>
      <PartyListButtons/>
      <DeleteModalContainer/>
    </div>
  );
};

export default PartyList;