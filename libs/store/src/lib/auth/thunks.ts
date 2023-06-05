import { AppThunk } from '../store';
import { checkingCredentials, login, logout } from './authSlice';

import { API, Auth } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { loginMutation } from '@thingsmanager-nx/graphql/default-graphql';
import  jwt from "jsonwebtoken";
import { setCookie , deleteCookie} from 'cookies-next';

export const checkingAuthentication =
  (email = '', password = ''): AppThunk =>
  async (dispatch) => {
    return await dispatch(checkingCredentials());
  };

interface LoginProps {
  email: string;
  password: string;
}

export const startLoginWithEmailPassword =
  ({ email, password }: LoginProps): AppThunk =>
  async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      await Auth.signOut();
      const user = await Auth.signIn(email, password);
      const curSesh = await Auth.currentSession();
      const token = curSesh.getIdToken().getJwtToken();

      const _loginMutation: any = await API.graphql({
        query: loginMutation,
        variables: { email },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        authToken: token,
      });

      console.log('logion!!!!!!', _loginMutation);
      if (_loginMutation.data?.login) {
        console.log('login', _loginMutation);
        console.log("jwt", jwt)
        const token = jwt.sign(
          {
            uid: user.attributes.sub,
            email: _loginMutation.data?.login.id,
          },
          'secret'
        );
          console.log("otken", token)
        setCookie('token', token, {
          maxAge: 2147483647,
     //     path: "/",
        });
        console.log("setCookie")
        dispatch(
          login({
            token,
            uid: user.attributes.sub,
            email: _loginMutation.data?.login.id,
            displayName: _loginMutation.data?.login.name,
          })
        );
      }
    } catch (error) {
      console.log('error signing in', error);
      return dispatch(logout(error));
    }
  };

export const startLogout = (): AppThunk => async (dispatch) => {
  try {
    await Auth.signOut();
    await deleteCookie('token');
    
  } catch (error) {
    console.log('error signing out: ', error);
  }
  await dispatch(logout({}));
  window.location.reload();
  /*
    setTimeout(() => {
      window.location.reload();
    }, 300);
  */
};
