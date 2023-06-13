import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AppThunk } from '../store';
import { API } from 'aws-amplify';
import {
  getAllUsers,
  registerMutation,
  updateUserMutation,
} from '@thingsmanager-nx/graphql/metrokia-graphql';
import {
  loadingUser,
  loadingUsers,
  setNewUser,
  setUsers,
  setUsersData,
  setUsersDataByPage,
  updateUser,
} from './usersSlice';
import { getJwtToken } from '@thingsmanager-nx/utils';
import { getUserById } from '../../../../graphql/metrokia-graphql/src/lib/queries';

export const startLoadingUsers = (): AppThunk => async (dispatch, getState) => {
  dispatch(loadingUsers());
  const { cursor } = getState().users;
  let variables: any = {
    //  limit: 1
  };
  console.log('cursor', cursor);
  if (cursor) {
    variables.after = cursor;
  }

  console.log('variables', variables);

  const allItems: any = await API.graphql({
    query: getAllUsers,
    variables,
  });
  console.log('allProducts', allItems);

  let items: any = [];
  let totalCount = null;
  let newCursor = null;
  let hasMore = null;

  if (allItems.data?.getAllUsers?.users) {
    newCursor = allItems.data.getAllUsers.cursor;
    if (allItems.data?.getAllUsers?.totalCount != null)
      totalCount = allItems.data?.getAllUsers?.totalCount;
    allItems.data.getAllUsers.users.map((item: any) => {
      items.push(item);
    });
    if (allItems.data.getAllUsers.users.length < 50) hasMore = false;
    else hasMore = true;
  }

  await dispatch(
    setUsers({ users: items, totalCount, cursor: newCursor, hasMore })
  );

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
    await dispatch(setUsersDataByPage({ data, pageIndex }));
  };

export const startGetUser =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(loadingUser());
    let item = null;
    const token = await getJwtToken();
    const getItem: any = await API.graphql({
      query: getUserById,
      variables: {
        id,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      authToken: token!,
    });
    if (getItem.data?.getUserById) {
      item = getItem.data.getUserById;
    }
    await dispatch(setNewUser({}));
    return item;
  };

export const startAddUser =
  (data: any): AppThunk =>
  async (dispatch, getState) => {
    const token = await getJwtToken();
    dispatch(loadingUser());
    try {
      const newItem = await API.graphql({
        query: registerMutation,
        variables: { ...data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        authToken: token!,
      });
      console.log('newDiscount', newItem);
      await dispatch(setNewUser({}));
      await dispatch(updateUser({}));
    } catch (error) {
      await dispatch(setNewUser({}));
      await dispatch(updateUser({}));
      throw new Error('Error');
    }

    /*
    if (newItem.data?.createDiscount) {
      await dispatch(setNewUser(newItem.data?.createDiscount));
    }
    */
  };

export const startEditUser =
  (data: any): AppThunk =>
  async (dispatch, getState) => {
    const token = await getJwtToken();
    dispatch(loadingUser());
    try {
      const newItem = await API.graphql({
        query: updateUserMutation,
        variables: { input: {
          id: data.email,
          name: data.name,
          isEnabled: data.isEnabled,
        } 
       },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        authToken: token!,
      });
      console.log('newDiscount', newItem);
      await dispatch(setNewUser({}));
      await dispatch(updateUser({}));
    } catch (error) {
      await dispatch(setNewUser({}));
      await dispatch(updateUser({}));
      throw new Error('Error');
    }
  };
