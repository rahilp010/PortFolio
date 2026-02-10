import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
   ArrowUpRight,
   Mail,
   Github,
   Linkedin,
   Code2,
   Database,
   Layout,
} from 'lucide-react';
import { Link } from 'react-router';
import mine from '../assets/mine.jpg';

// --- Components ---

const Section = forwardRef(({ children, className = '' }, ref) => (
   <section
      ref={ref}
      className={`px-6 py-20 md:px-20 md:py-32 max-w-[1600px] mx-auto ${className}`}>
      {children}
   </section>
));

const AnimatedText = ({ text, className = '' }) => {
   return (
      <motion.h2
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: 'easeOut' }}
         viewport={{ once: true }}
         className={`font-serif text-stone-900 ${className}`}>
         {text}
      </motion.h2>
   );
};

// --- Main App ---

export default function Portfolio() {
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
   });

   const contactRef = useRef(null);
   const workRef = useRef(null);

   const handleScrollContact = () => {
      contactRef.current?.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
      });
   };

   const handleScrollWork = () => {
      workRef.current?.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
      });
   };

   return (
      <div className="bg-[#EBE9E4] max-h-screen overflow-y-auto text-stone-800 font-sans selection:bg-stone-300">
         {/* Top Progress Bar */}
         <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-stone-900 origin-left z-50"
            style={{ scaleX }}
         />

         {/* Navigation */}
         <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference text-stone-100">
            <div className="text-xl font-bold tracking-tighter font-serif ">
               PORTFOLIO
            </div>
            <button
               className="px-6 py-2 rounded-full border border-stone-200 hover:bg-stone-800 hover:text-[#EBE9E4] transition-all duration-300 text-sm uppercase tracking-widest"
               onClick={handleScrollContact}>
               Let's Talk
            </button>
         </nav>

         {/* 1. MY DETAILS (Hero Section) */}
         <Section className="min-h-screen flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 space-y-8 z-20">
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-light tracking-wide">
                  Hey, I'm{' '}
                  <span className="font-semibold font-serif leading-[1.2]">
                     <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="block">
                        RAHIL
                     </motion.span>
                  </span>
               </motion.p>

               <div className="space-y-2">
                  <h1 className="text-4xl md:text-7xl lg:text-[88px] font-serif leading-[0.9]">
                     <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="block">
                        FRONTEND
                     </motion.span>
                     <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="block italic">
                        DEVELOPER
                     </motion.span>
                  </h1>
               </div>

               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-md text-stone-600 leading-relaxed">
                  Transforming ideas into stunning visuals. I blend creativity
                  and strategy to design intuitive interfaces that captivate and
                  engage.
               </motion.p>

               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex gap-4">
                  <button
                     className="bg-stone-900 text-[#EBE9E4] px-8 py-4 rounded-full flex items-center gap-2 hover:gap-4 transition-all"
                     onClick={handleScrollWork}>
                     View Work <ArrowUpRight size={18} />
                  </button>
               </motion.div>
            </div>

            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.2, ease: 'circOut' }}
               className="md:w-1/2 mt-12 md:mt-0 relative">
               <div className="relative overflow-hidden rounded-[3rem] md:rounded-t-[10rem] md:rounded-b-[3rem] h-[500px] w-full md:h-[700px] bg-stone-300  z-10">
                  <img
                     // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
                     src={mine}
                     alt="Portrait"
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
               </div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-stone-400 rounded-full z-0 animate-spin-slow" />
            </motion.div>
         </Section>

         {/* 2. MY SKILLS (Grid Layout like reference) */}
         <Section className="bg-stone-200 rounded-t-[4rem]">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <AnimatedText text="EXPERTISE" className="text-5xl mb-6" />
                  <p className="text-stone-600 mb-8">
                     A strategic, creative process that ensures intuitive and
                     impactful design. I focus on the details that matter.
                  </p>
               </div>

               <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {skills.map((skill, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#EBE9E4] p-8 rounded-2xl hover:shadow-xl transition-shadow border border-stone-300">
                        <div className="flex justify-between items-start mb-4">
                           <span className="p-3 bg-stone-900 text-white rounded-full">
                              {skill.icon}
                           </span>
                           <span className="text-4xl font-serif font-bold opacity-20">
                              {skill.level}%
                           </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">
                           {skill.title}
                        </h3>
                        <p className="text-sm text-stone-600">{skill.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </Section>

         {/* 3. MY PROJECTS (Wire Timeline) */}
         <Section ref={workRef}>
            <AnimatedText
               text="MY WORKS"
               className="text-5xl md:text-7xl mb-20 text-center"
            />

            <div className="relative">
               {/* The Central Wire */}
               <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-400 transform -translate-x-1/2 hidden md:block" />
               <div className="absolute left-4 top-0 bottom-0 w-px bg-stone-400 md:hidden" />

               <div className="space-y-20 md:space-y-32">
                  {projects.map((project, index) => (
                     <ProjectCard key={index} project={project} index={index} />
                  ))}
               </div>
            </div>
         </Section>

         {/* 4. CONTACT ME */}
         <Section
            className="bg-stone-400 text-[#EBE9E4] rounded-t-[3rem] pb-2"
            ref={contactRef}>
            <AnimatedText
               text="CONTACT ME"
               className="text-4xl md:text-7xl mb-20 text-center"
            />
            <div className="grid md:grid-cols-2 gap-12" id="contact">
               <div>
                  <AnimatedText
                     text="LET'S"
                     className="text-4xl md:text-7xl text-[#EBE9E4] mb-4"
                  />
                  <AnimatedText
                     text="WORK"
                     className="text-4xl md:text-7xl text-[#EBE9E4] mb-4"
                  />
                  <AnimatedText
                     text="TOGETHER"
                     className="text-4xl md:text-7xl text-[#EBE9E4] italic"
                  />

                  <div className="mt-12 space-y-6 text-black">
                     <p className="text-xl">surat, gujarat, india</p>
                     <p className="text-xl">rahilp704@gmail.com</p>
                     <div className="flex gap-4 mt-8">
                        <SocialLink
                           icon={<Github />}
                           link="https://github.com/rahilp010"
                        />
                        <SocialLink icon={<Linkedin />} />
                        <SocialLink icon={<Mail />} />
                     </div>
                  </div>
               </div>

               <form className="space-y-8 mt-12 md:mt-0">
                  <div className="border-b border-stone-700 pb-4">
                     <label className="block text-sm uppercase tracking-widest text-stone-500 mb-2">
                        Your Name
                     </label>
                     <input
                        type="text"
                        className="w-full bg-transparent text-2xl outline-none placeholder-stone-600"
                        placeholder="John Doe"
                     />
                  </div>
                  <div className="border-b border-stone-700 pb-4">
                     <label className="block text-sm uppercase tracking-widest text-stone-500 mb-2">
                        Your Email
                     </label>
                     <input
                        type="email"
                        className="w-full bg-transparent text-2xl outline-none placeholder-stone-600"
                        placeholder="john@example.com"
                     />
                  </div>
                  <div className="border-b border-stone-700 pb-4">
                     <label className="block text-sm uppercase tracking-widest text-stone-500 mb-2">
                        Message
                     </label>
                     <textarea
                        rows="3"
                        className="w-full bg-transparent text-2xl outline-none placeholder-stone-600 resize-none"
                        placeholder="Tell me about your project..."></textarea>
                  </div>
                  <button className="w-full py-6 bg-[#EBE9E4] text-stone-900 text-xl font-bold rounded-full hover:bg-stone-300 transition-colors">
                     Send Message
                  </button>
               </form>
            </div>
         </Section>
      </div>
   );
}

// --- Sub-components for Cleaner Code ---

const ProjectCard = ({ project, index }) => {
   const isEven = index % 2 === 0;

   return (
      <motion.div
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: '-100px' }}
         transition={{ duration: 0.8 }}
         className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
         {/* The "Node" on the wire */}
         <div className="absolute left-4 md:left-1/2 top-8 w-4 h-4 bg-stone-900 rounded-full border-4 border-[#EBE9E4] transform -translate-x-1/2 z-10" />

         {/* Date/Label Side */}
         <div
            className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
            <span className="text-6xl font-serif text-stone-300 font-bold block mb-2">
               0{index + 1}
            </span>
            <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
            <p className="text-stone-600 mb-4">{project.tech}</p>
            <p className="text-stone-500 leading-relaxed max-w-sm ml-auto mr-auto md:mx-0">
               {project.desc}
            </p>
         </div>

         {/* Text/Artistic Side (Replaces Image) */}
         <div
            className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-20' : 'md:pr-20'}`}>
            <div className="group relative overflow-hidden rounded-2xl h-[300px] md:h-[400px] w-full border border-stone-300 bg-[#E5E3DE] flex items-center justify-center p-6 hover:bg-stone-300 transition-colors duration-700">
               {/* Decorative Circle Background */}
               <div className="absolute w-64 h-64 bg-stone-400/10 rounded-full blur-3xl group-hover:bg-stone-400/20 transition-all duration-700" />

               {/* Cursive Text */}
               <span className="relative z-10 font-['Mrs_Saint_Delafield'] text-8xl md:text-[130px] font-boldtext-stone-800 text-center leading-tight transform group-hover:scale-110 transition-transform duration-700 cursor-default">
                  {project.name}
               </span>

               {/* Optional: 'View' text appears on hover below the cursive title */}
               <div className="absolute bottom-8 opacity-0 group-hover:opacity-900 transition-opacity duration-500">
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-800">
                     View Project
                  </span>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

const SocialLink = ({ icon, link }) => (
   <Link
      to={link}
      target="_blank"
      className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center hover:bg-[#EBE9E4] hover:text-stone-900 transition-all">
      {icon}
   </Link>
);

// --- Data ---

const skills = [
   {
      title: 'Frontend Dev',
      level: 95,
      desc: 'React.js, React-Native, Electron.js, Zustand, Redux, Tailwind, Framer Motion',
      icon: <Layout size={20} />,
   },
   {
      title: 'Backend API',
      level: 85,
      desc: 'Node.js, Express, PostgreSQL, MongoDB, SQLite',
      icon: <Database size={20} />,
   },
   {
      title: 'UI Design',
      level: 90,
      desc: 'Figma, Prototyping',
      icon: <Code2 size={20} />,
   },
   {
      title: 'CI/CD',
      level: 80,
      desc: 'Git, GitHub',
      icon: <ArrowUpRight size={20} />,
   },
];

const projects = [
   {
      title: 'ENVY - Inventory Management App',
      tech: 'React-Native • Node.js • MongoDB',
      desc: 'Envy is a mobile application that helps small businesses manage their inventory.',
      name: 'envy',
   },
   {
      title: 'Electron - Inventory for desktop',
      tech: 'Electron.js • SQLite • MongoDB',
      desc: 'Electron is a Desktop offline application so your data is on your handle not on cloud.',
      name: 'electron',
   },
   //    {
   //       title: 'Travel App UI',
   //       tech: 'React Native • Framer',
   //       desc: 'Interactive prototype for a booking application focusing on micro-interactions and user flow.',
   //       img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
   //    },
];
