import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const updateQuery = createAction('user/updateQuery');

export const queryUsers = createAsyncThunk(
  'users/queryUsers',
  async (query) => {
    if (!query) {
      return initialState
    }
    const response = await octokit.request('GET /search/users?q=' + query);
    return response.data
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
