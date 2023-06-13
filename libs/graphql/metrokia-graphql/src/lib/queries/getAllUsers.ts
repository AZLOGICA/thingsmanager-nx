export const getAllUsers = /* GraphQL */`
    query GetAllUsers($limit: Int, $after: String) {
        getAllUsers(limit: $limit, after: $after) {
            totalCount
            users {
                id
                name
            }
            cursor
        }
    }

`