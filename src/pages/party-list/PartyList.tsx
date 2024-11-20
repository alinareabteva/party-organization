import {usePartyListColumns} from "./usePartyListColumns.tsx";
import "./PartyList.scss"
import {PartyItem, usePartyListData} from "./usePartyListData.ts";
import BaseTable from "../../components/base/table/BaseTable.tsx";
import PartyListButtons from "./components/party-list-actions/PartyListButtons.tsx";
import DeleteModalContainer from "./components/delete-modal/DeleteModal.tsx";

const PartyList = () => {
  const columns = usePartyListColumns()
  const data = usePartyListData()

  return (
    <div>
      <BaseTable<PartyItem> columns={columns} data={data}/>
      <PartyListButtons/>
      <DeleteModalContainer/>
    </div>
  );
};

export default PartyList;