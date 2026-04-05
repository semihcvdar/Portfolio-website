import { NextResponse } from "next/server";
import { readPortfolioFile, writePortfolioFile } from "@/lib/portfolio-server";
import { parsePortfolioData } from "@/lib/portfolio-parse";
import type { PortfolioData } from "@/lib/portfolio-types";
import portfolioDefaults from "@/data/portfolio.json";

export const dynamic = "force-dynamic";

function getDefaults(): PortfolioData {
  const parsed = parsePortfolioData(portfolioDefaults);
  if (!parsed) {
    throw new Error("Bundled portfolio defaults are invalid");
  }
  return parsed;
}

export async function GET() {
  const fromDisk = await readPortfolioFile();
  const data = fromDisk ?? getDefaults();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < 8) {
    return NextResponse.json(
      { error: "Sunucuda ADMIN_SECRET tanımlı değil veya çok kısa (en az 8 karakter)." },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (!token || token !== secret) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const parsed = parsePortfolioData(body);
  if (!parsed) {
    return NextResponse.json({ error: "Geçersiz içerik şeması" }, { status: 400 });
  }

  try {
    await writePortfolioFile(parsed);
  } catch {
    return NextResponse.json(
      {
        error:
          "Dosyaya yazılamadı. Sunucusuz (Vercel/Cloudflare Pages) ortamda dosya sistemi kalıcı değildir; değişiklikleri yerelde kaydedip data/portfolio.json dosyasını repoya commit edin.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
