import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AppThunk } from "../store";
import { API } from "aws-amplify";
import { getAllPersons, getUsers, listAllPersons } from "@thingsmanager-nx/graphql/metrokia-graphql";
import { loadingPersons, setPersons, setPersonsData, setPersonsDataByPage } from './personsSlice';


export const startLoadingPersons =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(loadingPersons());
    const { cursor  } = getState().persons;
    let variables : any = {
    //  limit: 1
    }
    console.log("cursor", cursor)
    if(cursor ){
      variables.after = cursor;
    }

    console.log("variables", variables);

    const allItems: any = await API.graphql({
      query: getAllPersons,
      variables
    });
    console.log("allProducts", allItems)
   
    let items: any = [];
    let totalCount = null;
    let newCursor = null;
    let hasMore = null;

    if (allItems.data?.getAllPersons?.persons) {
      newCursor = allItems.data.getAllPersons.cursor;
      if(allItems.data?.getAllPersons?.totalCount != null) totalCount = allItems.data?.getAllPersons?.totalCount
      allItems.data.getAllPersons.persons.map((item: any) => {
        items.push(item)
      })
      if (allItems.data.getAllPersons.persons.length < 50) hasMore = false;
      else hasMore = true;
    }
   
    await dispatch(setPersons({persons: items, totalCount, cursor: newCursor, hasMore}));

    return items;
  
  };

  export const startSetPersonsData =
  (data: any): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(setPersonsData(data));
  };

  export const startSetPersonsDataByPage =
  (data: any, pageIndex: number): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(setPersonsDataByPage({data, pageIndex}));
  };





