"use client";

import React from 'react'
import SectionHeading from './section-heading';
import { skillsData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100,
        scale: 0.8,
    },
     animate: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 0.05 * index,
            duration: 0.6,
            ease: "easeOut"
        },
}),

};

export default function Skills() {
    const { ref } = useSectionInView("Skills");
    const { language } = useLanguage();

  return (
    <section 
    ref={ref}
    id="skills"
     className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40">

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <SectionHeading>{translations[language].skillsTitle}</SectionHeading>
        </motion.div>
        
        <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800 dark:text-white/80">
            {
              skillsData.map((skill, index) => (
                <motion.li
                  className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80 dark:border-white/20 hover:scale-110 transition-transform cursor-pointer"
                  key={index}
                  variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{
                        once: true,
                    }}
                    custom={index}
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                    }}
                  
                  >
                    
                    
                    {skill}
                    
                    </motion.li>
              )) }

        </ul>

    </section>
  )
}
