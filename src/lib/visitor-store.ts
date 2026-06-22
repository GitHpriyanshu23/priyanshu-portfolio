import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "visitors.json");

type VisitorData = {
  count: number;
};

async function readData(): Promise<VisitorData> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as VisitorData;
  } catch {
    return { count: 0 };
  }
}

async function writeData(data: VisitorData) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

export async function getVisitorCount() {
  const data = await readData();
  return data.count;
}

export async function incrementVisitorCount() {
  const data = await readData();
  data.count += 1;
  await writeData(data);
  return data.count;
}
