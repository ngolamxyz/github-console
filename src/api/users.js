import setUpGraphql from "."
import { FETCH_USERS } from "./queries";

export const fetchUsers = async (query, accessToken) => {
    const graphql = setUpGraphql(accessToken)
    let data = {
      total_count: 0,
      incomplete_results: false, 
      items: []
    }
    try {
      const response = await graphql.query({ query: FETCH_USERS, variables: { query }});
      return response.data.search
    } catch(err) {
      console.log(err);
    }
    return data;
}