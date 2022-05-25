import React, { useEffect } from 'react';
import './Home.css';
import TextField from '@mui/material/TextField';
import ResultList from './components/ResultList';
import { useDispatch, useSelector } from 'react-redux';
import { queryUsers, updateQuery } from './reducers/userReducer';
import { debounce } from '@mui/material';


export default function Home() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    dispatch(updateQuery(searchValue))
    window.history.replaceState(null, null, `?q=${searchValue}`);
    loadData(searchValue)
  }
  const loadData = debounce((searchValue) => {
    dispatch(queryUsers(searchValue))
  })
  return (
    <div className="Home">
      <TextField id="searchbox" onChange={handleSearch} value={users.search_query} type="text" autoFocus />
      <ResultList></ResultList>
    </div>
  );
}
