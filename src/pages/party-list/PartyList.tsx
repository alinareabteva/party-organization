import {usePartyListColumns} from "./usePartyListColumns.tsx";
import "./PartyList.scss"
import {PartyItem, usePartyListData} from "./usePartyListData.ts";
import BaseTable from "../../components/base/table/BaseTable.tsx";

const PartyList = () => {
  const columns = usePartyListColumns()
  const data = usePartyListData()

  return (
    <div>
      <BaseTable<PartyItem> columns={columns} data={data}/>
    </div>
  );
};

export default PartyList;