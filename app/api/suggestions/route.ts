import { type NextRequest, NextResponse } from "next/server"

export const revalidate = 3600 // Revalidate every hour

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const input = searchParams.get("input")
  const dictionary = searchParams.get("dictionary")

  if (!input || !dictionary) {
    return NextResponse.json({ error: "Missing input or dictionary parameter" }, { status: 400 })
  }

  const url = `https://clinicaltrials.gov/api/int/suggest?input=${encodeURIComponent(input)}&dictionary=${dictionary}`

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch suggestions: ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching suggestions:", error)
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 })
  }
}

