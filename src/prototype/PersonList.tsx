import BaseStateComponent, {formValidatorConfig, Person} from "./BaseStateComponent.tsx";
import "./BaseStateComponent.scss"
import {MouseEvent, useState} from "react";
import {ErrorState, validateStateFunc} from "./validation";


interface PersonListState {
  persons: Person[];
  personsErrorState: ErrorState<Person>[];
}

const PersonList = () => {

  const [personsState, setPersonsState] = useState<PersonListState>({
    persons: [],
    personsErrorState: []
  })

  const onPersonChange = (part: Partial<Person>, index: number) => {
    setPersonsState(prevState => ({
      ...prevState,
      persons: prevState.persons.map((person, idx) => {
        if(index === idx){
          return {
            ...person,
            ...part
          }
        }
        return person
      })
    }))
  }
  const addNewPerson = (e: MouseEvent) => {
    e.preventDefault();

    const newPerson: Person = {
      name: '',
      surname: '',
      dateOfBirth: '',
      college: '',
      animal: '',
    }
    const personErrors: ErrorState<Person> = {
      name: new Array<string>(),
      surname: new Array<string>(),
      dateOfBirth: new Array<string>(),
      college: new Array<string>(),
      animal: new Array<string>(),
    }

    setPersonsState(prevState => {
      const personsErrorState = prevState.persons.map((person) => validateStateFunc(person, formValidatorConfig))
      if(personsErrorState.some((errorState) => Object.values(errorState).some(el => el.length > 0))){
        return {
          ...prevState,
          personsErrorState
        }
      }
      return {
        ...prevState,
        persons: [...prevState.persons, newPerson],
        personsErrorState: [...personsErrorState, personErrors]
      }
    })

  }

  return (
    <div className="people">
      <h2 className="peopleLabel">People:</h2>
      <div className="peopleList">
        {personsState.persons.map((person, index) => (
          <BaseStateComponent
            key={index}
            index={index}
            person={person}
            personErrors={personsState.personsErrorState[index]}
            onChange={onPersonChange}
          />)
        )}
      </div>

      <button
        className="button-add"
        onClick={addNewPerson}
      >
        Add Person
      </button>
    </div>
  );
};

export default PersonList;