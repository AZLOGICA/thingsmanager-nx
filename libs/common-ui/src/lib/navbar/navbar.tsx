import Link from "next/link";

/* eslint-disable-next-line */
export interface NavbarProps {
  logoURL: string;
}

export function Navbar({logoURL}: NavbarProps) {
  return (
<header aria-label="Site Header" className="bg-navbarPrimary text-navbarTextColor shadow-md">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-12 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12">
        <Link className="block text-teal-600" href="/landing">
          <img src={logoURL} className=" h-8"/>
        </Link>
      </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Site Nav" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">

            {/*<li>
              <a
                className="text-navbarTextColor transition hover:text-navbarTextColor/75"
                href="/"
              >
                Blog
              </a>
  </li> */}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            {/*<a
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
              href="/"
            >
              Login
            </a>

            <div className="hidden sm:flex">
              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                href="/"
              >
                Register
              </a>
            </div>
  */}
          </div>

          <div className="block md:hidden">
            <button
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
  );
}

export default Navbar;
