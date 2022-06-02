import { ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import fetch from 'cross-fetch';

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ["id"]
    }
}
});

export default function setUpGraphql(token) {
    const authLink = setContext((_, { headers }) => {
    return {
        headers: {
        ...headers,
        authorization: token ? `Token ${token}` : null,
        },
    };
    });


    const graphql = new ApolloClient({
    link: authLink.concat(
        new HttpLink({ uri: "https://api.github.com/graphql", fetch })
    ),
    cache
    })
    return graphql;
}