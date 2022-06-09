import React, { useEffect } from 'react';
import './Home.css';
import TextField from '@mui/material/TextField';
import ResultList from './components/SearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { queryUsers, setPageNumber, updateQuery } from './reducers/usersReducer';
import { Box, CircularProgress, debounce, InputAdornment, Pagination, Stack } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ITEMS_PER_PAGE, MAX_PAGES } from './utils/contants';

export default function Home() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const numberOfPages = Math.min(Math.ceil(parseInt(users.userCount)/ITEMS_PER_PAGE), MAX_PAGES)
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

  const handlePaging = (event, pageNumber) => {
      dispatch(setPageNumber(pageNumber))
      dispatch(queryUsers(pageNumber))
  }

  useEffect(() => {
      dispatch(queryUsers())
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
      <Stack sx={{flex: 1, paddingBottom: "10px"}} justifyContent="center">
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
            </Stack>}
          </>}
      </Stack>
      { users.search_query
        &&<Box sx={{display: "flex", justifyContent: "center", paddingBottom: "10px"}}>
        <Pagination count={numberOfPages} variant="outlined" shape="rounded" onChange={handlePaging} page={users.pageNumber} color="primary"/>
      </Box> }
      <Footer/>
    </Stack>
  )
}
