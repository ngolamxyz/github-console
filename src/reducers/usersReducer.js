import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { FETCH_USERS } from '../api/queries';

export const updateQuery = createAction('user/updateQuery');
export const queryUsers = createAsyncThunk(
  'users/queryUsers',
  async (query) => {
    if (!query) {
      return initialState
    }
    const response = await graphql.query({ query: FETCH_USERS, variables: { query }});
    return response.data.search
  }
)

const initialState = {
  total_count: 0,
  incomplete_results: false, 
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
      })
    builder.addCase(queryUsers.fulfilled, (state, action) => {
      state.items = action.payload.items
    })
  },
})

export default usersSlice.reducer;
