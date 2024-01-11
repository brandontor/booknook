import { UserButton } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/dist/types/server"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import SearchBar from "./search-bar"

type Props = {
  user: User | null
}

export function SiteHeader({ user }: Props) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {user && <MainNav items={siteConfig.mainNav} />}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {user && <SearchBar></SearchBar>}
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </nav>
        </div>
      </div>
    </header>
  )
}
