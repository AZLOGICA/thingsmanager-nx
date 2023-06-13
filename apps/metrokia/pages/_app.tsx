import { Navbar, Sidebar } from '@thingsmanager-nx/common-ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { sidebarItems } from '../utils/sidebarItems';
import { usePathname } from 'next/navigation';
import { wrapper } from '@thingsmanager-nx/store';
import { Amplify } from 'aws-amplify';
import {ReactReduxContext} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

/*
Amplify.configure({
  aws_appsync_graphqlEndpoint:
    'https://6gwnn335jncvbj637rr62awy4e.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-btrqcqmag5ezxnt2ledaqec45q',
  //aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: "us-east-1:945eaeba-e835-4e85-b140-3340226b4c94",
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_JTBHczbjb',
  aws_user_pools_web_client_id: '3j34t8hqiqa645bvte0j1eb9bj',
});
*/

Amplify.configure({
  aws_appsync_graphqlEndpoint:
    'https://cssqpjv2kvgalk533ttbhufetm.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-zamk4i7p3fbf5m3b73erp6fzbq',
  //aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: "us-east-1:a3552f26-934c-40b4-a4b0-a25466a72fee",
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_XdtAyBs5j',
  aws_user_pools_web_client_id: '1ul4sm42rfasdg85elb8kguj8b',
});



function CustomApp({ Component, ...rest }: AppProps) {
  const pathname = usePathname();

  const {  props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <>
       <ReactReduxContext.Consumer>
          {({store}: any): any => (
            <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
                <Head>
                  <title>Metrokia Things Manager</title>
                </Head>
                <>
                  {pathname != '/auth/login' && (
                    <Navbar logoURL="https://thingsmanager.s3.amazonaws.com/metrokia/assets/navbarLogo.png" />
                  )}
                  <div className={`flex  ${pathname != '/auth/login' ? 'max-h-[95vh]  overflow-hidden' : ''}`}>
                    {pathname != '/auth/login' && <Sidebar sidebarItems={sidebarItems} />}
                    <div className={`${pathname != '/auth/login' && 'p-4 md:p-10 max-h-[95vh] overflow-y-scroll '} w-full`}>
                      <Component {...pageProps} />
                    </div>
                  </div>

                  <ToastContainer />
                  
                </>
            </PersistGate>
          )}
        </ReactReduxContext.Consumer>


    </>
  );
}

//export default CustomApp;

export default wrapper.withRedux(CustomApp);
