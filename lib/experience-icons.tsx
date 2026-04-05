import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import type { ExperienceIconKey } from "./portfolio-types";

const map: Record<ExperienceIconKey, React.ReactElement> = {
  CgWorkAlt: React.createElement(CgWorkAlt),
  FaReact: React.createElement(FaReact),
  LuGraduationCap: React.createElement(LuGraduationCap),
};

export function experienceIconElement(key: ExperienceIconKey): React.ReactElement {
  return map[key] ?? map.CgWorkAlt;
}
