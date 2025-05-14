import tailwind from '../src/assets/tailwind.png';

const data = [
    {
        id: 1,
        name: "Banky-ExpensesTracker",
        description: "A simple expenses tracker built with React and Tailwind CSS.",
        languages: ["js", "react", "html5","dribbble"],
        link: "https://github.com/rahilp010/Banky-ExpensesTracker"
    },
    {
        id: 2,
        name: "Portfolio",
        description: "A portfolio website built with React and Tailwind CSS.",
        languages: ["js", "react", "html5"],
        link: "https://github.com/rahilp010/Portfolio",
    },
    {
        id: 3,
        name: 'Github-Finder',
        description: 'A github finder built with React and Tailwind CSS.',
        languages: ['js', 'react', 'dribbble'],
        link: 'https://github.com/rahilp010/Github-Finder',
    },
    {
        id: 4,
        name: 'Carbazaar',
        description: 'A car dealership website built with React and Tailwind CSS.',
        languages: ['js', 'react', 'html5'],
        link: 'https://github.com/rahilp010/Carbazaar',
    },
    {
        id: 5,
        name: 'Expense-Tracker',
        description: 'A expense tracker built with React and Tailwind CSS.',
        languages: ['js', 'react', 'html5'],
        link: 'https://github.com/rahilp010/Expense-Tracker',
    },
    {
        id: 6,
        name: 'PieStore',
        description: 'A pie store built with React and Tailwind CSS.',
        languages: ['js', 'react', 'html5'],
        link: 'https://github.com/rahilp010/PieStore',
    },

]

const skills = [
    { name: 'html5', progress: 50 },
    { name: 'css3-alt', progress: 85 },
    { name: 'js', progress: 80 },
    { name: 'react', progress: 70 },
    { name: 'figma', progress: 65 },
    { name: 'dribbble', progress: 55 },
    { name: 'git-alt', progress: 75 },
    { name: 'github', progress: 75 },
    { name: 'jenkins', progress: 60 },
    { name: 'tailwind', progress: 80, image: tailwind },
    // { name: 'c++', progress: 50, image: cpp },
]

export { data, skills };