export const getAllPersons = /* GraphQL */`
    query GetAllPersons($limit: Int, $after: String) {
        getAllPersons(limit: $limit, after: $after) {
            totalCount
            persons {
                guid
                name
                gender
                created_ts
                image_guid
            }
            cursor
        }
    }

`