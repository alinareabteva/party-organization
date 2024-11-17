import Party from "../party/Party.tsx";
import {useParams} from "react-router-dom";
import {useContext, useMemo} from "react";
import {ApplicationContext} from "../../context/application-context/ApplicationContext.tsx";


const EditParty = () => {
  const {partyIndex} = useParams<{ partyIndex: string }>()
  const {applicationState: {parties}} = useContext(ApplicationContext);

  const partyToEdit = useMemo(() => {
    if (!partyIndex || !parties[+partyIndex]) {
      return undefined
    }
    const partyToEdit = parties[+partyIndex]
    return {values: partyToEdit}
  }, [partyIndex, parties]);

  return (
    <Party initialState={partyToEdit} partyIndex={partyIndex ? +partyIndex : undefined}/>
  );
};

export default EditParty;