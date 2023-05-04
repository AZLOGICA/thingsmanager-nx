import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AppThunk } from "../store";
import { API } from "aws-amplify";
import { getUsers } from "@thingsmanager-nx/graphql/metrokia-graphql";
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

    const allItems: any = await API.graphql({
      query: getUsers,
      variables
    });
    console.log("allProducts", allItems)
   
    let items: any = [];
    let totalCount = null;
    let newCursor = null;
    let hasMore = null;

    if (allItems.data?.getUsers?.users) {
      newCursor = allItems.data.getUsers.cursor;
      if(allItems.data?.getUsers?.totalCount != null) totalCount = allItems.data?.getUsers?.totalCount
      allItems.data.getUsers.users.map((item: any) => {
        items.push(item)
      })
      if (allItems.data.getUsers.users.length < 10) hasMore = false;
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





