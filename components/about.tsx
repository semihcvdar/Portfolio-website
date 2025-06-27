"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function About() {
  const { ref } = useSectionInView("About");
  const { language } = useLanguage();
  const t = translations[language];

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-7 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading>{t.aboutTitle}</SectionHeading>
      </motion.div>

      <motion.p 
        className="mb-3"
        variants={textVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {t.aboutText1}
      </motion.p>

      <motion.p 
        className="mb-3"
        variants={textVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {t.aboutText2}
      </motion.p>

      <motion.p
        variants={textVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {t.aboutText3}
      </motion.p>
    </motion.section>
  );
}
