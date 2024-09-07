import "./AboutParty.scss"
import {useState, ChangeEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";

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
        'base-input': true,
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
      <div className="row">
        <label htmlFor="name" className="label">Party Name: </label>
        <input
          {...createPropsForInput("partyName", 'Enter Party Name')}
        />
      </div>

      <div className="row">
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

      <div className="row">
        <label htmlFor="name" className="label">Place:</label>
        <input
          {...createPropsForInput("place", 'Enter Place')}
        />
      </div>

      <div className="row">
        <label htmlFor="name" className="label">Date: </label>
        <input
          id="date"
          onChange={handleDateChange}
          className="base-input"
          type="date"
          value={state.date.format(BASE_FORMAT)}
        />
      </div>

      <div className="row">
        <label htmlFor="name" className="label">Phone number: </label>
        <input
          {...createPropsForInput("phoneNumber", 'Phone Number')}
        />
      </div>

    </>
  );
};

export default AboutParty;