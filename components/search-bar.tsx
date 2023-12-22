"use client"

import React, { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
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

type Props = {}

function SearchBar({}: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [results, setResults] = useState<Object[] | []>([])
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

  const commandActions: any = {
    title: {
      placeHolder: "Enter a title",
      component: <TitleSearch results={results}></TitleSearch>,
      heading: "Title Search Results",
    },
    author: {
      placeHolder: "Enter an author",
      component: <AuthorSearch results={results}></AuthorSearch>,
      heading: "Author Search Results",
    },
  }

  const searchHandler = useDebouncedCallback(async (book: string) => {
    const params = new URLSearchParams(searchParams)
    if (book) {
      params.set("q", book)
      const res = await fetch("/api/books?" + params, {
        method: "GET",
      })
      let data = await res.json()
      setResults(data.data.items)
      // console.log(data.data.items)
    } else {
      params.delete("q")
    }
    // console.log(book)
    replace(`${pathname}?${params.toString()}`)
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
          {commandInput !== "initial" && commandActions[commandInput].component}
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

type SearchProps = {
  results: Array<any>
}

const TitleSearch = ({ results }: SearchProps) => {
  return (
    <div>
      <CommandGroup heading="Title Search Results">
        {results &&
          results.map((result) => {
            console.log(result)
            return (
              <CommandItem
                className="flex justify-between"
                key={result.id}
                value={
                  result.volumeInfo.title +
                  "-" +
                  result.volumeInfo.publishedDate
                }
              >
                <img src={result.volumeInfo.imageLinks.thumbnail}></img>
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

const AuthorSearch = ({ results }: SearchProps) => {
  return (
    <div>
      <CommandGroup heading="Author Search Results">
        {results &&
          results.map((result) => {
            console.log(result)
            return (
              <CommandItem
                className="flex justify-between"
                key={result.id}
                value={
                  result.volumeInfo.title +
                  "-" +
                  result.volumeInfo.publishedDate
                }
              >
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
