import React from "react"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  bookData: any
}

function BookDetails({ bookData }: Props) {
  const book = {
    title: bookData.volumeInfo.title || "N/A",
    description: bookData.volumeInfo.subtitle || "N/A",
    imageSrc: bookData.volumeInfo.imageLinks.large,
    imageAlt: "Alt Text",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.description}</CardDescription>
        <Image
          src={book.imageSrc}
          alt={book.imageAlt}
          width={200}
          height={200}
        ></Image>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex flex-col">
          <p>Authors</p>
          <ul className="flex"></ul>
        </div>
        <p>Page Count: {bookData.volumeInfo.pageCount}</p>
      </CardFooter>
    </Card>
  )
}

export default BookDetails
