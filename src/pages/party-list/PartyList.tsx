import {usePartyListColumns} from "./usePartyListColumns.tsx";
import "./PartyList.scss"
import {PartyItem, usePartyListData} from "./usePartyListData.ts";
import BaseTable from "../../components/base/table/BaseTable.tsx";
import PartyListButtons from "./components/party-list-actions/PartyListButtons.tsx";
import DeleteModalContainer from "./components/delete-modal/DeleteModal.tsx";
import NoneParty from "../../components/base/none-party/NoneParty.tsx";

const PartyList = () => {
  const columns = usePartyListColumns()
  const data = usePartyListData()

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
      <BaseTable<PartyItem> columns={columns} data={data}/>
      <PartyListButtons/>
      <DeleteModalContainer/>
    </div>
  );
};

export default PartyList;