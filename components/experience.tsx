"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

export default function Experience() {

    const { ref } = useSectionInView("Experience");
    const { language } = useLanguage();
    const t = translations[language];

    const fadeInAnimationVariants = {
        initial: {
            opacity: 0,
            x: -100,
        },
        animate: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1 * index,
                duration: 0.8,
                ease: "easeOut"
            },
        }),
    };

    const fadeInRightAnimationVariants = {
        initial: {
            opacity: 0,
            x: 100,
        },
        animate: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1 * index,
                duration: 0.8,
                ease: "easeOut"
            },
        }),
    };

  return (
    <section ref={ref} id="experience" className="relative scroll-mt-28 mb-28 sm:mb-40 ">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <SectionHeading>{t.experienceTitle}</SectionHeading>
        </motion.div>
        
        <VerticalTimeline animate={false} lineColor="" >
            {experiencesData[language].map((item, index) => (
                    <React.Fragment key={index}>
                    <motion.div
                        variants={index % 2 === 0 ? fadeInAnimationVariants : fadeInRightAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{
                            once: true,
                        }}
                        custom={index}
                    >
                        <VerticalTimelineElement
                        contentStyle={{
                            background: "#f3f4f6",
                            boxShadow: "none",
                            border: "1px solid rgba(0, 0, 0, 0.05)",
                            textAlign: "left",
                            padding: "1.3rem 2rem",
                        }}
                        contentArrowStyle={{
                            borderRight: "0.4rem solid #9ca3af",
                        }}
                        date={item.date}
                        icon={item.icon}
                        iconStyle={{
                            background: "white",
                            fontSize: "1.5rem",
                        }}
                        className="dark:contentStyle-dark"
                        position={index % 2 === 0 ? "left" : "right"}
                        >
                            <h3 className="font-semibold capitalize dark:text-white">{item.title}</h3>
                            <p className="font-normal !mt-0 dark:text-white/80">{item.location}</p>
                            <p className="!mt-1 !font-normal text-gray-700 dark:text-white/70">{item.description}</p>

                        </VerticalTimelineElement>
                    </motion.div>
                    </React.Fragment>
                ))
            }
        </VerticalTimeline>

    </section>
  );
}
