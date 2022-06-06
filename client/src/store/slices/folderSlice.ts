import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { request } from '../../components/helpers/http'
import { IError, IFolder } from '../../types'

interface IInitialState {
  loading: boolean
  error: IError | null
  folders: IFolder[]
  showModal: boolean
}

const initialState: IInitialState = {
  loading: false,
  error: null,
  folders: [],
  showModal: false,
}

interface IEditInterface {
  body: string
  id: string
}

export const fetchFolders = createAsyncThunk(
  'folder/fetchFolders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await request('/api/folders')
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const addFolder = createAsyncThunk(
  'folder/addFolder',
  async (body: string, { rejectWithValue }) => {
    try {
      const data = await request('/api/folders', 'POST', body)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const removeFolder = createAsyncThunk(
  'folder/removeFolder',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await request(`/api/folders/${id}`, 'DELETE')
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const editFolder = createAsyncThunk(
  'folder/editFolder',
  async ({ body, id }: IEditInterface, { rejectWithValue }) => {
    try {
      const data = await request(`/api/folders/${id}`, 'PUT', body)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.folders = action.payload
        state.loading = false
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error as IError
      })

      //addFolder

      .addCase(addFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload)
      })

      //removeFolder

      .addCase(removeFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter(
          (folder) => folder.id !== action.payload
        )
      })

      //editFolder

      .addCase(editFolder.fulfilled, (state, action) => {
        const foldetToEdit = state.folders.find(
          (folder) => folder.id === action.payload.id
        )
        if (foldetToEdit) {
          foldetToEdit.name = action.payload.name
        }
      })
  },
})

export const { setShowModal } = folderSlice.actions

export default folderSlice.reducer
