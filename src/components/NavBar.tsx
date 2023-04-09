export const NavBar = () => {
  return (
    <nav className=" w-full top-0 absolute mb-3 flex flex-wrap items-center justify-between bg-slate-900 px-2 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="relative flex w-full justify-between px-4  lg:static lg:block lg:w-auto lg:justify-start">
          <a
            className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-white"
            href="#pablo"
          >
            BookNook
          </a>
          <button
            className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none outline-none focus:outline-none lg:hidden"
            type="button"
          >
            <span className="relative block h-px w-6 rounded-sm bg-white"></span>
            <span className="relative mt-1 block h-px w-6 rounded-sm bg-white"></span>
            <span className="relative mt-1 block h-px w-6 rounded-sm bg-white"></span>
          </button>
        </div>
        <div
          className="flex-grow items-center lg:flex"
          id="example-navbar-warning"
        >
          <ul className="ml-auto flex list-none flex-col lg:flex-row">
            <li className="nav-item">
              <a
                className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                Discover
              </a>
            </li>
            <li className="nav-item">
              <a
                className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                Setting
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
