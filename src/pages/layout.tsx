import { type ReactNode } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { NavBar } from "~/components/NavBar";
import { Button } from "../components/ui/Button";
import { ButtonLoading } from "~/components/ui/ButtonLoading";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useRouter } from "next/router";
import type { UserResource } from "@clerk/types";

interface Props {
  children: ReactNode;
  user?: UserResource;
}

const Layout = (props: Props) => {
  const { isSignedIn, isLoaded, user } = useUser();

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {!isSignedIn &&
          (!isLoaded ? (
            <ButtonLoading></ButtonLoading>
          ) : (
            <Button variant="default">
              <SignInButton></SignInButton>
            </Button>
          ))}

        {isSignedIn && (
          <AppContainer user={user}>{props.children}</AppContainer>
        )}
      </main>
    </>
  );
};

export default Layout;

const AppContainer = ({ children, user }: Props) => {
  if (!user) return <div>Something went Wrong</div>;
  const {isReady} = useRouter()

  return (
    <div className="  flex h-5/6  w-11/12 rounded-lg bg-slate-100 shadow-sm shadow-slate-100">
      <div className=" relative h-full w-1/6 rounded-bl-lg rounded-tl-lg border-r-2 border-slate-500 bg-slate-100">
        <div className="ml-2 mt-4">
          <Avatar>
            <AvatarImage src={`${user.profileImageUrl}`} />
            <AvatarFallback>
              {user.fullName
                ? `${user.fullName}'s Profile Picture`
                : "Profile Picture"}
            </AvatarFallback>
          </Avatar>
        </div>
        <NavBar></NavBar>
        <Button variant="default" className="absolute bottom-0 m-2">
          <SignOutButton />
        </Button>
      </div>
      {/* {!isReady ? <ButtonLoading></ButtonLoading> : children} */}
      {children}
    </div>
  );
};
