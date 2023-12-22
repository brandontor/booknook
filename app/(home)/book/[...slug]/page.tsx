import React from "react"

interface PageProps {
  params: {
    slug: string[]
  }
}

function page({ params }: PageProps) {
  return <div>My Post: {params.slug}</div>
}

export default page
