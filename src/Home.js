import React from 'react';
import './Home.css';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import ResultList from './components/SearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { queryUsers, updateQuery } from './reducers/usersReducer';
import { debounce, IconButton, InputAdornment } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

const Container = styled.div `
  display: flex;
  height: 100vh;
  justify-content: space-between;
  flex-direction: column;
  .head {
    padding: 1rem 4rem;
  }
  .body {
    flex: 1
  }
`
const SearchField = styled.div `
  display: flex;
  justify-content: center;
  position: relative;
  > div {
    width: 100%;
    padding: 1rem 1rem 1rem 0;
    font-size: 1.6rem;
  }
  .clearIcon {
    width: 20px;
    height: 23px;
    position: absolute;
    top: 25px;
    right: 25px;
  }
`
const GitInfo = styled.div `
  flex-grow: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  img.logo {
    width: 10.2rem;
    height: 10.2rem;
  }
  img.logo-text {
    width: 13.9rem;
  }
  p {
    width: 28.5rem;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }
`
export default function Home() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    dispatch(updateQuery(searchValue))
    loadData(searchValue)
  }
  const loadData = debounce((searchValue) => {
    dispatch(queryUsers())
  })

  const clearInput = (event) => {
    dispatch(updateQuery(""))
    dispatch(queryUsers())
  }
  return (
    <Container>
      <div className="head">
        <Header title="Search"></Header>
        <SearchField>
          <TextField id="searchbox" placeholder='Enter GitHub username, i.e. gaearon'
            onChange={handleSearch} value={users.search_query} type="text" autoFocus />
          {users.search_query 
            ?  <svg className='clearIcon' onClick={clearInput}>
                  <use xlinkHref="/imgs/sprite.svg#clear-icon"/>
               </svg>
            : <></>
          }
        </SearchField>
      </div>
      <div className="body">
        <p>{users.userCount.toLocaleString()} GitHub users found</p>
        {users.search_query
          ? <ResultList></ResultList>
          : <GitInfo>
            <img className="logo" src="/imgs/githublogo.jpg"></img>
            <img className="logo-text" src="/imgs/githubtext.jpg"></img>
            <p>Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.</p>
          </GitInfo>
        }
      </div>
      <div className="tail">
        <Footer/>
      </div>
    </Container>
  );
}
