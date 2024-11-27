import React from 'react';
import BaseTable from "../../../../components/base/table/BaseTable.tsx";
import {PartyItem} from "../../usePartyListData.ts";
import {usePartyListColumns} from "../../usePartyListColumns.tsx";

interface PartyListTableProps {
  data: PartyItem[];
}

const PartyListTable = ({data}: PartyListTableProps) => {
  const columns = usePartyListColumns()
  return (
    <div>
      <BaseTable<PartyItem> columns={columns} data={data}/>
    </div>
  );
};

export default PartyListTable;