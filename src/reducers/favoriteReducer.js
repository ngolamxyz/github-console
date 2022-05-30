import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_FAVORITE } from "../api/queries";
        
export const queryFavorites = createAsyncThunk(
    'favorite/fetch',
    async () => {
      const response = await graphql.query({ query: FETCH_FAVORITE, variables: { login: profile.username }, fetchPolicy: "no-cache"});
      return response.data.user.following
    }
)

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: { followingUsers: []},
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryFavorites.fulfilled, (state, action) => {
            state.followingUsers = action.payload.users
        })
    }

})

export default favoriteSlice.reducer;