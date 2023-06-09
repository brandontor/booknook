import { Loader2 } from "lucide-react"
import { Button } from "./Button"

export function ButtonLoading() {
  return (
    <Button variant={"default"} disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}
