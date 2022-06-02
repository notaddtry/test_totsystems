import React from 'react'
import { IMessage } from '../../types'

interface ISearchComponent {
  messages: IMessage[]
}

const SearchComponent: React.FC<ISearchComponent> = ({ messages }) => {
  return <div></div>
}

export default SearchComponent
