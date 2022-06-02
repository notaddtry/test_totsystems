export interface IFolder {
  id: string
  name: string
  canBeEdited: boolean
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
}

export interface IError {
  message: string | null | undefined
}
