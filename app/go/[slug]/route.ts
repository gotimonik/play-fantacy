import { NextRequest, NextResponse } from "next/server";
import { getLinkBySlug } from "@/lib/data";

export function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const link = getLinkBySlug(params.slug);

  if (!link) {
    return NextResponse.redirect(new URL("/links", _request.url), 307);
  }

  return NextResponse.redirect(link.url, 307);
}
