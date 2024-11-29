import {API_KEY, BASE_URL} from "./base.ts";
import {PartyState} from "../pages/party/party-reducer/types.ts";

const PARTIES_BASE_URL = `${BASE_URL}/parties`


export const getAllPartiesApi = (offset: number, limit: number) => {
  const params = new URLSearchParams();
  params.append("key", API_KEY)
  params.append("offset", offset + '')
  params.append("limit", limit + '')

  return fetch(`${PARTIES_BASE_URL}/all?${params}`)
    .then(response => {
      if (response.status === 200) {
        return response.json() as Promise<Array<PartyState>>;
      }

      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw response;
    })

}

export const getPartyApi = (id: number) => {
  const params = new URLSearchParams();
  params.append("key", API_KEY)
  return fetch(`${PARTIES_BASE_URL}/${id}?${params}`).then(response => {
    if (response.status === 200) {
      return response.json() as Promise<PartyState>;
    }

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw response;
  })
}
