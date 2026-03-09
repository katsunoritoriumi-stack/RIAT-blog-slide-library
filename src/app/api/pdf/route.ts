import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new NextResponse("Missing file ID", { status: 400 });
    }

    // Google Drive の直接ダウンロードURL
    const driveUrl = `https://drive.google.com/uc?export=download&id=${id}`;

    try {
        const response = await fetch(driveUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });

        if (!response.ok) {
            return new NextResponse("Failed to fetch from Google Drive", {
                status: response.status,
            });
        }

        const contentType = response.headers.get("content-type") || "application/pdf";
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=3600",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        console.error("PDF proxy error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
