export const getAllLogs = /* GraphQL */`
    query GetAllLogs($limit: Int, $after: String) {
        getAllLogs(limit: $limit, after: $after) {
            totalCount
            logs {
                track_guid
                ts_appeared
                ts_best_view
                ts_disappeared
                fir
                fir_type
                face_confidence
                image
                persons {
                    guid
                    name
                    gender
                    created_ts
                    image_guid
                }
            }
            cursor
        }
    }

`