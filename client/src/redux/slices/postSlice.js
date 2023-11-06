import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    limit: 1,
}

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setPosts : (state,action) => {
            state.posts = [...state.posts,...action.payload]
            state.limit += 1
        }
    }
})

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;