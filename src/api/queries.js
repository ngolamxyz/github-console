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
