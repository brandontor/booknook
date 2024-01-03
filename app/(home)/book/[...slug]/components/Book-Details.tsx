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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{bookData.volumeInfo.title}</CardTitle>
        <CardDescription>{bookData.volumeInfo.subtitle}</CardDescription>
        <Image
          src={bookData.volumeInfo.imageLinks.large}
          alt="image link"
          width={200}
          height={200}
        ></Image>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex flex-col">
          <p>Authors</p>
          <ul className="flex">
            {bookData.volumeInfo.authors.map((author: any, index: any) => {
              return <li key={index}>{author}</li>
            })}
          </ul>
        </div>
        <p>Page Count: {bookData.volumeInfo.pageCount}</p>
      </CardFooter>
    </Card>
  )
}

export default BookDetails
