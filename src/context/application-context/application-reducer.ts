import {Reducer} from "react";
import {ApplicationActionType, ApplicationReducerState} from "./types.ts";
import {AvailableApplicationAction} from "./application-actions.ts";

export const INITIAL_STATE: ApplicationReducerState = {
  parties: []
}

export const applicationReducer: Reducer<ApplicationReducerState, AvailableApplicationAction> = (state, action) => {
  switch(action.type){
    case ApplicationActionType.ADD_PARTY: {
      return {
        ...state,
        parties: [...state.parties, action.payload]
      }
    }
  }
}