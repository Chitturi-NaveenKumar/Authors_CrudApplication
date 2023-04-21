import { gql } from "@urql/vue";

//Delete author by Id
export const deleteAuthor = gql`
  mutation del($id: Int!) {
    deleteAuthor(input: { id: $id }) {
      author {
        username
      }
    }
  }
`;

//Get list of authors
export const getAuthors = gql`
  query MyQuery {
    authors {
      id
      username
      firstname
      lastname
      bio
    }
  }
`;

//Update author information
export const updateAuthorById = gql`
  mutation updateAuthor(
    $id: Int!
    $username: String!
    $firstname: String!
    $lastname: String!
    $bio: String!
  ) {
    updateAuthor(
      input: {
        patch: {
          username: $username
          firstname: $firstname
          lastname: $lastname
          bio: $bio
        }
        id: $id
      }
    ) {
      author {
        username
        bio
      }
    }
  }
`;

//create author

export const createAuthor = gql`
  mutation createAuthor(
    $username: String!
    $firstname: String!
    $lastname: String!
    $bio: String!
  ) {
    createAuthor(
      input: {
        author: {
          username: $username
          firstname: $firstname
          lastname: $lastname
          bio: $bio
        }
      }
    ) {
      author {
        username
      }
    }
  }
`;
