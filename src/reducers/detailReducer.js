import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FOLLOWERS_DETAILS, FOLLOWINGS_DETAILS, FOLLOW_A_USER, REPO_DETAILS, UNFOLLOW_A_USER, USER_DETAILS } from "../api/queries";
        
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

export const queryNextPageRepos = createAsyncThunk(
    'userDetail/fetchNextPageRepos',
    async ({ login, after}) => {
        const response = await graphql.query({ query: REPO_DETAILS, variables: { login, after }});
        return response.data.user.repositories
    }
)

export const queryFollowers = createAsyncThunk(
    'userDetail/fetchFollowers',
    async ({ login, after}) => {
        const response = await graphql.query({ query: FOLLOWERS_DETAILS, variables: { login, after }});
        return response.data.user.followers
    }
)

export const queryNextPageFollowers = createAsyncThunk(
    'userDetail/fetchNextPageFollowers',
    async ({ login, after}) => {
        const response = await graphql.query({ query: FOLLOWERS_DETAILS, variables: { login, after }});
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

export const queryNextPageFollowing = createAsyncThunk(
    'userDetail/fetchNextPageFollowings',
    async ({login, after}) => {
        const response = await graphql.query({ query: FOLLOWINGS_DETAILS, variables: { login, after } });
        return response.data.user.following
    }
)

export const toggleFollowUser = createAsyncThunk(
  'userDetail/togglefollowUser',
  async (user) => {
    const mutation = user.viewerIsFollowing ? UNFOLLOW_A_USER : FOLLOW_A_USER;
    try {
      const response = await graphql.mutate({ mutation, variables: { userId: user.id }});
      return response.data.result
    } catch(err) {
      console.log("APP.ERRR: ", err)
    }
  }
)

export const toggleFollowUserFollowingTab = createAsyncThunk(
  'userDetail/togglefollowUserFollowingTab',
  async (user) => {
    const mutation = user.viewerIsFollowing ? UNFOLLOW_A_USER : FOLLOW_A_USER;
    try {
      const response = await graphql.mutate({ mutation, variables: { userId: user.id }});
      return response.data.result
    } catch(err) {
      console.log("APP.ERRR: ", err)
    }
  }
)

const userDetailSlice = createSlice({
    name: "user",
    initialState: {
        fromServer: false,
        userDetail: { followers: {}, following: {}, repositories: {}},
        repositories: { items: [], loading: false, pageInfo: {}},
        followers: { items: [], loading: false, pageInfo: {}},
        following: { items: [], loading: false, pageInfo: {}}
    },
    reducers: { 
        setFromServerUserDetail: (state, action) => {
            state.userDetail.fromServer = false
        },
        setFromServerRepositories: (state, action) => {
            state.repositories.fromServer = false
        },
        setFromServerFollowers: (state, action) => {
            state.followers.fromServer = false
        },
        setFromServerFollowing: (state, action) => {
            state.following.fromServer = false
        }
     },
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
        builder.addCase(queryNextPageRepos.pending, (state, action) => {
            state.repositories.loading = true;
        })
        builder.addCase(queryNextPageFollowing.pending, (state, action) => {
            state.following.loading = true;
        })
        builder.addCase(queryFollowers.fulfilled, (state, action) => {
            state.followers = action.payload
        })
        builder.addCase(queryFollowings.fulfilled, (state, action) => {
            state.following = action.payload
        })
        builder.addCase(queryNextPageFollowers.fulfilled, (state, action) => {
            let newItems;
            newItems = state.followers.items.concat(action.payload.items)
            state.followers = { ...state.followers, items: newItems, loading: false, pageInfo: action.payload.pageInfo}
        })
        builder.addCase(queryNextPageRepos.fulfilled, (state, action) => {
            let newItems;
            newItems = state.repositories.items.concat(action.payload.items)
            state.repositories = { ...state.repositories, items: newItems, loading: false, pageInfo: action.payload.pageInfo}
        })
        builder.addCase(queryNextPageFollowing.fulfilled, (state, action) => {
            let newItems;
            newItems = state.following.items.concat(action.payload.items)
            state.following = { ...state.following, items: newItems, loading: false, pageInfo: action.payload.pageInfo}
        })
        builder.addCase(toggleFollowUser.fulfilled, (state, action) => {
            const currUser = action.payload.user;
            state.followers.items = state.followers.items.map(user => {
                if (user.id === currUser.id) {
                    return {...user, viewerIsFollowing: currUser.viewerIsFollowing}
                } else {
                    return user;
                }
            })
        })
        builder.addCase(toggleFollowUserFollowingTab.fulfilled, (state, action) => {
            const currUser = action.payload.user;
            state.following.items = state.following.items.map(user => {
                if (user.id === currUser.id) {
                    return {...user, viewerIsFollowing: currUser.viewerIsFollowing}
                } else {
                    return user;
                }
            })
        })
    }

})

export const { setFromServerUserDetail, setFromServerFollowers, setFromServerFollowing, setFromServerRepositories } = userDetailSlice.actions

export default userDetailSlice.reducer;