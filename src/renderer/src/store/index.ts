import { configureStore } from '@reduxjs/toolkit'
import loader from '@/store/features/loader'
import employee from '@/store/features/employee'
import production from '@/store/features/production'

const store = configureStore({
  reducer: {
    loader,
    employee,
    production
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
