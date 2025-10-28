import Button from './Button'
const PersonDetails = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <Button onClick={() => deletePerson(person.id)} text="delete" />
    </div>
  )
}
export default PersonDetails