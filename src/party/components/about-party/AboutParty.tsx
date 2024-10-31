import "./AboutParty.scss"
import {ChangeEvent, useContext} from "react";
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";
import BaseInput from "../../../components/base/base-input/BaseInput.tsx";
import {PartyContext} from "../../party-context/PartyContext.tsx";
import {DatePicker} from "@mui/x-date-pickers";
import {InputAdornment} from "@mui/material";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PlaceIcon from '@mui/icons-material/Place';
import CelebrationIcon from '@mui/icons-material/Celebration';

export interface AboutPartyState {
  partyName: string;
  organizerFirstName: string;
  organizerLastName: string;
  place: string;
  date: Dayjs;
  phoneNumber: string;
}

interface CreatePropsForInput {
  key: keyof Omit<AboutPartyState, "date">;
  placeholder: string;
  type?: string;
  className?: string;
}

const AboutParty = () => {

  const {
    setAboutPartyState,
    partyState: {
      values: {aboutParty},
      errors: {aboutParty: aboutPartyErrors}
    }
  } = useContext(PartyContext)

  const handleChange = ({target: {id, value}}: ChangeEvent<HTMLInputElement>) => {
    setAboutPartyState({
      [id]: value
    })
  }

  const createAllPropsForInput = ({key, placeholder, type = "text", className = ""}: CreatePropsForInput) => {
    return {
      id: key,
      className: classNames({
        [className]: !!className,
      }),
      type,
      placeholder,
      onChange: handleChange,
      value: aboutParty[key]
    }
  }
  const createPropsForInput = (key: CreatePropsForInput["key"], placeholder: CreatePropsForInput["placeholder"]) => {
    return createAllPropsForInput({key, placeholder})
  }

  const handleDateChange = (partyDate: Dayjs | null) => {
    setAboutPartyState({
      date: dayjs(partyDate)
    })
  }

  return (
    <div className="about-party">
      <BaseInput
        label="Name of the Party:"
        {...createPropsForInput("partyName", 'Enter Party Name')}
        errorMessage={aboutPartyErrors?.partyName?.join("; ")}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <CelebrationIcon/>
              </InputAdornment>
            ),
          },
        }}
      />

      <div className="organizer">
        <div className="inputs">
          <BaseInput
            label="First Name:"
            {...createAllPropsForInput({
              key: "organizerFirstName",
              placeholder: 'Enter First Name',
              className: "organizer-input",
            })}
            errorMessage={aboutPartyErrors?.organizerFirstName?.join("; ")}
          />
          <BaseInput
            label="Last Name:"
            {...createAllPropsForInput({
              key: "organizerLastName",
              placeholder: 'Enter Last Name',
              className: "organizer-input"
            })}
            errorMessage={aboutPartyErrors?.organizerLastName?.join("; ")}
          />
        </div>
      </div>


      <BaseInput
        label="Place:"
        {...createPropsForInput("place", 'Enter Place')}
        errorMessage={aboutPartyErrors?.place?.join("; ")}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <PlaceIcon/>
              </InputAdornment>
            ),
          },
        }}
      />
      <DatePicker
        value={aboutParty.date}
        label="Date:"
        onChange={handleDateChange}
        className="base-input-wrapper"
        //errorMessage={aboutPartyErrors?.date?.join("; ")}
      />
      <BaseInput
        label="Phone number: "
        {...createPropsForInput("phoneNumber", 'Phone Number')}
        errorMessage={aboutPartyErrors?.phoneNumber?.join("; ")}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <AddIcCallIcon/>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default AboutParty;