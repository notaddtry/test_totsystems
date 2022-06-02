import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import folderSlice from './slices/folderSlice'

export const store = configureStore({
  reducer: {
    folder: folderSlice,
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
