"use client"

import React, { useRef } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {}

function SearchBar({}: Props) {
  const searchParams = useSearchParams()
  const inputRef = useRef(null)
  const searchHandler = (book: string) => {
    const params = new URLSearchParams(searchParams)
    console.log(book)
  }

  return (
    <div>
      <Input
        type="text"
        ref={inputRef}
        onChange={(e) => {
          searchHandler(e.target.value)
        }}
      ></Input>
      {/* <Button
        type="submit"
        onClick={() => {
          searchHandler()
        }}
      >
        Click Me!
      </Button> */}
    </div>
  )
}

export default SearchBar
