"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: string;
  link: string;
};

const imgClassName =
  "absolute top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:rotate-2 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 group-even:-right-[initial] group-even:-left-40 z-0 object-cover h-auto max-h-[20rem] sm:max-h-none";

export default function Project({ title, description, tags, imageUrl, link }: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const isRemote = /^https?:\/\//i.test(imageUrl);
  const hasLink = link.trim().length > 0;

  const inner = (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <section
        className="group bg-gray-100 max-w-[50rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:min-h-[22rem] mb-3 sm:mb-8 last:mb-0 even:pl-8 hover:bg-gray-200 transition dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20"
      >
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[65%] flex flex-col h-full group-even:ml-[18rem] relative z-10 text-left">
          <h3 className="text-2xl font-semibold dark:text-white text-left">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 whitespace-pre-line dark:text-white/80 text-left">{description}</p>
          <ul className="flex flex-wrap mt-6 gap-2 sm:mt-5">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:bg-white/[0.7] dark:text-black"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className={imgClassName} />
        ) : (
          <Image src={imageUrl} alt={title} quality={95} width={452} height={300} className={imgClassName} />
        )}
      </section>
    </motion.div>
  );

  if (hasLink) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <div className="block cursor-default">{inner}</div>;
}
