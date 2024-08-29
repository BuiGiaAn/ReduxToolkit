import { configureStore } from '@reduxjs/toolkit'
import blogReaducer from './pages/blog/blog.reducer'

export const store = configureStore({
  reducer: {
    blog: blogReaducer
  }
})

// Lấy RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
