import {  Auth } from "aws-amplify";

export const getJwtToken = async () => {
    // Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
    const session = await Auth.currentSession();
    const expiration = await session.getIdToken().getExpiration();
  
    console.log("idToken", expiration)
    if(expiration * 1000 <= Date.now() ) {
        if(session.isValid()){
            const refreshToken = await session.getRefreshToken();
            const cognitoUser = await Auth.currentAuthenticatedUser();
            await cognitoUser.refreshSession(refreshToken, (err: any, session: any) => {
                if (err) {
                  //resolve(this.logout());
                }
                cognitoUser.setSignInUserSession(session);
                return session.getIdToken().getJwtToken()
              })
        }
    }
    return session.getIdToken().getJwtToken();
};