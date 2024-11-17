import {useContext, useMemo} from "react";
import {PartyItem} from "./usePartyListData.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Checkbox, IconButton} from "@mui/material";
import {Column} from "../../components/base/table/BaseTable.tsx";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";
import {generatePath, NavLink} from "react-router-dom";
import {AppPath} from "../../routes-constants.ts";

export const usePartyListColumns = (): Array<Column<PartyItem>> => {
  const {deleteParty, toggleSelectAll, applicationState: {parties, selectedParties}} = useContext(ApplicationContext)

  const indeterminate = selectedParties.length > 0 && selectedParties.length < parties.length
  const checkedAll = selectedParties.length === parties.length

  return useMemo(() => {
    return [
      {
        title: '',
        fieldName: 'checked',
        renderHeader: (column, cellIndex) => {
          return <Checkbox checked={checkedAll} indeterminate={indeterminate} onClick={toggleSelectAll}/>
        },
        render: (rowItem, index) => {
          return <Checkbox checked={rowItem.checked} onClick={() => alert("will be soon iimplemented")}/>
        }
      },
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
        title: "Total Guests",
        fieldName: "totalGuests"
      },
      {
        title: "Actions",
        fieldName: "actions",
        render: (rowItem, index) => {
          return (
            <div className="actions">
              <NavLink to={generatePath(AppPath.EDIT_PARTY_PAGE, {partyIndex: index.toString()})}>
                <IconButton size="small">
                  <EditIcon/>
                </IconButton>
              </NavLink>
              <IconButton size="small" onClick={() => deleteParty(index)}>
                <DeleteIcon/>
              </IconButton>
            </div>
          )
        }
      },


    ]
  }, [deleteParty, toggleSelectAll, indeterminate, checkedAll])
}