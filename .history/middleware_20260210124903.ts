import { NextResponse, NextRequest } from "next/server";

export const config = {
    matcher: [
        /*
        *Match all paths except for:
        * 1. /api routes
        *  2. /_next (Next.js internals)
        * 3.
    ]
}