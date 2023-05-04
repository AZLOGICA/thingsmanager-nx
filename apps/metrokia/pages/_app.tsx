import { Navbar, Sidebar } from "@thingsmanager-nx/common-ui";
import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { sidebarItems } from "../utils/sidebarItems";
import { usePathname } from "next/navigation";
import { wrapper } from '@thingsmanager-nx/store' 
import { Amplify} from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: 'xxx',
    region: 'xxx',
    cookieStorage: {
      domain: 'xxx',
      path: 'xxx',
      secure: true
    }
  },
  aws_appsync_graphqlEndpoint: 'xxxx',
  aws_appsync_region: 'xxxx',
  aws_appsync_authenticationType: 'xxxx',
  aws_appsync_apiKey: 'xxxx'
});


function CustomApp({ Component, ...rest }: AppProps) {
  const pathname = usePathname()
  
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <>
      <Head>
        <title>Metrokia Things Manager</title>
      </Head>
      <>
        {pathname != '/login' && 
        <Navbar
          logoURL="https://thingsmanager.s3.amazonaws.com/metrokia/assets/navbarLogo.png"
        />
        }
        <div className="flex">
          {pathname != '/login' &&
            <Sidebar
              sidebarItems={sidebarItems}
            />
          }
          <div className={`${pathname != '/login' && 'p-4 md:p-10 '} w-full`}>
            <Component {...pageProps} />
          </div>

        </div>
      </>
    </>
  );
}

//export default CustomApp;

export default wrapper.withRedux(CustomApp);
