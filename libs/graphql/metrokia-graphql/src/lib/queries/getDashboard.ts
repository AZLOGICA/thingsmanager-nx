export const getDashboard = /* GraphQL */`
    query GetDashboard($dateFilter: String) {
        getDashboard(dateFilter: $dateFilter) {
            persons {
                guid
                name
            }
            logs{
                track_guid
                ts_appeared
                ts_disappeared
                persons {
                    guid
                    name
                }
            }
             
        }
    }

`