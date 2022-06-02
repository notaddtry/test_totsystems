import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { request } from '../../hooks/http.hook'
import { IFolder } from '../../types'

interface IInitialState {
  loading: boolean
  error: string | null | undefined
  folders: IFolder[]
}

const initialState: IInitialState = {
  loading: false,
  error: null,
  folders: [],
}

interface IEditInterface {
  body: string
  id: string
}
interface IError {
  message: string | null | undefined
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.loading = false
        state.folders = action.payload
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
        state.loading = false
        state.folders.push(action.payload)
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
        state.loading = false
        state.folders = state.folders.filter(
          (folder) => folder.id !== action.payload
        )
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
        console.log(action.payload)

        state.loading = false
        const foldetToEdit = state.folders.find(
          (folder) => folder.id === action.payload.id
        )
        if (foldetToEdit) {
          foldetToEdit.name = action.payload.name
        }
      })
      .addCase(editFolder.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error
      })
  },
})

export default folderSlice.reducer
