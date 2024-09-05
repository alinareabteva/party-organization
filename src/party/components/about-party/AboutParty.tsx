import "./AboutParty.scss"

const AboutParty = () => {
  return (
    <>
          <div className="row">
            <label htmlFor="name" className="label">Party Name: </label>
            <input
              id="partyName"
              placeholder="Enter Party Name"
              className="input"
              type="text"
            />
          </div>

          <div className="row">
            <label htmlFor="name" className="label">Organizer:</label>
            <input
              id="firstName"
              placeholder="First Name"
              className="organaizer"
              type="text"
            />
            <input
              id="lastName"
              placeholder="Last Name"
              className="organaizer"
              type="text"
            />
          </div>

          <div className="row">
            <label htmlFor="name" className="label">Place:</label>
            <input
              id="place"
              placeholder="Enter Place"
              className="input"
              type="text"
            />
          </div>

          <div className="row">
            <label htmlFor="name" className="label">Date: </label>
            <input
              id="date"
              placeholder="Enter Date"
              className="input"
              type="date"
            />
          </div>

          <div className="row">
            <label htmlFor="name" className="label">Phone number: </label>
            <input
              id="phoneNumber"
              placeholder="Phone Number"
              className="input"
              type="text"
            />
          </div>

    </>
  );
};

export default AboutParty;