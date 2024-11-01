import {useContext} from "react";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";


const PartyList = () => {
  const {applicationState:{parties}} = useContext(ApplicationContext)

  return (
    <div>
      <ul>
        {parties.map((party, index) => (
          <li key={index}>
            {party.aboutParty.partyName}
          </li>
        ))}

      </ul>
    </div>
  );
};

export default PartyList;