import React, { useEffect } from 'react';
import './Home.css';
import TextField from '@mui/material/TextField';
import ResultList from './components/SearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { queryUsers, updateQuery } from './reducers/usersReducer';
import { Box, CircularProgress, debounce, InputAdornment, Stack } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    dispatch(updateQuery(searchValue))
    loadData(searchValue)
  }
  const loadData = debounce(() => {
    dispatch(queryUsers())
  })

  const clearInput = (event) => {
    dispatch(updateQuery(""))
    dispatch(queryUsers())
  }

  useEffect(() => {
    if (users.search_query) {
      dispatch(updateQuery(users.search_query))
    }
  }, [])

  return (
    <Stack maxWidth="md" height={'100vh'}>
      <Stack>
        <Header title="Search"/>
        <TextField id="searchbox" placeholder='Enter GitHub username, i.e. gaearon'
          autoComplete={'off'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {users.search_query 
                  ? <HighlightOffTwoToneIcon onClick={clearInput} sx={{cursor: 'pointer'}}/> 
                  : <></>
                }
              </InputAdornment>
            ) 
          }}
          onChange={handleSearch} value={users.search_query} type="text" autoFocus />
      </Stack>
      <Stack sx={{flex: 1}} justifyContent="center">
        {users.loading
        ?  <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></Box>
        : <>
            {users.search_query && users.items.length > 0 && <p>{users.userCount.toLocaleString()} GitHub users found</p> }
            {users.search_query
            ? <ResultList></ResultList>
            : <Stack sx={{color: "#8b8a8b"}} alignItems="center" justifyContent={"center"}>
              <GitHubIcon sx={{width: '120px', height: '120px', color: "#8b8a8b"}}/>
              <h1>GitHub</h1>
              <Box maxWidth={"sm"} sx={{width: '390px'}}>Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.</Box>
            </Stack>
        }
          </>}
      </Stack>
      <Footer/>
    </Stack>
  )
}
