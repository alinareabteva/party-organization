import React from 'react';
import BaseTable from "../../../../components/base/table/BaseTable.tsx";
import {PartyItem} from "../../usePartyListData.ts";
import {usePartyListColumns} from "../../usePartyListColumns.tsx";
import PartyListPagination from "../pagination/PartyListPagination.tsx";

interface PartyListTableProps {
  data: PartyItem[];
}

const PartyListTable = ({data}: PartyListTableProps) => {
  const columns = usePartyListColumns()
  return (
    <div>
      <BaseTable<PartyItem> columns={columns} data={data}/>
      <PartyListPagination/>
    </div>
  );
};

export default PartyListTable;