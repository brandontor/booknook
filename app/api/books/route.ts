import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams)

  const baseURL = "https://www.googleapis.com/books/v1/volumes"
  const searchURL = new URL(baseURL)
  searchURL.searchParams.append("key", `${process.env.GOOGLE_API_KEY}`)

  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.append("Content-Type", "application/json")

  Object.entries(searchParams).forEach((param) => {
    searchURL.searchParams.append(`${param[0]}`, `${param[1]}`)
  })

  const res = await fetch(searchURL, {
    headers: requestHeaders,
  })
  const data = await res.json()
  return Response.json({ data })
}
