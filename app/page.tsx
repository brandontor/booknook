"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const router = useRouter()
  if (isSignedIn) {
    router.push("/home")
  }
  return (
    <main>
      <div>
        SIGN IN BOYS
        <div>
          <SignInButton afterSignInUrl="/home" />
          <SignUpButton afterSignUpUrl="/home" />
        </div>
      </div>
    </main>
  )
}
