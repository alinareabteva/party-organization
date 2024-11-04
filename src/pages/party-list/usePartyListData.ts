import {useContext, useMemo} from "react";
import {AboutPartyState} from "../party/components/about-party/AboutParty.tsx";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";

export interface PartyItem extends AboutPartyState {
  actions: unknown;
}

export const usePartyListData = (): Array<PartyItem> => {
  const {applicationState: {parties}} = useContext(ApplicationContext)

  return useMemo(() => {
    return parties.map(p => ({
      ...p.aboutParty,
      actions: undefined
    }))
  }, [parties])

}