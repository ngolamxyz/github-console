import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_FAVORITE } from "../api/queries";
        
export const queryFavorites = createAsyncThunk(
    'favorite/fetch',
    async () => {
        const variables = { login: profile.username }
        const response = await graphql.query({ query: FETCH_FAVORITE, variables });
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


const favoriteSlice = createSlice({
    name: "favorite",
    initialState: { items: [], totalCount: 0, pageInfo: {}, loading: false },
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryFavorites.fulfilled, (state, action) => {
            state = action.payload
        })
        builder.addCase(queryNextPageFavorite.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(queryNextPageFavorite.fulfilled, (state, action) => {
            const newItems = action.payload.items
            return {...state, items: state.items.concat(newItems), pageInfo: action.payload.pageInfo, loading: false}
        })
    }

})

export default favoriteSlice.reducer;