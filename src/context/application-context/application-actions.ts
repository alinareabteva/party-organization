import {AppActionFuncWithPayload, ApplicationAction, ApplicationActionType} from "./types.ts";
import {PartyState} from "../../pages/party/party-reducer/types.ts";


type AddNewPartyActionReturnType = ApplicationAction<ApplicationActionType.ADD_PARTY, PartyState>;
export const addNewPartyAction: AppActionFuncWithPayload<AddNewPartyActionReturnType['type'], AddNewPartyActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.ADD_PARTY,
    payload
  }
}

export type AvailableApplicationAction = AddNewPartyActionReturnType
