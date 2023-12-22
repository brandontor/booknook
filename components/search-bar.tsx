"use client"

import React, { useState } from "react"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Image from "next/image"
import Router, {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { CommandLoading } from "cmdk"
import { BookIcon, Loader2 } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { Button } from "./ui/button"

const commandActions: any = {
  title: {
    placeHolder: "Enter a title",
    heading: "Search by Title Results",
  },
  author: {
    placeHolder: "Enter an author",
    heading: "Search by Author Results",
  },
}

type Props = {}

function SearchBar({}: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [results, setResults] = useState<Object[] | []>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [commandInput, setCommandInput] = React.useState<string>("initial")
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (!open) {
      setCommandInput("initial")
      setResults([])
    }
  }, [open])

  const searchHandler = useDebouncedCallback(async (book: string) => {
    setLoading(true)
    const params = new URLSearchParams(searchParams)
    if (book) {
      params.set("q", book)
      const res = await fetch("/api/books?" + params, {
        method: "GET",
      })
      let data = await res.json()
      setResults(data.data.items)
    } else {
      params.delete("q")
    }
    replace(`${pathname}?${params.toString()}`)
    setLoading(false)
  }, 300)

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          disabled={commandInput === "initial"}
          placeholder={
            commandInput !== "initial"
              ? commandActions[commandInput].placeHolder
              : "Click a command"
          }
          onChangeCapture={(e) => searchHandler(e.currentTarget.value)}
        />
        <CommandList>
          <InitialSearch
            setCommandInput={setCommandInput}
            commandInput={commandInput}
          ></InitialSearch>
        </CommandList>
        <CommandSeparator></CommandSeparator>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commandInput !== "initial" && (
            <SearchResults
              loading={loading}
              results={results}
              actionDetails={commandActions[commandInput]}
              router={router}
              setOpen={setOpen}
            ></SearchResults>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchBar

type InitialSearchProps = {
  setCommandInput: React.Dispatch<React.SetStateAction<string>>
  commandInput: string
}

const InitialSearch = ({
  setCommandInput,
  commandInput,
}: InitialSearchProps) => {
  return (
    <div>
      <CommandGroup heading="Actions">
        <CommandItem
          onSelect={() => {
            setCommandInput("title")
          }}
        >
          Search by Title
        </CommandItem>
        <CommandItem
          onSelect={() => {
            setCommandInput("author")
          }}
        >
          Search by Author
        </CommandItem>
      </CommandGroup>
    </div>
  )
}

type SearchResultsProps = {
  results: Array<any>
  loading: boolean
  actionDetails: any
  router: AppRouterInstance
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchResults = ({
  results,
  loading,
  actionDetails,
  router,
  setOpen,
}: SearchResultsProps) => {
  const BookImage = (result: any) => {
    if (result.result.volumeInfo?.imageLinks) {
      return (
        <Image
          alt={result.result.volumeInfo.title}
          src={result.result.volumeInfo?.imageLinks?.thumbnail}
          width={100}
          height={100}
          className="w-auto h-auto"
        ></Image>
      )
    } else {
      return (
        <div className="w-16 h-12 ">
          <p>No cover available</p>
        </div>
      )
    }
  }

  const bookSelectionHandler = (result: any) => {
    router.push(`/book/${result.id}`)
    setOpen(false)
  }

  return (
    <div>
      <CommandGroup heading={actionDetails.heading}>
        {loading && (
          <div className="w-full flex justify-center">
            <CommandLoading>
              <Loader2 className="my-4 h-12 w-8 animate-spin"></Loader2>
            </CommandLoading>
          </div>
        )}
        {!loading &&
          results &&
          results.map((result) => {
            return (
              <CommandItem
                className="flex justify-between"
                key={result.id}
                value={
                  result.volumeInfo.title +
                  "-" +
                  result.volumeInfo.publishedDate
                }
                onSelect={() => {
                  bookSelectionHandler(result)
                }}
              >
                <BookImage result={result}></BookImage>
                {result.volumeInfo.title}
                <span cmdk-raycast-meta="">
                  {result.volumeInfo.publishedDate}
                </span>
              </CommandItem>
            )
          })}
      </CommandGroup>
    </div>
  )
}
