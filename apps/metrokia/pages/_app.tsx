import { Navbar, Sidebar } from "@thingsmanager-nx/common-ui";
import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { sidebarItems } from "../utils/sidebarItems";
import { usePathname } from "next/navigation";

function CustomApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname()
  return (
    <>
      <Head>
        <title>Welcome to metrokia!</title>
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

export default CustomApp;
