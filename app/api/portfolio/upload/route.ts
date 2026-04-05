import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;

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

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Form verisi okunamadı" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Dosya en fazla 5 MB olabilir" }, { status: 400 });
  }

  const mime = file.type;
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(mime)) {
    return NextResponse.json(
      { error: "Yalnızca JPEG, PNG, WebP veya GIF yükleyebilirsiniz" },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const outPath = path.join(process.cwd(), "public", "profile-photo.jpg");

  try {
    await sharp(buf)
      .rotate()
      .resize(800, 800, { fit: "cover", position: "attention" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);
  } catch (e) {
    const code = e && typeof e === "object" && "code" in e ? (e as NodeJS.ErrnoException).code : "";
    if (code === "EROFS" || code === "EACCES" || code === "ENOSPC") {
      return NextResponse.json(
        {
          error:
            "Diske yazılamadı. Sunucusuz barındırmada yükleme genelde çalışmaz; görseli public/ klasörüne elle koyun veya URL kullanın.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Görsel işlenemedi; geçerli bir resim dosyası seçin" }, { status: 400 });
  }

  return NextResponse.json({ url: "/profile-photo.jpg" });
}
