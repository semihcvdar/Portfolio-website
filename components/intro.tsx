"use client";

import Image from "next/image";
import React from "react";
import {motion} from "framer-motion";

export default function intro() {
  return (
    <section>
        <div className='flex items-center justify-center'>
            <div className="relative">
                <motion.div
                initial={{opacity: 0, scale: 0}}
                animate={{opacity:1,  scale:1}}
                transition={{
                    type: "tween",
                    duration: 0.2,}}
                
                >

                    <Image src="https://images.unsplash.com/photo-1707123804818-ab608806ec6c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                 alt="Semih portrait"
                 width="192"
                 height="192"
                 quality="95"
                 priority={true}
                 className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl " 
                 />
                 </motion.div>

                 <motion.span className="absolute bottom-0 right-0  text-4xl"
                 initial={{opacity: 0, scale: 0}}
                 animate={{opacity: 1, scale: 1}}
                 transition={{
                    type: 'spring',
                    stiffness: 125,
                    delay: 0.1,
                    duration: 0.7,

                 }}
                  >👋</motion.span>
                 
                
                
                  

            </div>
        </div>

        <p>
        <span className="font-bold">Merhaba, Ben Semih.</span> Ben{" "}
        <span className="font-bold">yazılım alanında kendimi geliştiriyorum</span> Şu anda ek olarak{" "}
        <span className="font-bold">3D Baskı ve modelleme ile ilgileniyorum</span> 
        building <span className="italic">sites & apps</span>. My focus is{" "}
        <span className="underline">Full-Stack Developer</span>.
        </p>
    </section>
  )
}