import {useContext, useMemo} from "react";
import {PartyItem} from "./usePartyListData.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {Column} from "../../components/base/table/BaseTable.tsx";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";


export const usePartyListColumns = (): Array<Column<PartyItem>> => {
  const {deleteParty} = useContext(ApplicationContext)

  return useMemo(() => {
    return [
      {
        title: "Name of The Party",
        fieldName: "partyName",
        className: 'party-name'
      },
      {
        title: "First Name",
        fieldName: "organizerFirstName"
      },
      {
        title: "Last Name",
        fieldName: "organizerLastName"
      },
      {
        title: "Place",
        fieldName: "place"
      },
      {
        title: "Date",
        fieldName: "date",
        render: rowItem => (
          <>{rowItem.date.format("DD-MM-YYYY")}</>
        )
      },
      {
        title: "Phone Number",
        fieldName: "phoneNumber"
      },
      {
        title: "Actions",
        fieldName: "actions",
        render: (rowItem, index) => {
          return (
            <div className="actions">
              <IconButton size="small" onClick={() => deleteParty(index)}>
                <DeleteIcon/>
              </IconButton>
            </div>
          )
        }
      },


    ]
  }, [deleteParty])
}