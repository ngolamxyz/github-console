import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FOLLOWERS_DETAILS, FOLLOWINGS_DETAILS, REPO_DETAILS, USER_DETAILS } from "../api/queries";
        
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
    async (login) => {
        const response = await graphql.query({ query: FOLLOWERS_DETAILS, variables: { login } });
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
        user: {
            userDetail: {},
            repositories: { items: []},
            followers: { items: []},
            following: { items: []}
        }
    },
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryUserDetail.fulfilled, (state, action) => {
            state.userDetail = action.payload
        })
        builder.addCase(queryRepos.fulfilled, (state, action) => {
            state.repositories = action.payload
        })
        builder.addCase(queryFollowers.fulfilled, (state, action) => {
            state.followers = action.payload
        })
        builder.addCase(queryFollowings.fulfilled, (state, action) => {
            state.followings = action.payload
        })
    }

})

export default userDetailSlice.reducer;