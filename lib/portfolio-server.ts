import fs from "fs/promises";
import path from "path";
import type { PortfolioData } from "./portfolio-types";
import { parsePortfolioData } from "./portfolio-parse";

const DATA_DIR = path.join(process.cwd(), "data");
const PORTFOLIO_PATH = path.join(DATA_DIR, "portfolio.json");

export async function readPortfolioFile(): Promise<PortfolioData | null> {
  try {
    const text = await fs.readFile(PORTFOLIO_PATH, "utf8");
    const parsed = JSON.parse(text) as unknown;
    return parsePortfolioData(parsed);
  } catch {
    return null;
  }
}

export async function writePortfolioFile(data: PortfolioData): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const body = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(PORTFOLIO_PATH, body, "utf8");
}
