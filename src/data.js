import tailwind from '../src/assets/tailwind.png';

const data = [
    {
        id: 1,
        name: "Electron",
        descriptionOneLiner: "Desktop Application",
        description: "Electron offers a comprehensive, all-in-one solution for inventory management, stock reporting, and banking alerts. It provides full functionality without compromising privacy, as no data is stored on the cloud.",
        languages: [{ 'language': 'react', 'progress': 70 }, { 'language': 'dribbble', 'progress': 60 }],
        link: "https://github.com/rahilp010/Banky-ExpensesTracker"
    },
    {
        id: 2,
        name: "Portfolio",
        descriptionOneLiner: "A portfolio website built with React and Tailwind CSS.",
        description: "A portfolio website built with React and Tailwind CSS.",
        languages: [{ 'language': 'react', 'progress': 90 }, { 'language': 'tailwind', 'progress': 90 }, { 'language': 'dribbble', 'progress': 60 }],
        link: "https://github.com/rahilp010/Portfolio",
    },
    {
        id: 5,
        name: 'Expense-Tracker',
        descriptionOneLiner: 'A expense tracker built with React and Tailwind CSS.',
        description: 'A expense tracker built with React and Tailwind CSS.',
        languages: [{ 'language': 'js', 'progress': 50 }, { 'language': 'react', 'progress': 70 }, { 'language': 'html5', 'progress': 80 }],
        link: 'https://github.com/rahilp010/Expense-Tracker',
    },
    {
        id: 6,
        name: 'PieStore',
        descriptionOneLiner: 'A pie store built with React and Tailwind CSS.',
        description: 'A pie store built with React and Tailwind CSS.',
        languages: [{ 'language': 'js', 'progress': 50 }, { 'language': 'react', 'progress': 70 }, { 'language': 'html5', 'progress': 80 }],
        link: 'https://github.com/rahilp010/PieStore',
    },
    {
        id: 3,
        name: 'Github-Finder',
        descriptionOneLiner: 'A github finder built with React and Tailwind CSS.',
        description: 'A github finder built with React and Tailwind CSS.',
        languages: [{ 'language': 'react', 'progress': 70 }, { 'language': 'css3-alt', 'progress': 60 }],
        link: 'https://github.com/rahilp010/Github-Finder',
    },
    {
        id: 4,
        name: 'Carbazaar',
        descriptionOneLiner: 'A car dealership website built with React and Tailwind CSS.',
        description: 'A car dealership website built with React and Tailwind CSS.',
        languages: [{ 'language': 'js', 'progress': 50 }, { 'language': 'html5', 'progress': 80 }, { 'language': 'css3-alt', 'progress': 70 }, { language: 'php', 'process': 30 }],
        link: 'https://github.com/rahilp010/Carbazaar',
    },

]

const skills = [
    { name: 'react', progress: 70 },
    { name: 'html5', progress: 50 },
    { name: 'css3-alt', progress: 85 },
    { name: 'js', progress: 80 },
    { name: 'figma', progress: 65 },
    { name: 'dribbble', progress: 55 },
    { name: 'git-alt', progress: 75 },
    { name: 'github', progress: 75 },
    // { name: 'jenkins', progress: 60 },
    { name: 'tailwind', progress: 80, image: tailwind },
    { name: 'php', progress: 70, },
    // { name: 'c++', progress: 50, image: cpp },
]

export { data, skills };