export const loginMutation = /* GraphQL */ `
  mutation Login($email: String!) {
    login(email: $email) {
      id
      name
      type
    }
  }
`;
