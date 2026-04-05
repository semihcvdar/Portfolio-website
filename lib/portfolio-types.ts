export type ExperienceIconKey = "CgWorkAlt" | "FaReact" | "LuGraduationCap";

export type ExperienceItemJson = {
  title: string;
  location: string;
  description: string;
  date: string;
  iconKey: ExperienceIconKey;
};

export type ProjectItemJson = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
};

export type PortfolioCopy = {
  introTitle?: string;
  introDescription?: string;
  aboutText1?: string;
  aboutText2?: string;
  aboutText3?: string;
  footerText?: string;
};

export type PortfolioData = {
  /** Yerel yol (/foto.jpg) veya tam https URL */
  profileImageUrl?: string;
  experiences: {
    en: ExperienceItemJson[];
    tr: ExperienceItemJson[];
  };
  projects: {
    en: ProjectItemJson[];
    tr: ProjectItemJson[];
  };
  skills: string[];
  copy?: {
    en?: PortfolioCopy;
    tr?: PortfolioCopy;
  };
};
