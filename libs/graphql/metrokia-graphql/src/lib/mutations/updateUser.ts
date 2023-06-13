export const updateUserMutation = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser( input: $input  ) {
      id
      name
    }
  }
`;
