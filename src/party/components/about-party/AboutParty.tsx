import "./AboutParty.scss"
import {ChangeEvent, SetStateAction} from "react";
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";
import BaseInput from "../../../components/base/base-input/BaseInput.tsx";
import {BASE_FORMAT} from "../../../utilities.ts";
import {ErrorState} from "../../../components/validation";

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
export interface AboutPartyProps {
  aboutPartyState: AboutPartyState;
  setAboutPartyState: (stateSetter: SetStateAction<AboutPartyState>) => void;
  aboutPartyErrors: ErrorState<AboutPartyState>;
}

const AboutParty = ({aboutPartyState, setAboutPartyState, aboutPartyErrors}:AboutPartyProps) => {

  const handleChange = ({target: {id, value}}: ChangeEvent<HTMLInputElement>) => {
    setAboutPartyState(prevState => ({
      ...prevState,
      [id]: value
    }))
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
      value: aboutPartyState[key]
    }
  }
  const createPropsForInput = (key: CreatePropsForInput["key"], placeholder: CreatePropsForInput["placeholder"]) => {
    return createAllPropsForInput({key, placeholder})
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = dayjs(event.target.value, BASE_FORMAT)
    setAboutPartyState(prevState => ({
      ...prevState,
      date
    }))
  }

  return (
    <div className="about-party">
      <BaseInput
        label="Name"
        {...createPropsForInput("partyName", 'Enter Party Name')}
        errorMessage={aboutPartyErrors?.partyName?.join("; ")}
      />

      <div className="organizer">
        <label htmlFor="name" className="label">Organizer:</label>
        <div className="inputs">
          <BaseInput
            {...createAllPropsForInput({
              key: "organizerFirstName",
              placeholder: 'First Name',
              className: "organizer-input",
            })}
            errorMessage={aboutPartyErrors?.organizerFirstName?.join("; ")}
          />
          <BaseInput
            {...createAllPropsForInput({
              key: "organizerLastName",
              placeholder: 'Last Name',
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
      />
      <BaseInput
        id="date"
        onChange={handleDateChange}
        className="base-input"
        type="date"
        value={aboutPartyState.date.format(BASE_FORMAT)}
        label="Date:"
        errorMessage={aboutPartyErrors?.date?.join("; ")}
      />

      <BaseInput
        label="Phone number: "
        {...createPropsForInput("phoneNumber", 'Phone Number')}
        errorMessage={aboutPartyErrors?.phoneNumber?.join("; ")}
      />
    </div>
  );
};

export default AboutParty;