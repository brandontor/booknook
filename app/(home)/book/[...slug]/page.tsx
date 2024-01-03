import React, { useEffect, useState } from "react"
import { Book } from "lucide-react"

import { cn } from "@/lib/utils"

import BookDetails from "./components/Book-Details"

//Need to add error handling for API Call
//Need to check if we can get types for the google books api

interface PageProps {
  params: {
    slug: string[]
  }
}

async function page({ params }: PageProps) {
  const bookID = params.slug
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookID}`
  )
  const bookData = await request.json()
  console.log(bookData)

  function CardsContainer({
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
  return (
    <div className="container py-4 mt-4 relative border overflow-hidden rounded-[0.5rem] shadow-md ">
      <div className="flex justify-around">
        <div className="flex flex-col justify-between">
          <CardsContainer>
            <BookDetails bookData={bookData}></BookDetails>
          </CardsContainer>
        </div>
      </div>
    </div>
  )
}

export default page
