import { h } from 'hyperapp'

export const Title = () => {
  return (
    <div>
      <h3>Anniversaries</h3>
    </div>
  )
}

export const List = () => {
  return (
    <div>
      <ul>
        <li> Hernandez, Robert \& Bonner</li>
      </ul>
    </div>
  )
}

export const Anniversaries = () => {
  return (
    <div>
      <Title/>
      <List/>
    </div>)
}
