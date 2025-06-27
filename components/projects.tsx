"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { projectsData } from "@/lib/data";


type ProjectProps = (typeof projectsData["en"])[number];

export default function Project({
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
      className="group relative rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden"
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
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
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
