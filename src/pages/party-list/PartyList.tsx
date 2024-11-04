import {useContext} from "react";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";
import {usePartyListColumns} from "./usePartyListColumns.tsx";
import "./PartyList.scss"

const PartyList = () => {
  const {applicationState: {parties}} = useContext(ApplicationContext)
  const columns = usePartyListColumns()

  return (
    <div>
      <table className="table">
        <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.title}>
              {column.title}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {parties.map((party, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.fieldName}>
                {column.render ? (column.render(party.aboutParty)) : party.aboutParty[column.fieldName]?.toString()}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>


    </div>
  );
};

export default PartyList;