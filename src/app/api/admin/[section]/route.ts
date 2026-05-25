import * as cookie from "cookie";
import { type NextRequest, NextResponse } from "next/server";
import { storageGet, storageSet } from "@/lib/storage";

const VALID_SECTIONS = [
  "person", "social", "home", "about", "skills", "projects",
  "gallery", "contact", "resume", "blog", "newsletter", "work",
] as const;

const KV_PREFIX = "portfolio:";

function isAuthenticated(request: NextRequest): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  return cookies.authToken === "authenticated";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section as typeof VALID_SECTIONS[number])) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  try {
    const data = await storageGet(`${KV_PREFIX}${section}`);
    if (data === null) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!VALID_SECTIONS.includes(section as typeof VALID_SECTIONS[number])) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  try {
    const body = await request.json();
    await storageSet(`${KV_PREFIX}${section}`, body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to write data" }, { status: 500 });
  }
}
