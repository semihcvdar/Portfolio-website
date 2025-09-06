import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useFormStatus } from 'react-dom';
import { useLanguage } from "@/context/language-context";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  const { language } = useLanguage();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`group flex items-center justify-center gap-2
        h-[3rem] w-[8rem] rounded-full text-white bg-gray-900 
        transition-all outline-none
        focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105
        disabled:scale-100 disabled:bg-opacity-60 disabled:cursor-not-allowed
        dark:bg-white/10 dark:hover:bg-white/20`}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <>
          {language === 'tr' ? 'Gönder' : 'Send'}
          <FaPaperPlane
            className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-2"
          />
        </>
      )}
    </button>
  );
}
