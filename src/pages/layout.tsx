import { ReactNode } from "react";
import { NavBar } from "~/components/NavBar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="  flex h-5/6  w-11/12 rounded-lg bg-slate-100 shadow-sm shadow-slate-100">
          <div className=" h-full  w-1/6 rounded-lg border-r-2 border-slate-500 bg-slate-100">
            <NavBar></NavBar>
          </div>
          <div>
            Content
            {/* {children} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
