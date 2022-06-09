import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { FETCH_USERS, FOLLOW_A_USER, UNFOLLOW_A_USER } from '../api/queries';
import { ITEMS_PER_PAGE } from '../utils/contants';

export const updateQuery = createAction('user/updateQuery');
export const queryUsers = createAsyncThunk(
  'users/queryUsers',
  async (pageNumber, { getState }) => {
    const state = getState()
    const query = state.users.search_query
    if (!query) {
      return initialState
    }
    let cursor = null;
    if (pageNumber && pageNumber > 1) {
      cursor = window.btoa(`cursor:${(pageNumber - 1) * ITEMS_PER_PAGE}`)
    }
    let response;
    try {
      response = await graphql.query({ query: FETCH_USERS, variables: { query, after: cursor }, fetchPolicy: "no-cache"});
    } catch(err) {
      console.log("APP.ERRR: ", err)
      return initialState;
    }
    return response.data.search
  }
)

export const toggleFollowUser = createAsyncThunk(
  'users/togglefollowUser',
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

const initialState = {
  userCount: 0,
  items: [],
  search_query: "",
  loading: false,
  pageNumber: 1
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPageNumber: (state, action) => { 
      state.pageNumber = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateQuery, (state, action) => {
        state.search_query = action.payload
        window.history.replaceState(null, null, `?q=${action.payload}`);
      })
    builder.addCase(queryUsers.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(queryUsers.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.userCount = action.payload.userCount
      state.loading = false;
    })
    builder.addCase(toggleFollowUser.fulfilled, (state, action) => {
      const currUser = action.payload.user;
      state.items = state.items.map(user => {
        if (user.id === currUser.id) {
          return {...user, viewerIsFollowing: currUser.viewerIsFollowing}
        } else {
          return user;
        }
      })
    })
  },
})

export const { setPageNumber } = usersSlice.actions

export default usersSlice.reducer;
