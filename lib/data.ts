import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import nextgif from "@/public/next.gif";
import tuchatpng from "@/public/tuchat.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = {
  en: [
    {
      title: "Technical Support Intern - IBTECH at QNB Finansbank",
      location: "Gebze, Kocaeli",
      description:
        "I provided technical support for end users and helped set up computers and peripherals for new employees. I gained experience in Active Directory and Cisco network infrastructure.",
      icon: React.createElement(CgWorkAlt),
      date: "May 2024 - Jul 2024",
    },
    {
      title: "Service Technician - LWS EMEA",
      location: "Çekmeköy, Istanbul",
      description:
        "I diagnosed and repaired device malfunctions, ensured proper operation of equipment. I took an active role in technical service processes and provided direct customer support by communicating with customers. I contributed to technical documentation and worked in a laboratory environment to maintain quality and efficiency throughout the process.",
      icon: React.createElement(CgWorkAlt),
      date: "Jan 2023 - Dec 2023",
    },
    {
      title: "Laboratory Intern - LWS EMEA",
      location: "Çekmeköy, Istanbul",
      description:
        "I assisted in laboratory documentation and technical reports. I gained experience in industry standards and equipment diagnostics.",
      icon: React.createElement(CgWorkAlt),
      date: "Jan 2022 - May 2023",
    },
  ],
  tr: [
    {
      title: "Teknik Destek Stajyeri - QNB Finansbank'ta IBTECH",
      location: "Gebze, Kocaeli",
      description:
        "Son kullanıcılar için teknik destek sağladım ve yeni çalışanlar için bilgisayar ve çevre birimlerinin kurulumuna yardım ettim. Active Directory ve Cisco ağ altyapısı konusunda deneyim kazandım",
      icon: React.createElement(CgWorkAlt),
      date: "May 2024 - Tem 2024",
    },
    {
      title: "Servis Teknisyeni - LWS EMEA",
      location: "Çekmeköy, İstanbul",
      description:
        "Cihaz arızalarını teşhis ettim ve onardım, ekipmanların düzgün çalışmasını sağladım. Teknik servis süreçlerinde aktif rol aldım ve müşterilerle doğrudan iletişim kurarak müşteri desteği sağladım. Teknik dokümantasyona katkıda bulundum ve süreç boyunca kalite ve verimliliği korumak için laboratuvar ortamında çalıştım.",
      icon: React.createElement(CgWorkAlt),
      date: "Haz 2023 - Ara 2023",
    },
    {
      title: "Laboratuvar Stajyeri - LWS EMEA",
      location: "Çekmeköy, İstanbul",
      description:
        "Laboratuvar ortamında dokümantasyon ve teknik raporlarda yardım ettim. Endüstri standartları ve ekipman teşhisleri konusunda deneyim kazandım.",
      icon: React.createElement(CgWorkAlt),
      date: "Haz 2022 - May 2023",
    },
  ],
} as const;

export const projectsData = {
  en: [
    {
      title: "TuChat / Real-Time Chat Application",
      description: `A real-time chat application developed with MERN stack.
Features include JWT-based user authentication, profile management, and image upload via Cloudinary.
The UI is fully responsive, designed with Tailwind CSS and DaisyUI, and real-time messaging is managed with Socket.io.`,
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Socket.io", "Cloudinary"],
      imageUrl: tuchatpng,
      link: "https://tuchat-fullstack-app.onrender.com/",
    },
    //{
    //  title: "Expense Tracker App",
    //  description:
    //    "This project will be here very soon. Stay tuned ",
    //  tags: [""],
    //  imageUrl: nextgif,
    //  link: "",
    //},
    //{
    //  title: "Resume Builder App",
    //  description:
    //    "This project will be here very soon. Stay tuned ",
    //  tags: [""],
    //  imageUrl: nextgif,
    //  link:"",
    // },
  ],
  tr: [
    {
      title: "TuChat / Gerçek Zamanlı Sohbet Uygulaması",
      description: `MERN stack ile geliştirilmiş gerçek zamanlı bir sohbet uygulaması.
Özellikler arasında JWT tabanlı kullanıcı kimlik doğrulama, profil yönetimi ve Cloudinary aracılığıyla resim yükleme bulunmaktadır.
UI tamamen responsive olup Tailwind CSS ve DaisyUI ile tasarlanmıştır ve gerçek zamanlı mesajlaşma Socket.io ile yönetilmektedir.`,
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Socket.io", "Cloudinary"],
      imageUrl: tuchatpng,
      link: "https://tuchat-fullstack-app.onrender.com/",
    },
    //{
    //  title: "Gider Takip Uygulaması",
    //  description:
    //    "Bu proje çok yakında burada olacak. Takip edin ",
    //  tags: [""],
    //  imageUrl: nextgif,
    //  link: "",
    //},
    //{
    //  title: "Özgeçmiş Oluşturucu Uygulaması",
    //  description:
    //    "Bu proje çok yakında burada olacak. Takip edin ",
    //  tags: [""],
    //  imageUrl: nextgif,
    //  link:"",
    // },
  ],
} as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "DaisyUI",
  "Node.js",
  "Express",
  "MongoDB",
  "Mongoose",
  "Cloudinary",
  "Socket.io",
  "JWT (Authentication)",
  "Git & GitHub",
  "RESTful APIs",
  "Zustand",
] as const;