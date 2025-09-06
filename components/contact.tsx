"use client";

import React, { useState } from 'react'
import SectionHeading from './section-heading';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import {sendEmail} from "@/actions/sendEmail";
import SubmitBtn from './submit-btn';
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Contact() {
    const { ref } = useSectionInView("Contact");
    const { language } = useLanguage();
    const t = translations[language];
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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

        <div className="mt-10">
            <AnimatePresence mode="wait">
                {!isFormSubmitted ? (
                    <motion.form 
                        key="contact-form"
                        className="flex flex-col gap-4"
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        action={async (formData: FormData) => {
                          const {error} = await sendEmail(formData);

                          if (error) {
                            setShowErrorMessage(true);
                            setTimeout(() => setShowErrorMessage(false), 5000);
                            return;
                          }

                          setIsFormSubmitted(true);
                          setShowSuccessMessage(true);
                          setTimeout(() => {
                            setShowSuccessMessage(false);
                            setIsFormSubmitted(false);
                          }, 5000);
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
                ) : (
                    <motion.div
                        key="success-animation"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center py-16"
                    >
                        {/* Success Icon Animation */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                delay: 0.2, 
                                type: "spring", 
                                stiffness: 200,
                                damping: 15
                            }}
                            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                        >
                            <motion.svg 
                                className="w-10 h-10 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </motion.svg>
                        </motion.div>

                        {/* Success Message */}
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2"
                        >
                            {language === 'tr' ? 'Mesaj Gönderildi!' : 'Message Sent!'}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-gray-600 dark:text-gray-300 text-center max-w-sm"
                        >
                            {language === 'tr' 
                                ? 'Mesajınızı başarıyla aldım. En kısa sürede size dönüş yapacağım!' 
                                : 'I successfully received your message and will get back to you as soon as possible!'
                            }
                        </motion.p>

                        {/* Floating particles animation */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-green-400 rounded-full"
                                    initial={{ 
                                        x: Math.random() * 300 - 150, 
                                        y: Math.random() * 200 - 100,
                                        opacity: 0 
                                    }}
                                    animate={{ 
                                        y: [null, -20, -40],
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0]
                                    }}
                                    transition={{ 
                                        delay: 1 + i * 0.1, 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Error Message - Only show for errors */}
        <AnimatePresence>
            {showErrorMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg"
                >
                    <div className="flex items-center justify-center gap-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-red-800 dark:text-red-200 font-medium"
                        >
                            {language === 'tr' ? 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred while sending the message. Please try again.'}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

    </motion.section>
  )
}
