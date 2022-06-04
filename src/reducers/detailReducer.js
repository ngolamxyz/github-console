import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FOLLOWERS_DETAILS, FOLLOWINGS_DETAILS, REPO_DETAILS, USER_DETAILS } from "../api/queries";
import { hasNextPage as hasNextPageHelper } from "../utils/hasNextPage";
        
export const queryUserDetail = createAsyncThunk(
    'userDetail/fetch',
    async (login) => {
        const response = await graphql.query({ query: USER_DETAILS, variables: { login } });
        return response.data.user
    }
)

export const queryRepos = createAsyncThunk(
    'userDetail/fetchRepos',
    async (login) => {
        const response = await graphql.query({ query: REPO_DETAILS, variables: { login } });
        return response.data.user.repositories
    }
)

export const queryFollowers = createAsyncThunk(
    'userDetail/fetchFollowers',
    async ({ login, after}) => {
        const response = await graphql.query({ query: FOLLOWERS_DETAILS, variables: { login, after }, fetchPolicy: 'no-cache'});
        return response.data.user.followers
    }
)

export const queryNextPageFollowers = createAsyncThunk(
    'userDetail/fetchNextPageFollowers',
    async ({ login, after}) => {
        const response = await graphql.query({ query: FOLLOWERS_DETAILS, variables: { login, after }, fetchPolicy: 'no-cache'});
        return response.data.user.followers
    }
)

export const queryFollowings = createAsyncThunk(
    'userDetail/fetchFollowings',
    async (login) => {
        const response = await graphql.query({ query: FOLLOWINGS_DETAILS, variables: { login } });
        return response.data.user.following
    }
)


const userDetailSlice = createSlice({
    name: "user",
    initialState: {
        userDetail: { followers: {}, following: {}, repositories: {}},
        repositories: { items: []},
        followers: { items: [], loading: false, pageInfo: {}},
        following: { items: [], loading: false, pageInfo: {}}
    },
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryUserDetail.fulfilled, (state, action) => {
            state.userDetail = action.payload
        })
        builder.addCase(queryRepos.fulfilled, (state, action) => {
            state.repositories = action.payload
        })
        builder.addCase(queryNextPageFollowers.pending, (state, action) => {
            state.followers.loading = true;
        })
        builder.addCase(queryFollowers.fulfilled, (state, action) => {
            state.followers = action.payload
        })
        builder.addCase(queryNextPageFollowers.fulfilled, (state, action) => {
            let newItems;
            newItems = state.followers.items.concat(action.payload.items)
            state.followers = { ...state.followers, items: newItems, loading: false, pageInfo: action.payload.pageInfo}
        })
        builder.addCase(queryFollowings.fulfilled, (state, action) => {
            state.followings = action.payload
        })
    }

})

export default userDetailSlice.reducer;