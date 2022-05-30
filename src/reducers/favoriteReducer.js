import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_FAVORITE } from "../api/queries";
        
export const queryFavorites = createAsyncThunk(
    'favorite/fetch',
    async (direction, { getState }) => {
        const pageInfo = getState().favorite.pageInfo
        let variables;
        if (direction === "NEXT") {
            variables = { login: profile.username, after: pageInfo.endCursor }
        } else if(direction === 'PREV') {
            variables = { login: profile.username, before: pageInfo.startCursor }
        } else {
            variables = { login: profile.username }
        }

        const response = await graphql.query({ query: FETCH_FAVORITE, variables, fetchPolicy: "no-cache"});
        return response.data.user.following
    }
)

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: { followingUsers: [], totalCount: 0, pageInfo: {}, numberOfPages: 1 },
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryFavorites.fulfilled, (state, action) => {
            state.followingUsers = action.payload.users
            state.totalCount = action.payload.totalCount
            state.pageInfo = action.payload.pageInfo
        })
    }

})

export default favoriteSlice.reducer;