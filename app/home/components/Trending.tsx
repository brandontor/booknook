import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

type Props = {}

function Trending({}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending</CardTitle>
        <CardDescription>View trending items</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Icons.gitHub></Icons.gitHub>
            <div>
              <p className="text-sm font-medium leading-none">Book 1</p>
              <p className="text-sm text-muted-foreground">Example text</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Icons.gitHub></Icons.gitHub>
            <div>
              <p className="text-sm font-medium leading-none">Book 1</p>
              <p className="text-sm text-muted-foreground">Example text</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Trending
