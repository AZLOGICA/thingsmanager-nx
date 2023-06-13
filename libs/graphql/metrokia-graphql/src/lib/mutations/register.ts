export const registerMutation = /* GraphQL */ `
  mutation Register($email: String!, $password: String!, $name: String!, $isEnabled: Boolean!) {
    register(email: $email, password: $password, name: $name, isEnabled: $isEnabled  ) {
      id
      name
    }
  }
`;
