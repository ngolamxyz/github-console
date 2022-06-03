import { gql } from "@apollo/client";
import { ITEMS_PER_PAGE } from "../utils/contants";

export const FETCH_USERS = gql`
query Users($query: String!, $after: String) {
  search(type: USER, query: $query, first: ${ITEMS_PER_PAGE}, after: $after) {
    userCount
    items: nodes {
      ... on User {
        id
        login
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        viewerIsFollowing
      }
    }
  }
}`;


export const FOLLOW_A_USER = gql`
mutation FollowUser($userId: ID!) {
  result: followUser(input: {userId: $userId}) {
    user {
      id
      viewerIsFollowing
    }
  }
}`;


export const UNFOLLOW_A_USER = gql`
mutation UnFollowUser($userId: ID!) {
  result: unfollowUser(input: {userId: $userId}) {
    user {
     id
      viewerIsFollowing
    }
  }
}`;

export const FETCH_FAVORITE = gql`
query Favorite($login: String!, $after: String, $before: String) {
  user(login: $login) {
    id
    following(first: ${ITEMS_PER_PAGE}, after: $after, before: $before) {
      followingUsers: nodes {
        login
        id
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        viewerIsFollowing
      }
      totalCount
      pageInfo {
        hasNextPage
        startCursor
        hasPreviousPage
        endCursor
      }
    }
  }
}`;

export const USER_DETAILS = gql`
query UserDetail($login: String!){
  user(login: $login) {
    id
    login
    avatarUrl
    name
    location
  }
}
`

export const REPO_DETAILS = gql`
query RepoDetails($login: String!, $after: String, $before: String){
  user(login: $login) {
    id
    repositories(first: ${ITEMS_PER_PAGE}, after: $after, before: $before) {
      totalCount
      items: nodes {
        id
        name
        stargazerCount
        forkCount
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}
`
export const FOLLOWERS_DETAILS = gql`
query FollowersDetails($login: String!, $after: String, $before: String){
  user(login: $login) {
    id
    followers(first: ${ITEMS_PER_PAGE}, after: $after, before: $before) {
      totalCount
      items: nodes {
        id
        avatarUrl
        login
        followers {
          totalCount
        }
        following {
          totalCount
        }
        viewerIsFollowing
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}
`
export const FOLLOWINGS_DETAILS = gql`
query FollowingDetails($login: String!, $after: String, $before: String){
  user(login: $login) {
    id
    following(first: ${ITEMS_PER_PAGE}, after: $after, before: $before) {
      totalCount
      items: nodes {
        id
        avatarUrl
        login
        followers {
          totalCount
        }
        following {
          totalCount
        }
        viewerIsFollowing
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}
`

export const LOGIN_USER_INFO = gql`
query { 
  viewer { 
    login
  }
}
`