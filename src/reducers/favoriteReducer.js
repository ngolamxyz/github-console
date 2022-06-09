import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_FAVORITE, UNFOLLOW_A_USER } from "../api/queries";
        
export const queryFavorites = createAsyncThunk(
    'favorite/fetch',
    async () => {
        const variables = { login: profile.username }
        const response = await graphql.query({ query: FETCH_FAVORITE, variables }, fetchPolicy: "no-cache");
        return response.data.user.following
    }
)

export const queryNextPageFavorite = createAsyncThunk(
    'favorite/fetchNextPage',
    async (after) => {
        const variables = { login: profile.username, after }
        const response = await graphql.query({ query: FETCH_FAVORITE, variables });
        return response.data.user.following
    }
)

export const unFollowUser = createAsyncThunk(
  'favorite/unFollowingUser',
  async (user) => {
    const mutation = UNFOLLOW_A_USER;
    const response = await graphql.mutate({ mutation, variables: { userId: user.id }, fetchPolicy: "no-cache"});
    return response.data.result
  }
)


const favoriteSlice = createSlice({
    name: "favorite",
    initialState: { items: [], pageInfo: {}, loading: false, fromServer: false },
    reducers: {
        setFromServer: (state, action) => {
            state.fromServer = false
        }
     },
    extraReducers: (builder) => {
        builder.addCase(queryFavorites.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(queryFavorites.fulfilled, (state, action) => {
            return { ...state, ...action.payload, loading: false }
        })
        builder.addCase(queryNextPageFavorite.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(queryNextPageFavorite.fulfilled, (state, action) => {
            const newItems = action.payload.items
            return {...state, items: state.items.concat(newItems), pageInfo: action.payload.pageInfo, loading: false}
        })
        builder.addCase(unFollowUser.fulfilled, (state, action) => {
            const currUser = action.payload.user;
            state.items = state.items.filter(user => user.id !== currUser.id)
        })
    }

})

export const { setFromServer } = favoriteSlice.actions

export default favoriteSlice.reducer;