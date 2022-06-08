import setUpGraphql from "."
import qs from 'qs'
import { FETCH_FAVORITE, FETCH_USERS, FOLLOWERS_DETAILS, FOLLOWINGS_DETAILS, REPO_DETAILS, USER_DETAILS } from "./queries";

export const queryUsers = async (match, req) => {
    const { user } = req
    const params = qs.parse(req.query)
    const query = params.q
    let initialState = {
      users: {
        userCount: 0,
        items: [],
        search_query: query,
        pageNumber: 1
      }
    }
    if (!query) return initialState
    const graphql = setUpGraphql(user.accessToken)
    const response = await graphql.query({ query: FETCH_USERS, variables: { query }});
    const data = response.data.search
    initialState.users = { ...initialState.users, ...data }
    return initialState
}

export const queryLikedUsers = async (match, req) => {
    const { user } = req
    let initialState = { 
      favorite: {
        items: [],
        pageInfo: {},
        fromServer: true
      }
    }

    const graphql = setUpGraphql(user.accessToken)
    const response = await graphql.query({ query: FETCH_FAVORITE, variables: { login: user.profile.username} });
    const data = response.data.user.following
    initialState.favorite = { ...initialState.favorite, ...data }
    return initialState
}

export const queryExtraUserDetail = async (match, req) => {
    const { user } = req
    const { username, category } = match.params
    let initialState = {
      user: {
        userDetail: { followers: {}, following: {}, repositories: {}, fromServer: true},
        repositories: { items: [], loading: false, pageInfo: {}, fromServer: false},
        followers: { items: [], loading: false, pageInfo: {}, fromServer: false},
        following: { items: [], loading: false, pageInfo: {}, fromServer: false}
      }
    };
    const login = username

    let queryExtra = REPO_DETAILS
    switch (category) {
      case 'followers':
        queryExtra = FOLLOWERS_DETAILS
        break;
      case 'following':
        queryExtra = FOLLOWINGS_DETAILS
        break;
      default:
        break;
    }

    const graphql = setUpGraphql(user.accessToken)
    let userData, extraData;
    const responses = await Promise.all([
      graphql.query({ query: USER_DETAILS, variables: { login } }),
      graphql.query({ query: queryExtra, variables: { login } })
    ])
    userData = responses[0].data.user
    extraData = responses[1].data.user[category]
    return {
      user: {
        ...initialState.user,
        userDetail: {...initialState.user.userDetail, ...userData},
        [category]: { ...initialState.user[category], ...extraData, fromServer: true}
      }
    }
}