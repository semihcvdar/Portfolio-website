import React from "react";

type SectionHeadingProps ={
    children: React.ReactNode;};


export default function SectionHeading({
    children}:
    SectionHeadingProps
    ) {
  return (
    <h2 className="text-2xl font-medium captialize mb-8 text-center dark:text-white">{children}</h2>
  )
}
