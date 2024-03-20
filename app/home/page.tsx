import Link from "next/link"
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import MyBookShelves from "./components/MyBookShelves"
import Trending from "./components/Trending"

function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}

export default function IndexPage() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
            <Container>
              <MyBookShelves></MyBookShelves>
            </Container>
          </div>
          <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
            <Container>
              <Trending></Trending>
            </Container>
          </div>
          <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
            <Container>
              <MyBookShelves></MyBookShelves>
            </Container>
          </div>
        </div>
      </section>
    </>
  )
}
