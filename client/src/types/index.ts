export interface IFolder {
  id: string
  name: string
  canBeEdited: boolean
  messagesInFolder?: IMessage[]
}

export interface IMessage {
  id: string
  from: string
  to: string
  body: string
  folder: string
  isRead: boolean
  isMarked: boolean
  isFavorite: boolean
  date: string
}

export interface IError {
  message: string | null | undefined
}
