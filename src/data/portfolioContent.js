export const defaultPortfolioContent = {
   profile: {
      greeting: "Hey, I'm",
      name: 'RAHIL',
      titleLine1: 'FRONTEND',
      titleLine2: 'DEVELOPER',
      intro:
         'Transforming ideas into stunning visuals. I blend creativity and strategy to design intuitive interfaces that captivate and engage.',
      imageUrl: '',
   },
   expertise: {
      heading: 'EXPERTISE',
      intro:
         'A strategic, creative process that ensures intuitive and impactful design. I focus on the details that matter.',
      items: [
         {
            title: 'Frontend Dev',
            level: 95,
            desc: 'React.js, React-Native, Electron.js, Zustand, Redux, Tailwind, Framer Motion',
            icon: 'layout',
         },
         {
            title: 'Backend API',
            level: 85,
            desc: 'Node.js, Express, PostgreSQL, MongoDB, SQLite',
            icon: 'database',
         },
         {
            title: 'UI Design',
            level: 90,
            desc: 'Figma, Prototyping',
            icon: 'code',
         },
         {
            title: 'CI/CD',
            level: 80,
            desc: 'Git, GitHub',
            icon: 'arrow',
         },
      ],
   },
   experience: {
      heading: 'EXPERIENCE',
      items: [],
   },
   projects: {
      heading: 'MY WORKS',
      items: [
         {
            title: 'GenFeed - Discover, Share, and Monetize AI Prompts',
            tech: 'Next.js • Node.js • Supabase • MongoDB • Tailwind',
            desc: 'The premier social marketplace for AI prompts. Find, share, and monetize prompt engineering creations for ChatGPT, Midjourney, Stable Diffusion, and more.',
            name: 'GenFeed',
            link: 'https://genfeed.in',
         },
         {
            title: 'ENVY - Inventory Management App',
            tech: 'React-Native • Node.js • MongoDB',
            desc: 'Envy is a mobile application that helps small businesses manage their inventory.',
            name: 'envy',
            link: 'https://github.com/rahilp010/envy',
         },
         {
            title: 'Electron - Inventory for desktop',
            tech: 'Electron.js • SQLite • MongoDB',
            desc: 'Electron is a Desktop offline application so your data is on your handle not on cloud.',
            name: 'electron',
            link: 'https://github.com/rahilp010/electron',
         },
         {
            title: 'Envy Sync',
            tech: 'React-Native • Node.js • SQLite',
            desc: 'Envy Sync is a mobile application so you can sync your data between Desktop App & Mobile.',
            name: 'envy-sync',
            link: 'https://github.com/rahilp010/Envy-Sync',
         },
         {
            title: 'Banky',
            tech: 'React Native • SQLite',
            desc: 'Banky is an app that helps you manage your expenses.',
            name: 'Banky',
            link: 'https://github.com/rahilp010/Banky',
         },
         {
            title: 'Klique',
            tech: 'React.Js • AI • Tailwind',
            desc: 'Klique provides all the tools you need on a daily basis, including AI tools.',
            name: 'Klique',
            link: 'https://klique.netlify.app',
         },
      ],
   },
   contact: {
      heading: 'CONTACT ME',
      line1: "LET'S",
      line2: 'WORK',
      line3: 'TOGETHER',
      location: 'Surat Gujarat, India',
      email: 'rahilp704@gmail.com',
      socialLinks: [
         { label: 'GitHub', url: 'https://github.com/rahilp010' },
         { label: 'LinkedIn', url: 'https://linkedin.com/in/rahilp010' },
         {
            label: 'Email',
            url: 'https://mail.google.com/mail/?view=cm&fs=1&to=rahilp704@gmail.com',
         },
      ],
   },
};

const isRecord = (value) =>
   value !== null && typeof value === 'object' && !Array.isArray(value);

const mergeSection = (defaults, value) =>
   isRecord(value) ? { ...defaults, ...value } : { ...defaults };

export const normalizePortfolioContent = (content) => {
   const source = isRecord(content) ? content : {};
   const expertise = mergeSection(defaultPortfolioContent.expertise, source.expertise);
   const experience = mergeSection(defaultPortfolioContent.experience, source.experience);
   const projects = mergeSection(defaultPortfolioContent.projects, source.projects);
   const contact = mergeSection(defaultPortfolioContent.contact, source.contact);

   return {
      profile: mergeSection(defaultPortfolioContent.profile, source.profile),
      expertise: {
         ...expertise,
         items: Array.isArray(expertise.items) ? expertise.items : [],
      },
      experience: {
         ...experience,
         items: Array.isArray(experience.items) ? experience.items : [],
      },
      projects: {
         ...projects,
         items: Array.isArray(projects.items) ? projects.items : [],
      },
      contact: {
         ...contact,
         socialLinks: Array.isArray(contact.socialLinks)
            ? contact.socialLinks
            : [],
      },
   };
};
