"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.7);
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  
  const projectList = projectsData[language] ?? projectsData["en"];

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 min-h-[40vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading>{t.projectsTitle}</SectionHeading>
      </motion.div>

      <motion.div
        className="flex flex-col gap-8"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {projectList.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Project {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
