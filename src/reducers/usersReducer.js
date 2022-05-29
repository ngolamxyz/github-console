import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { FETCH_USERS } from '../api/queries';
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
      response = await graphql.query({ query: FETCH_USERS, variables: { query, after: cursor }});
    } catch(err) {
      console.log("APP.ERRR: ", err)
      return initialState;
    }
    return response.data.search
  }
)

const initialState = {
  userCount: 0,
  items: [],
  search_query: ""
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateQuery, (state, action) => {
        state.search_query = action.payload
        window.history.replaceState(null, null, `?q=${action.payload}`);
      })
    builder.addCase(queryUsers.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.userCount = action.payload.userCount
    })
  },
})

export default usersSlice.reducer;
