import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { request } from '../../hooks/http.hook'
import { IError, IMessage } from '../../types'

interface IInitialState {
  messages: IMessage[]
  loading: boolean
  error: string | null | undefined
}
interface ISearchMessages {
  query: string
}

const initialState: IInitialState = {
  messages: [],
  loading: false,
  error: null,
}

export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await request('/api/messages')
      return data
    } catch (error) {
      return rejectWithValue(error as IError)
    }
  }
)

export const searchMessages = createAsyncThunk(
  'message/searchMessages',
  async ({ query }: ISearchMessages, { rejectWithValue }) => {
    try {
      const data = await request(`/api/messages/?s=${query}`)
      return data
    } catch (error) {
      return rejectWithValue(error as IError)
    }
  }
)

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload
        state.loading = false
        // console.log(state.folders)
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        // state.error = action.payload
      })

      //searchMessages
      .addCase(searchMessages.pending, (state) => {
        state.loading = true
      })
      .addCase(searchMessages.fulfilled, (state, action) => {
        console.log(action.payload)

        state.messages = action.payload
        state.loading = false
        // console.log(state.folders)
      })
      .addCase(searchMessages.rejected, (state, action) => {
        state.loading = false
        // state.error = action.payload
      })
  },
})

export default messageSlice.reducer
