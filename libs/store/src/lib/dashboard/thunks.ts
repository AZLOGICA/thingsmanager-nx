import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AppThunk } from "../store";
import { API } from "aws-amplify";
import { getAllLogs, getDashboard } from "@thingsmanager-nx/graphql/metrokia-graphql";
import { loadingToday, loadingWeek, setToday } from './dashboardSlice';


export const startLoadingDashboard =
  (dateFilter: string): AppThunk => async (dispatch, getState) => {

    if(dateFilter == 'today'){
        dispatch(loadingToday())
    }
    else if(dateFilter == 'week'){
        dispatch(loadingWeek())
    }

    let variables : any = {
        dateFilter
    }

    console.log("variables", variables);

    const allItems: any = await API.graphql({
      query: getDashboard,
      variables
    });
    console.log("allProducts", allItems)


    if (allItems.data?.getDashboard) {

        if(dateFilter == 'today'){
            await dispatch(setToday(allItems.data?.getDashboard));
        }
    }
   
   

    return "items";
  
  };






