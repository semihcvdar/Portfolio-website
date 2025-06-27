"use client";

import React from 'react'
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import {sendEmail} from "@/actions/sendEmail";
import SubmitBtn from './submit-btn';
import toast from 'react-hot-toast';
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Contact() {
    const { ref } = useSectionInView("Contact");
    const { language } = useLanguage();
    const t = translations[language];

    const formVariants = {
        initial: { opacity: 0, y: 50 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const inputVariants = {
        initial: { opacity: 0, x: -20 },
        animate: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1 * index,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };
    
  return (
    <motion.section 
      id="contact" 
      ref={ref}
      className="mb-10 w-[min(100%,38rem)] text-center"

        initial={{
            opacity: 0, 
         }}
         whileInView={{
            opacity: 1,
        }}
         transition={{
            duration: 1,
        }}
        viewport={{ once: true }}
        >

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <SectionHeading>{t.contactTitle}</SectionHeading>
        </motion.div>
        
        <motion.p 
            className="text-gray-700 -mt-6 dark:text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {t.contactDescription}{" "}
           <a className="underline" href="mailto:semih.cvdar@gmail.com">
            semih.cvdar@gmail.com</a> {" "}
            {t.contactOr}
        </motion.p>

        <motion.form 
            className="mt-10 flex flex-col gap-4"
            variants={formVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            action={async (formData: FormData) => {
              const {data, error} = await sendEmail(formData);

              if (error) {
                toast.error(error);
                return;
              }

              toast.success("Email sent successfully!");
            }}
        >
            <motion.input 
                className="h-14 px-4 rounded-lg borderBlack dark:bg-white/10 dark:text-white dark:placeholder:text-white/60"
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder={t.emailPlaceholder}
                variants={inputVariants}
                custom={0}
            />
            <motion.textarea 
                className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white/10 dark:text-white dark:placeholder:text-white/60"
                name="message"
                placeholder={t.messagePlaceholder}
                required
                maxLength={5000}
                variants={inputVariants}
                custom={1}
            />

            <motion.div
                variants={inputVariants}
                custom={2}
            >
                <SubmitBtn />
            </motion.div>
        </motion.form>

    </motion.section>
  )
}
