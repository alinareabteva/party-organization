import {AppActionFuncWithPayload, ApplicationAction, ApplicationActionType} from "./types.ts";
import {PartyState} from "../../pages/party/party-reducer/types.ts";


type AddNewPartyActionReturnType = ApplicationAction<ApplicationActionType.ADD_PARTY, PartyState>;
export const addNewPartyAction: AppActionFuncWithPayload<AddNewPartyActionReturnType['type'], AddNewPartyActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.ADD_PARTY,
    payload
  }
}


interface DeletePartyActionProps {
  index: number
}
type DeletePartyActionReturnType = ApplicationAction<ApplicationActionType.DELETE_PARTY, DeletePartyActionProps>
export const deletePartyAction: AppActionFuncWithPayload<DeletePartyActionReturnType['type'], DeletePartyActionReturnType['payload']> = (payload) => {
  return {
    type: ApplicationActionType.DELETE_PARTY,
    payload
  }
}



export type AvailableApplicationAction = AddNewPartyActionReturnType
  | DeletePartyActionReturnType
