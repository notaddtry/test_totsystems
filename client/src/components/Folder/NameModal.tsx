import React from 'react'

interface INameModalProps {
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  folderName: string
  placeholder: string
  postFolder: (e?: React.MouseEvent<HTMLElement>, id?: string) => void
}

const NameModal: React.FC<INameModalProps> = ({
  setFolderName,
  folderName,
  placeholder,
  postFolder,
}) => {
  return (
    <div className='modal_folder row'>
      <div className='input-field col s6'>
        <input
          placeholder='Enter..'
          id='folder_name'
          type='text'
          className='left'
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <label htmlFor='folder_name'>{placeholder}</label>
      </div>
      <button
        className='waves-effect waves-light btn deep-purple darken-1 col s2 push-s4'
        onClick={postFolder}>
        Отправить
      </button>
    </div>
  )
}

export default NameModal
