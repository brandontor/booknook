"use client"

import React, { useState } from "react"
import { PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreateBookshelfDialog from "@/components/dialogs/CreateBookshelfDialog"

type Props = {}

function MyBookShelves({}: Props) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Book Shelves</CardTitle>
        <CardDescription>View your bookshelf collection</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AddBookShelfButton></AddBookShelfButton>
        <BookShelfCard></BookShelfCard>
        <BookShelfCard></BookShelfCard>
      </CardContent>
      <CardFooter>
        <Button className="w-full">See More</Button>
      </CardFooter>
    </Card>
  )
}

export default MyBookShelves

const AddBookShelfButton = () => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-6  ">
      <Button
        variant="outline"
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        <PlusCircleIcon></PlusCircleIcon>
      </Button>
      <CreateBookshelfDialog
        open={openDialog}
        setOpen={setOpenDialog}
      ></CreateBookshelfDialog>
    </div>
  )
}

const BookShelfCard = () => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" />
    </div>
  )
}
