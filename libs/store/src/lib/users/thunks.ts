import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AppThunk } from "../store";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { GraphQLQuery } from '@aws-amplify/api';
import { APPSYNC_HEADERS } from '../../aws/appSyncHeader';
import { getJwtToken } from "../../utils/aws/getToken";
import { loadingUsers, setUsers, setUsersData, setUsersDataByPage } from './usersSlice';


export const startLoadingUsers =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(loadingUsers());
    const { cursor  } = getState().users;
    let variables : any = {
    //  limit: 1
    }
    console.log("cursor", cursor)
    if(cursor ){
      variables.after = cursor;
    }

    console.log("variables", variables);

    const allItems = await API.graphql<GraphQLQuery<GetAllOrdersQuery>>({
      query: queries.getAllOrders,
      variables
    },APPSYNC_HEADERS);
    console.log("allProducts", allItems)
   
    let items: any = [];
    let totalCount = null;
    let newCursor = null;
    let hasMore = null;

    if (allItems.data?.getAllOrders?.orders) {
      newCursor = allItems.data.getAllOrders.cursor;
      if(allItems.data?.getAllOrders?.totalCount != null) totalCount = allItems.data?.getAllOrders?.totalCount
      allItems.data.getAllOrders.orders.map((customer) => {
        items.push(customer)
      })
      if (allItems.data.getAllOrders.orders.length < 10) hasMore = false;
      else hasMore = true;
    }
   
    await dispatch(setUsers({users: items, totalCount, cursor: newCursor, hasMore}));

    return items;
  
  };

  export const startSetUsersData =
  (data: any): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(setUsersData(data));
  };

  export const startSetUsersDataByPage =
  (data: any, pageIndex: number): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(setUsersDataByPage({data, pageIndex}));
  };





