"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projectsData } from "@/lib/data";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";
import SectionHeading from "./section-heading";

type ProjectProps = {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: any; // Next.js image types are usually imported via StaticImageData, but `any` is acceptable here
  link: string;
};

function Project({
  title,
  description,
  tags,
  imageUrl,
  link,
}: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-white/5"
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Image
          src={imageUrl}
          alt={title}
          width={1000}
          height={560}
          quality={95}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </a>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">
          {description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const projects = projectsData[language];

  return (
    <section id="projects" className="scroll-mt-28 mb-28 max-w-[53rem] mx-auto text-center">
      <SectionHeading>{translations[language].projectsTitle}</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
