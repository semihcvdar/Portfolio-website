"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.7);
  const { language } = useLanguage();
  const projects = projectsData[language];

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 min-h-[40vh] max-w-[53rem] mx-auto text-center">
      <SectionHeading>{translations[language].projectsTitle}</SectionHeading>
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
