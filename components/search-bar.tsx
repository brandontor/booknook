"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import { Input } from "@/components/ui/input"

type Props = {}

function SearchBar({}: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const searchHandler = useDebouncedCallback(async (book: string) => {
    const params = new URLSearchParams(searchParams)
    if (book) {
      params.set("q", book)
      const res = await fetch("/api/books?" + params, {
        method: "GET",
      })

      console.log(await res.json())
    } else {
      params.delete("q")
    }
    console.log(book)
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div>
      <Input
        type="text"
        onChange={(e) => {
          searchHandler(e.target.value)
        }}
        defaultValue={searchParams.get("q")?.toString()}
      ></Input>
    </div>
  )
}

export default SearchBar
