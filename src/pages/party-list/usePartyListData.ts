import {useContext, useMemo} from "react";
import {AboutPartyState} from "../party/components/about-party/AboutParty.tsx";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";

export interface PartyItem extends AboutPartyState {
  checked: boolean;
  actions: unknown;
  totalGuests: number;
}

export const usePartyListData = (): Array<PartyItem> => {
  const {applicationState: {parties, selectedParties}} = useContext(ApplicationContext)

  return useMemo(() => {
    return parties.map((p, index) => ({
      ...p.aboutParty,
      checked: selectedParties.includes(index),
      actions: undefined,
      totalGuests: p.guests.length
    }))
  }, [parties, selectedParties])

}