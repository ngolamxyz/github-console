import React, { useEffect } from 'react';
import './Home.css';
import TextField from '@mui/material/TextField';
import ResultList from './components/ResultList';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '@mui/material';
import { queryUsers, updateQuery } from './reducers/userReducer';

export default function Home() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const handleSearch = (event) => {
    const queryValue = event.target.value;
    dispatch(queryUsers(queryValue))
    // reloadPage(queryValue)
  }
  // useEffect(() => {
  //   const ele = document.getElementById("searchbox")
  //   ele.setSelectionRange(-1, -1)
  // })
  const reloadPage = debounce((query) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('q', query);
    window.location.search = urlParams;
  })
  
  return (
    <div className="Home">
      <TextField id="searchbox" onChange={handleSearch} value={users.search_query} type="text" autoFocus />
      <ResultList></ResultList>
    </div>
  );
}