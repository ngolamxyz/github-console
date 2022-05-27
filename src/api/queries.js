import { gql } from "@apollo/client";

export const FETCH_USERS = gql`
query Users($query: String!) {
  search(type: USER, query: $query, first: 10) {
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
