import type {
  ExperienceIconKey,
  ExperienceItemJson,
  PortfolioCopy,
  PortfolioData,
  ProjectItemJson,
} from "./portfolio-types";

const ICON_KEYS: ExperienceIconKey[] = ["CgWorkAlt", "FaReact", "LuGraduationCap"];

function isExperienceIconKey(v: unknown): v is ExperienceIconKey {
  return typeof v === "string" && ICON_KEYS.includes(v as ExperienceIconKey);
}

function isExperienceItem(v: unknown): v is ExperienceItemJson {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    typeof o.location === "string" &&
    typeof o.description === "string" &&
    typeof o.date === "string" &&
    isExperienceIconKey(o.iconKey)
  );
}

function isProjectItem(v: unknown): v is ProjectItemJson {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    typeof o.description === "string" &&
    Array.isArray(o.tags) &&
    o.tags.every((t) => typeof t === "string") &&
    typeof o.imageUrl === "string" &&
    typeof o.link === "string"
  );
}

const COPY_KEYS = [
  "introTitle",
  "introDescription",
  "aboutText1",
  "aboutText2",
  "aboutText3",
  "footerText",
] as const;

function isPortfolioCopy(v: unknown): v is PortfolioCopy {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  for (const key of COPY_KEYS) {
    const val = o[key];
    if (val !== undefined && typeof val !== "string") return false;
  }
  for (const k of Object.keys(o)) {
    if (!COPY_KEYS.includes(k as (typeof COPY_KEYS)[number])) return false;
  }
  return true;
}

export function parsePortfolioData(raw: unknown): PortfolioData | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const ex = o.experiences as Record<string, unknown> | undefined;
  const pr = o.projects as Record<string, unknown> | undefined;
  if (!ex || !pr) return null;

  const enEx = ex.en;
  const trEx = ex.tr;
  const enPr = pr.en;
  const trPr = pr.tr;
  if (!Array.isArray(enEx) || !Array.isArray(trEx)) return null;
  if (!Array.isArray(enPr) || !Array.isArray(trPr)) return null;
  if (!enEx.every(isExperienceItem) || !trEx.every(isExperienceItem)) return null;
  if (!enPr.every(isProjectItem) || !trPr.every(isProjectItem)) return null;

  const skills = o.skills;
  if (!Array.isArray(skills) || !skills.every((s) => typeof s === "string")) return null;

  if (o.profileImageUrl !== undefined && typeof o.profileImageUrl !== "string") return null;

  let copy: PortfolioData["copy"] = undefined;
  if (o.copy !== undefined) {
    if (typeof o.copy !== "object" || o.copy === null) return null;
    const c = o.copy as Record<string, unknown>;
    copy = {};
    if (c.en !== undefined) {
      if (!isPortfolioCopy(c.en)) return null;
      copy.en = c.en;
    }
    if (c.tr !== undefined) {
      if (!isPortfolioCopy(c.tr)) return null;
      copy.tr = c.tr;
    }
  }

  return {
    ...(typeof o.profileImageUrl === "string" ? { profileImageUrl: o.profileImageUrl } : {}),
    experiences: { en: enEx, tr: trEx },
    projects: { en: enPr, tr: trPr },
    skills,
    copy: copy && (copy.en || copy.tr) ? copy : undefined,
  };
}
