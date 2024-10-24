import {useContext, useMemo} from "react";
import dayjs from "dayjs";
import {PartyContext} from "../../party-context/PartyContext.tsx";

export interface OverviewItem {
  title: string;
  value: string | number;
}

export const useOverviewItems = (): Array<OverviewItem> => {
  const {partyState: {values: {guests}}} = useContext(PartyContext)

  return useMemo(() => {
    const now = dayjs();


    const countOfAlcohol = guests.reduce((previousValue, currentValue) => {
      currentValue.alcohol
        .map(a => a.name)
        .forEach(alcoholName => {
          if (Object.prototype.hasOwnProperty.call(previousValue, alcoholName)) {
            previousValue[alcoholName]++
          } else {
            previousValue[alcoholName] = 1
          }
        })
      return previousValue
    }, {} as Record<string, number>)

    return [
      {
        title: "Types of alcohol",
        value: Object.entries(countOfAlcohol).map(([alcoholName, countOfPeople]) => `${alcoholName} (${countOfPeople})`).join(", "),
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
          return diff >= 20 && diff < 30
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