import * as cookie from "cookie";
import fs from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { storageSet } from "@/lib/storage";

const VALID_SECTIONS = [
  "person", "social", "home", "about", "skills", "projects",
  "gallery", "contact", "resume", "blog", "newsletter", "work",
];

const KV_PREFIX = "portfolio:";

function isAuthenticated(request: NextRequest): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  return cookies.authToken === "authenticated";
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, string> = {};

  for (const section of VALID_SECTIONS) {
    const filePath = path.join(process.cwd(), "src", "data", `${section}.json`);
    if (!fs.existsSync(filePath)) {
      results[section] = "skipped (file not found)";
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(content);
      await storageSet(`${KV_PREFIX}${section}`, data);
      results[section] = "seeded";
    } catch (err) {
      results[section] = `error: ${err instanceof Error ? err.message : "unknown"}`;
    }
  }

  return NextResponse.json({ success: true, results });
}
