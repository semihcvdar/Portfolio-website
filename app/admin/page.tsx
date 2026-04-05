"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { ExperienceIconKey, PortfolioCopy, PortfolioData } from "@/lib/portfolio-types";
import { parsePortfolioData } from "@/lib/portfolio-parse";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/lib/default-profile-image";

type Tab = "profil" | "metin" | "projeler" | "deneyim" | "yetenekler";

const ICON_OPTIONS: ExperienceIconKey[] = ["CgWorkAlt", "FaReact", "LuGraduationCap"];

const emptyProject = (): PortfolioData["projects"]["en"][number] => ({
  title: "",
  description: "",
  tags: [],
  imageUrl: "/tuchat.png",
  link: "",
});

const emptyExperience = (): PortfolioData["experiences"]["en"][number] => ({
  title: "",
  location: "",
  description: "",
  date: "",
  iconKey: "CgWorkAlt",
});

function trimCopy(block?: PortfolioCopy): PortfolioCopy | undefined {
  if (!block) return undefined;
  const keys = [
    "introTitle",
    "introDescription",
    "aboutText1",
    "aboutText2",
    "aboutText3",
    "footerText",
  ] as const;
  const out: PortfolioCopy = {};
  for (const k of keys) {
    const v = block[k];
    if (typeof v === "string" && v.trim()) out[k] = v.trim();
  }
  return Object.keys(out).length ? out : undefined;
}

