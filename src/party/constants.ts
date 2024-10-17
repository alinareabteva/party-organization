import {v4 as uuidv4} from "uuid";
import {AlcoholDto} from "./components/guests-list/guest/GuestComponent.tsx";

export const ALCOHOL_NAMES: Array<AlcoholDto> = [
  {name: "Vodka", id: uuidv4()},
  {name: "Wine", id: uuidv4()},
  {name: "Beer", id: uuidv4()},
  {name: "Sangria", id: uuidv4()},
  {name: "Champagne", id: uuidv4()},
  {name: "Rum", id: uuidv4()},
  {name: "Calvados", id: uuidv4()},
  {name: "Brandy", id: uuidv4()},
];