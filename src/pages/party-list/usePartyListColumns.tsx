import {ReactNode, useMemo} from "react";
import {PartyState} from "../party/party-reducer/types.ts";

export interface PartyListColumn {
  title: string;
  fieldName: keyof PartyState["aboutParty"];
  render?: (rowItem: PartyState["aboutParty"]) => ReactNode;
}

export const usePartyListColumns = (): Array<PartyListColumn> => {

  return useMemo(() => {

    return [
      {
        title: "Name of The Party",
        fieldName: "partyName",
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


    ]
  }, [])
}