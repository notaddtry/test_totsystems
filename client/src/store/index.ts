import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import folderSlice from './slices/folderSlice'
import messageSlice from './slices/messageSlice'

export const store = configureStore({
  reducer: {
    folder: folderSlice,
    message: messageSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
