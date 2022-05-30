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
query Favorite($login: String!) {
  user(login: $login) {
    following(first: ${ITEMS_PER_PAGE}) {
      users: nodes {
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
    }
  }
}`;

export const LOGIN_USER_INFO = gql`
query { 
  viewer { 
    login
  }
}
`