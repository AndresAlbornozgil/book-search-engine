// Import GraphQL tag function
import { gql } from '@apollo/client';

/** GraphQL query to fetch user data */
export const FETCH_USER = gql`
  query FetchUser {
    user {
      savedBooks {
        authors
        title
        bookId
      }
    }
  }
`;
