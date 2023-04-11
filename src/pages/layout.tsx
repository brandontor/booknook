import { ReactNode } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { NavBar } from "~/components/NavBar";
import { Button } from "../components/ui/button";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { isSignedIn } = useUser();

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {!isSignedIn && (
          <Button variant="default">
            <SignInButton></SignInButton>
          </Button>
        )}

        {isSignedIn && <AppContainer children={children}></AppContainer>}
      </main>
    </>
  );
};

export default Layout;

const AppContainer = ({ children }: Props) => {
  return (
    <div className="  flex h-5/6  w-11/12 rounded-lg bg-slate-100 shadow-sm shadow-slate-100">
      <div className=" h-full relative w-1/6 rounded-lg border-r-2 border-slate-500 bg-slate-100">
        <NavBar></NavBar>
        <Button variant="default" className="m-2 absolute bottom-0">
            <SignOutButton/>
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
};
