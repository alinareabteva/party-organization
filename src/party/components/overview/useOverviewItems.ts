import {Guest} from "../guests-list/guest/GuestComponent.tsx";
import {useMemo} from "react";
import dayjs from "dayjs";

export interface OverviewItem {
  title: string;
  value: string | number;
}

export const useOverviewItems = (guests: Array<Guest>): Array<OverviewItem> => {
  return useMemo(() => {
    const now = dayjs();
    return [
      {
        title: "Types of alcohol",
        value: ""
      },
      {
        title: "Quantity of boys",
        value: guests.filter(guest => guest.gender === "M").length
      },
      {
        title: "Quantity of girls",
        value: guests.filter(guest => guest.gender === "F").length
      },
      {
        title: "Number of people who don't drink",
        value: guests.filter(guest => guest.alcohol.length === 0).length
      },
      {
        title: "Number of people who younger than 20",
        value: guests.filter(guest => {
          return now.diff(guest.birthDate, "year") < 20
        }).length
      },
      {
        title: "Number of people between 20 and 30 years",
        value: guests.filter(guest => {
          const diff = now.diff(guest.birthDate, "year")
          return  diff >= 20 && diff < 30
        }).length
      },
      {
        title: "Number of people older than 30",
        value: guests.filter(guest => {
          return now.diff(guest.birthDate, "year") >= 30
        }).length
      },

    ]
  }, [guests])
}