import React from 'react';
import './Home.css';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import ResultList from './components/ResultList';
import { useDispatch, useSelector } from 'react-redux';
import { queryUsers, updateQuery } from './reducers/userReducer';
import { debounce } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

const Container = styled.div `
  display: flex;
  flex-direction: column;
  margin: 0 5rem;
`
const SearchField = styled.div `
  display: flex;
  justify-content: center;
  > div {
    width: 100%;
    padding: 1rem;
    font-size: 1.6rem;
  }
  
`
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
    <Container>
      <Header title="Search"></Header>
      <SearchField>
        <TextField id="searchbox" placeholder='Enter GitHub username, i.e. gaearon'
          onChange={handleSearch} value={users.search_query} type="text" autoFocus />
      </SearchField>
      <img src="/imgs/githublogo.jpg"></img>
      <img src="/imgs/githubtext.jpg"></img>
      <p>Search Enter GitHub username, i.e. gaearon Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.  search favorite Search Favorite</p>
      <ResultList></ResultList>
      <Footer/>
    </Container>
  );
}
