// Import the gql function from Apollo Client
import { gql } from '@apollo/client';


// Mutation for creating a user and returning essential fields
export const REGISTER_USER = gql`
  mutation RegisterUser($input: UserCreateInput) {
    userCreate(input: $input) {
      user {
        email
      }
      token
    }
  }
`;


// Mutation to add a book to the user's savedBooks collection
export const SAVE_BOOK = gql`
  mutation SaveBookToUser($input: SaveBookInput) {
    userSaveBook(input: $input) {
      savedBooks {
        bookId
        authors
        title
        link
        description
        image
      }
    }
  }
`;


// Mutation to remove a book from the user's savedBooks
export const REMOVE_BOOK = gql`
  mutation RemoveBookFromUser($bookId: String!) {
    userDeleteBook(bookId: $bookId) {
      savedBooks {
        title
      }
    }
  }
`;


// Mutation for user login, returning key fields
export const USER_LOGIN = gql`
  mutation LoginUser($input: LoginInput) {
    userLogin(input: $input) {
      user {
        email
        _id
        username
      }
      token
    }
  }
`;
