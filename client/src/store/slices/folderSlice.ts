import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { request } from '../../hooks/http.hook'
import { IError, IFolder } from '../../types'

interface IInitialState {
  loading: boolean
  error: string | null | undefined
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
      return rejectWithValue(error as IError)
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
      return rejectWithValue(error as IError)
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
      return rejectWithValue(error as IError)
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
      return rejectWithValue(error as IError)
    }
  }
)

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setShowModal(state, action) {
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
        // console.log(state.folders)
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false
        // state.error = action.payload
      })

      //addFolder
      .addCase(addFolder.pending, (state) => {
        state.loading = true
      })
      .addCase(addFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload)
        state.loading = false
      })
      .addCase(addFolder.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error
      })

      //removeFolder
      .addCase(removeFolder.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter(
          (folder) => folder.id !== action.payload
        )
        state.loading = false
      })
      .addCase(removeFolder.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error
      })

      //editFolder
      .addCase(editFolder.pending, (state) => {
        state.loading = true
      })
      .addCase(editFolder.fulfilled, (state, action) => {
        const foldetToEdit = state.folders.find(
          (folder) => folder.id === action.payload.id
        )
        if (foldetToEdit) {
          foldetToEdit.name = action.payload.name
        }
        state.loading = false
      })
      .addCase(editFolder.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error
      })
  },
})

export const { setShowModal } = folderSlice.actions

export default folderSlice.reducer
