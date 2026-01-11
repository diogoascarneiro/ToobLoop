import { NextResponse } from "next/server";

export const runtime = 'edge';

// This is a simplified YouTube search API
// In a production app, you would use the YouTube Data API with your API key
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  try {
    // For demo purposes, we'll use a public YouTube search results page
    // and extract video IDs from it
    // Note: This is not a reliable method for production use
    const response = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const html = await response.text();

    // Extract video IDs from the response
    const videoIdRegex = /"videoId":"([^"]+)"/g;
    const matches = [...html.matchAll(videoIdRegex)];

    if (matches.length === 0) {
      return NextResponse.json({ videos: [] });
    }

    // Get unique video IDs (first 10)
    const videoIds = [...new Set(matches.map((match) => match[1]))].slice(0, 10);

    return NextResponse.json({ videos: videoIds });
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return NextResponse.json({ error: "Failed to search YouTube" }, { status: 500 });
  }
}
