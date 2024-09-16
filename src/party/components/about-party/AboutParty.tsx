import "./AboutParty.scss"
import {useState, ChangeEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";
import BaseInput from "../../../components/base/base-input/BaseInput.tsx";

interface AboutPartyState {
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

const BASE_FORMAT = "YYYY-MM-DD";

const AboutParty = () => {
  const [state, setState] = useState<AboutPartyState>({
    partyName: '',
    organizerFirstName: '',
    organizerLastName: '',
    place: '',
    date: dayjs(),
    phoneNumber: ''
  })

  const handleChange = ({target: {id, value}}: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
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
      value: state[key]
    }
  }
  const createPropsForInput = (key: CreatePropsForInput["key"], placeholder: CreatePropsForInput["placeholder"]) => {
    return createAllPropsForInput({key, placeholder})
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = dayjs(event.target.value, BASE_FORMAT)
    setState(prevState => ({
      ...prevState,
      date
    }))
  }

  return (
    <>
      <BaseInput
        label="Name"
        {...createPropsForInput("partyName", 'Enter Party Name')}
      />

      <div className="organizer">
        <label htmlFor="name" className="label">Organizer:</label>
        <input
          {...createAllPropsForInput({
            key: "organizerFirstName",
            placeholder: 'First Name',
            className: "organizer-input"
          })}
        />
        <input
          {...createAllPropsForInput({
            key: "organizerLastName",
            placeholder: 'Last Name',
            className: "organizer-input"
          })}
        />
      </div>


      <BaseInput
        label="Place:"
        {...createPropsForInput("place", 'Enter Place')}
      />
      <BaseInput
        id="date"
        onChange={handleDateChange}
        className="base-input"
        type="date"
        value={state.date.format(BASE_FORMAT)}
        label="Date:"
      />

      <BaseInput
        label="Phone number: "
        {...createPropsForInput("phoneNumber", 'Phone Number')}
      />
    </>
  );
};

export default AboutParty;