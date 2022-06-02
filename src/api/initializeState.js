import setUpGraphql from "."
import qs from 'qs'
import { FETCH_FAVORITE, FETCH_USERS, USER_DETAILS } from "./queries";
import { FOLLOWERS_DETAILS, FOLLOWINGS_DETAILS, REPO_DETAILS } from "../api/queries";


export const CATEGORY = {
    repositories: { query: REPO_DETAILS, stateName: "repositories" },
    following: { query: FOLLOWINGS_DETAILS, stateName: "following" },
    followers: { query: FOLLOWERS_DETAILS, stateName: "followers" }
}

export const queryUsers = async (match, req) => {
    const { user } = req
    const params = qs.parse(req.query)
    const query = params.q
    let initialState = {
      users: {
        userCount: 0,
        items: [],
        search_query: query
      }
    }
    if (!query) return initialState
    const graphql = setUpGraphql(user.accessToken)
    try {
      const response = await graphql.query({ query: FETCH_USERS, variables: { query }});
      const data = response.data.search
      initialState.users = { ...initialState.users, ...data }
    } catch(err) {
      console.log(err);
    }
    return initialState
}

export const queryLikedUsers = async (match, req) => {
    const { user } = req
    let initialState = { 
      favorite: {
        followingUsers: [],
        totalCount: 0,
        pageInfo: {},
        numberOfPages: 1
      }
    }

    const graphql = setUpGraphql(user.accessToken)
    try {
      const response = await graphql.query({ query: FETCH_FAVORITE, variables: { login: user.profile.username} });
      const data = response.data.user.following
      initialState.favorite = { ...initialState.favorite, ...data }
    } catch(err) {
      console.log(err);
    }
    return initialState
}

export const queryUserDetail = async (match, req) => {
    const { user } = req
    let initialState =  {
      user: {
        userDetail: {} 
      }
    }
    const login = match.params.username

    const graphql = setUpGraphql(user.accessToken)
    try {
      const response = await graphql.query({ query: USER_DETAILS, variables: { login } });
      const data = response.data.user
      initialState.user.userDetail = { ...initialState.userDetail, ...data }
    } catch(err) {
      console.log(err);
    }
    return initialState
}

export const queryExtraUserDetail = async (match, req) => {
    const { user } = req
    const { username, category } = match.params
    let initialState =  {
      user: {
        userDetail: {},
        [CATEGORY[category].stateName]: {}
      }
    }
    const login = username

    const graphql = setUpGraphql(user.accessToken)
    try {
      const responses = await Promise.all([
        graphql.query({ query: USER_DETAILS, variables: { login } }),
        graphql.query({ query: CATEGORY[category].query, variables: { login } })
      ])
      const userData = responses[0].data.user
      const extraData = responses[1].data.user[CATEGORY[category].stateName]
      initialState.user.userDetail = { ...initialState.userDetail, ...userData }
      initialState.user[CATEGORY[category].stateName] = { ...initialState[CATEGORY[category].stateName], ...extraData }
    } catch(err) {
      console.log(err);
    }
    return initialState
}