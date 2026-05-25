import fs from "node:fs";
import path from "node:path";

const isKvAvailable = !!process.env.KV_REST_API_URL;

function getFilePath(key: string): string {
  return path.join(process.cwd(), "src", "data", `${key}.json`);
}

export async function storageGet<T = unknown>(key: string): Promise<T | null> {
  if (isKvAvailable) {
    const { kv } = await import("@vercel/kv");
    const data = await kv.get<T>(key);
    return data ?? null;
  }

  const filePath = getFilePath(key);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export async function storageSet(key: string, value: unknown): Promise<void> {
  if (isKvAvailable) {
    const { kv } = await import("@vercel/kv");
    await kv.set(key, JSON.parse(JSON.stringify(value)));
    return;
  }

  const filePath = getFilePath(key);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf-8");
}