function normalizeForSave(d: PortfolioData): PortfolioData {
  const en = trimCopy(d.copy?.en);
  const tr = trimCopy(d.copy?.tr);
  const profileImageUrl = d.profileImageUrl?.trim();
  return {
    experiences: d.experiences,
    projects: d.projects,
    skills: d.skills.map((s) => s.trim()).filter(Boolean),
    copy: en || tr ? { ...(en ? { en } : {}), ...(tr ? { tr } : {}) } : undefined,
    ...(profileImageUrl ? { profileImageUrl } : {}),
  };
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("metin");
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [draft, setDraft] = useState<PortfolioData | null>(null);
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [uploadHint, setUploadHint] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      const json: unknown = await res.json();
      const parsed = parsePortfolioData(json);
      if (!parsed) throw new Error("Veri okunamadı");
      setDraft(parsed);
      setStatus("idle");
    } catch {
      setStatus("err");
      setMessage("İçerik yüklenemedi.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!draft) return;
    if (!secret.trim()) {
      setMessage("Önce yönetici şifresini girin (.env.local içindeki ADMIN_SECRET).");
      setStatus("err");
      return;
    }
    setStatus("saving");
    setMessage("");
    const body = normalizeForSave(draft);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret.trim()}`,
        },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("err");
        setMessage(typeof json.error === "string" ? json.error : "Kayıt başarısız.");
        return;
      }
      setStatus("ok");
      setMessage("Kaydedildi. Ana sayfayı yenileyerek kontrol edin.");
      await load();
    } catch {
      setStatus("err");
      setMessage("Ağ hatası.");
    }
  }

  if (!draft && status === "loading") {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-16 text-center text-gray-600 dark:text-gray-400">
        Yükleniyor…
      </main>
    );
  }

  if (!draft) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-16 text-center">
        <p className="text-red-600 dark:text-red-400">{message || "Veri yok."}</p>
        <button
          type="button"
          onClick={load}
          className="mt-4 rounded-full bg-gray-900 px-6 py-2 text-white dark:bg-gray-100 dark:text-gray-900"
        >
          Tekrar dene
        </button>
      </main>
    );
  }

  const setCopyField = (locale: "en" | "tr", key: keyof PortfolioCopy, value: string) => {
    setDraft((d) => {
      if (!d) return d;
      return {
        ...d,
        copy: {
          ...d.copy,
          [locale]: { ...d.copy?.[locale], [key]: value },
        },
      };
    });
  };

  const projects = draft.projects[lang];
  const experiences = draft.experiences[lang];

  const tabBtn = (id: Tab, label: string) => (
    <button
      type="button"
      key={id}
      onClick={() => setTab(id)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        tab === id
          ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
          : "bg-white text-gray-700 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">İçerik yönetimi</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Projeler, iş deneyimi, yetenekler ve metinler <code className="text-xs">data/portfolio.json</code>{" "}
              dosyasına kaydedilir.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 underline dark:text-gray-300"
          >
            ← Siteye dön
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabBtn("profil", "Profil fotoğrafı")}
          {tabBtn("metin", "Metinler (TR/EN)")}
          {tabBtn("projeler", "Projeler")}
          {tabBtn("deneyim", "İş deneyimi")}
          {tabBtn("yetenekler", "Yetenekler")}
        </div>

        {(lang === "en" || lang === "tr") &&
          tab !== "yetenekler" &&
          tab !== "metin" &&
          tab !== "profil" && (
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-lg px-3 py-1.5 text-sm ${lang === "en" ? "bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900" : "bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700"}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("tr")}
              className={`rounded-lg px-3 py-1.5 text-sm ${lang === "tr" ? "bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900" : "bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700"}`}
            >
              Türkçe
            </button>
          </div>
        )}

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          {tab === "profil" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profil fotoğrafı</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Ana sayfadaki yuvarlak görsel. Yerel dosya için{" "}
                  <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">/dosya-adı.jpg</code>{" "}
                  (dosyayı <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">public</code>{" "}
                  klasörüne koyun) veya tam bir https adresi kullanın. Aşağıdan yükleyince{" "}
                  <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">/profile-photo.jpg</code>{" "}
                  olarak kaydedilir — kaydet butonuyla JSON’a da yazmayı unutmayın.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={draft.profileImageUrl?.trim() || DEFAULT_PROFILE_IMAGE_URL}
                  alt="Önizleme"
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full border-4 border-gray-200 object-cover dark:border-gray-600"
                />
                <div className="flex-1 space-y-3 w-full min-w-0">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Görsel adresi</span>
                    <input
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                      placeholder={DEFAULT_PROFILE_IMAGE_URL.slice(0, 48) + "…"}
                      value={draft.profileImageUrl ?? ""}
                      onChange={(e) =>
                        setDraft((d) => (d ? { ...d, profileImageUrl: e.target.value } : d))
                      }
                    />
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-gray-100 dark:text-gray-900">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="sr-only"
                        disabled={uploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          e.target.value = "";
                          if (!file) return;
                          if (!secret.trim()) {
                            setUploadHint("Önce sayfanın altındaki yönetici şifresini girin.");
                            return;
                          }
                          setUploading(true);
                          setUploadHint(null);
                          try {
                            const fd = new FormData();
                            fd.set("file", file);
                            const res = await fetch("/api/portfolio/upload", {
                              method: "POST",
                              headers: { Authorization: `Bearer ${secret.trim()}` },
                              body: fd,
                            });
                            const json = await res.json().catch(() => ({}));
                            if (!res.ok || typeof json.url !== "string") {
                              setUploadHint(
                                typeof json.error === "string" ? json.error : "Yükleme başarısız."
                              );
                              return;
                            }
                            setDraft((d) => (d ? { ...d, profileImageUrl: json.url as string } : d));
                            setUploadHint("Yüklendi. Değişikliği kalıcı yapmak için Kaydet’e basın.");
                          } catch {
                            setUploadHint("Ağ hatası.");
                          } finally {
                            setUploading(false);
                          }
                        }}
                      />
                      {uploading ? "Yükleniyor…" : "Dosya seç ve yükle"}
                    </label>
                    <button
                      type="button"
                      className="text-sm text-gray-600 underline dark:text-gray-400"
                      onClick={() =>
                        setDraft((d) => (d ? { ...d, profileImageUrl: "" } : d))
                      }
                    >
                      Varsayılana sıfırla (boş)
                    </button>
                  </div>
                  {uploadHint && (
                    <p className="text-sm text-amber-800 dark:text-amber-200">{uploadHint}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "metin" && (
            <div className="space-y-8">
              {(["en", "tr"] as const).map((locale) => (
                <div key={locale}>
                  <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {locale === "en" ? "İngilizce metinler" : "Türkçe metinler"}
                  </h2>
                  <p className="mb-3 text-xs text-gray-500 dark:text-gray-500">
                    Boş bıraktığınız alanlar varsayılan çeviri dosyasındaki metinlerle gösterilir.
                  </p>
                  <div className="space-y-3">
                    {(
                      [
                        ["introTitle", "Karşılama başlığı"],
                        ["introDescription", "Karşılama açıklaması (**kalın** için)"],
                        ["aboutText1", "Hakkımda — paragraf 1"],
                        ["aboutText2", "Hakkımda — paragraf 2"],
                        ["aboutText3", "Hakkımda — paragraf 3"],
                        ["footerText", "Alt bilgi (telif)"],
                      ] as const
                    ).map(([key, label]) => (
                      <label key={key} className="block">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                        {key === "introDescription" || key.startsWith("about") ? (
                          <textarea
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                            rows={key === "introDescription" ? 5 : 4}
                            value={draft.copy?.[locale]?.[key] ?? ""}
                            onChange={(e) => setCopyField(locale, key, e.target.value)}
                          />
                        ) : (
                          <input
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                            value={draft.copy?.[locale]?.[key] ?? ""}
                            onChange={(e) => setCopyField(locale, key, e.target.value)}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "projeler" && (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() =>
                  setDraft((d) =>
                    d
                      ? {
                          ...d,
                          projects: {
                            ...d.projects,
                            [lang]: [...d.projects[lang], emptyProject()],
                          },
                        }
                      : d
                  )
                }
                className="rounded-full bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900"
              >
                + Proje ekle ({lang.toUpperCase()})
              </button>
              {projects.map((p, i) => (
                <div
                  key={`${lang}-${i}`}
                  className="space-y-2 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-red-600 dark:text-red-400"
                      onClick={() =>
                        setDraft((d) =>
                          d
                            ? {
                                ...d,
                                projects: {
                                  ...d.projects,
                                  [lang]: d.projects[lang].filter((_, j) => j !== i),
                                },
                              }
                            : d
                        )
                      }
                    >
                      Sil
                    </button>
                  </div>
                  <input
                    placeholder="Başlık"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={p.title}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.projects[lang]];
                        list[i] = { ...list[i], title: v };
                        return { ...d, projects: { ...d.projects, [lang]: list } };
                      });
                    }}
                  />
                  <textarea
                    placeholder="Açıklama"
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={p.description}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.projects[lang]];
                        list[i] = { ...list[i], description: v };
                        return { ...d, projects: { ...d.projects, [lang]: list } };
                      });
                    }}
                  />
                  <input
                    placeholder="Etiketler (virgülle)"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={p.tags.join(", ")}
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.projects[lang]];
                        list[i] = { ...list[i], tags };
                        return { ...d, projects: { ...d.projects, [lang]: list } };
                      });
                    }}
                  />
                  <input
                    placeholder="Görsel: /dosya.png veya https://..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={p.imageUrl}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.projects[lang]];
                        list[i] = { ...list[i], imageUrl: v };
                        return { ...d, projects: { ...d.projects, [lang]: list } };
                      });
                    }}
                  />
                  <input
                    placeholder="Proje linki"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={p.link}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.projects[lang]];
                        list[i] = { ...list[i], link: v };
                        return { ...d, projects: { ...d.projects, [lang]: list } };
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "deneyim" && (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() =>
                  setDraft((d) =>
                    d
                      ? {
                          ...d,
                          experiences: {
                            ...d.experiences,
                            [lang]: [...d.experiences[lang], emptyExperience()],
                          },
                        }
                      : d
                  )
                }
                className="rounded-full bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900"
              >
                + Deneyim ekle ({lang.toUpperCase()})
              </button>
              {experiences.map((ex, i) => (
                <div
                  key={`${lang}-ex-${i}`}
                  className="space-y-2 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-red-600 dark:text-red-400"
                      onClick={() =>
                        setDraft((d) =>
                          d
                            ? {
                                ...d,
                                experiences: {
                                  ...d.experiences,
                                  [lang]: d.experiences[lang].filter((_, j) => j !== i),
                                },
                              }
                            : d
                        )
                      }
                    >
                      Sil
                    </button>
                  </div>
                  <input
                    placeholder="Pozisyon / başlık"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={ex.title}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.experiences[lang]];
                        list[i] = { ...list[i], title: v };
                        return { ...d, experiences: { ...d.experiences, [lang]: list } };
                      });
                    }}
                  />
                  <input
                    placeholder="Konum"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={ex.location}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.experiences[lang]];
                        list[i] = { ...list[i], location: v };
                        return { ...d, experiences: { ...d.experiences, [lang]: list } };
                      });
                    }}
                  />
                  <input
                    placeholder="Tarih aralığı"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={ex.date}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.experiences[lang]];
                        list[i] = { ...list[i], date: v };
                        return { ...d, experiences: { ...d.experiences, [lang]: list } };
                      });
                    }}
                  />
                  <textarea
                    placeholder="Açıklama"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                    value={ex.description}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((d) => {
                        if (!d) return d;
                        const list = [...d.experiences[lang]];
                        list[i] = { ...list[i], description: v };
                        return { ...d, experiences: { ...d.experiences, [lang]: list } };
                      });
                    }}
                  />
                  <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Zaman çizelgesi ikonu</span>
                    <select
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                      value={ex.iconKey}
                      onChange={(e) => {
                        const iconKey = e.target.value as ExperienceIconKey;
                        setDraft((d) => {
                          if (!d) return d;
                          const list = [...d.experiences[lang]];
                          list[i] = { ...list[i], iconKey };
                          return { ...d, experiences: { ...d.experiences, [lang]: list } };
                        });
                      }}
                    >
                      {ICON_OPTIONS.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          )}

          {tab === "yetenekler" && (
            <div>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Her satıra bir yetenek yazın.
              </p>
              <textarea
                rows={16}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                value={draft.skills.join("\n")}
                onChange={(e) =>
                  setDraft((d) =>
                    d
                      ? {
                          ...d,
                          skills: e.target.value.split("\n").map((s) => s.trim()),
                        }
                      : d
                  )
                }
              />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <label className="block">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Yönetici şifresi (ADMIN_SECRET)
            </span>
            <input
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-white"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Kaydetmek için gerekli"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={status === "saving"}
              onClick={save}
              className="rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-emerald-600"
            >
              {status === "saving" ? "Kaydediliyor…" : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={load}
              className="rounded-full bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            >
              Sunucudan yenile
            </button>
          </div>
          {message && (
            <p
              className={`text-sm ${status === "err" ? "text-red-600 dark:text-red-400" : "text-emerald-700 dark:text-emerald-400"}`}
            >
              {message}
            </p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-500">
            .env.local dosyasına <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">ADMIN_SECRET=güçlü_bir_şifre</code>{" "}
            ekleyin (en az 8 karakter). Vercel / Cloudflare Pages gibi ortamlarda API diske kalıcı yazamayabilir; o durumda
            yerelde kaydedip <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">data/portfolio.json</code> dosyasını
            repoya commit edin.
          </p>
        </div>
      </div>
    </main>
  );
}
