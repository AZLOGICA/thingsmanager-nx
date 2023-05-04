export const login = /* GraphQL */ `
  mutation Login($email: String!) {
    login(email: $email) {
      user {
        id
        name
        type
      }
    }
  }
`;