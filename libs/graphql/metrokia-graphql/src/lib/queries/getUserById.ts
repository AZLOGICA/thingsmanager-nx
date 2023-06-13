export const getUserById = /* GraphQL */`
    query GetUserById($id: String!) {
        getUserById(id: $id) {
            id
            name
        }
    }

`