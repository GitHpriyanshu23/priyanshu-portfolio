import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "visitors.json");
const REDIS_KEY = "portfolio-visitors";

type VisitorData = {
  count: number;
};

function hasRedisConfig() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

async function redisGet(): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;

  const res = await fetch(`${url}/get/${REDIS_KEY}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Redis GET failed (${res.status})`);
  }

  const data = (await res.json()) as { result: string | null };
  return data.result ? Number(data.result) : 0;
}

async function redisIncr(): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;

  const res = await fetch(`${url}/incr/${REDIS_KEY}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Redis INCR failed (${res.status})`);
  }

  const data = (await res.json()) as { result: number };
  return data.result;
}

async function readFileData(): Promise<VisitorData> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as VisitorData;
  } catch {
    return { count: 0 };
  }
}

async function writeFileData(data: VisitorData) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

export async function getVisitorCount() {
  if (hasRedisConfig()) {
    return redisGet();
  }

  const data = await readFileData();
  return data.count;
}

export async function incrementVisitorCount() {
  if (hasRedisConfig()) {
    return redisIncr();
  }

  const data = await readFileData();
  data.count += 1;
  await writeFileData(data);
  return data.count;
}
