import "./OverViewTable.scss"
import {PartyState} from "../../Party.tsx";

const OverViewTable = ({guests}: PartyState) => {

  return (
    <div className="overview">
      <h2 className="overviewLabel">Overview:</h2>
      <div className="overviewContainer">
        <div className="wrapper">
          <div className="item">Types of alcohol:</div>
          <div className="item"></div>
          <div className="item">Quantity of boys:</div>
          <div className="item">{guests.filter(guest => guest.gender === "M").length}</div>
          <div className="item">Quantity of girls:</div>
          <div className="item">{guests.filter(guest => guest.gender === "F").length}</div>
          <div className="item">Number of people who don't drink</div>
          <div className="item">{guests.filter(guest => guest.alcohol.length === 0).length}</div>
          <div className="item">Number of people who younger than 20</div>
          <div className="item"></div>
          <div className="item">Number of people between 20 and 30 years</div>
          <div className="item"></div>
          <div className="item">Number of people older than 30</div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
};

export default OverViewTable;