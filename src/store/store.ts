import { configureStore } from '@reduxjs/toolkit'
import signupComponentReducer from './reducers/signupSlice'
import userReducer from './reducers/signupSlice'
import tokenReducer from './reducers/logintokenSlice'
import socialEmailReducer from './reducers/socialSlice'
import nicknameReducer from './reducers/logintokenSlice'
import emailReducer from './reducers/logintokenSlice'
import idxReducer from './reducers/logintokenSlice'

export const store = configureStore({
    reducer: {
        signup: signupComponentReducer,
        user: userReducer,
        token: tokenReducer,
        nickname: nicknameReducer,
        email : emailReducer,
        socialEmail: socialEmailReducer,
        idx: idxReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
