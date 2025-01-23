import { type NextRequest, NextResponse } from "next/server"

export const revalidate = 3600 // Revalidate every hour

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.toString()

  const url = `https://clinicaltrials.gov/api/v2/studies?${query}`

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching clinical trials:", error)
    return NextResponse.json({ error: "Failed to fetch clinical trials" }, { status: 500 })
  }
}

