import { configureStore } from '@reduxjs/toolkit'
import loader from '@/store/features/loader'
import employee from '@/store/features/employee'

const store = configureStore({
  reducer: {
    loader,
    employee
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
