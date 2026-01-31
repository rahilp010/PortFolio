import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'framer-motion'; // Corrected to framer-motion for better compatibility
import { skills } from '../data';

const Skills = () => {
   const { isDarkMode } = useDarkMode();

   const data = [
      {
         name: 'Responsive Web Design',
         skills: skills.filter((skill) =>
            ['html5', 'css3-alt', 'js', 'react', 'tailwind'].includes(
               skill.name,
            ),
         ),
      },
      {
         name: 'UI/UX Design',
         skills: skills.filter((skill) =>
            ['css3-alt', 'figma', 'dribbble', 'tailwind'].includes(skill.name),
         ),
      },
      {
         name: 'Native Apps',
         skills: skills.filter((skill) => ['js', 'react'].includes(skill.name)),
      },
      {
         name: 'CI/CD',
         skills: skills.filter((skill) =>
            ['git-alt', 'github', 'jenkins'].includes(skill.name),
         ),
      },
   ];

   return (
      <motion.section
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{
            duration: 1.2,
            ease: 'easeOut',
         }}
         viewport={{ once: true }}
         className="relative px-4 sm:px-8 lg:px-20 py-16 overflow-hidden"
         id="skills">
         {/* Premium background gradient for depth */}
         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(162,148,249,0.05)] to-transparent pointer-events-none" />

         {/* Enhanced title with subtle glow and better typography */}
         <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className={`font-extrabold text-4xl md:text-5xl ${
               isDarkMode ? 'text-[#D4C6FF]' : 'text-[#A294F9]'
            } text-center underline decoration-wavy underline-offset-8 mb-12 tracking-wide drop-shadow-md`}>
            Skills
         </motion.h2>

         {/* Grid container with premium card-like styling */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className={`bg-${
               isDarkMode ? 'gray-900/50' : 'white/50'
            } backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-${
               isDarkMode ? 'gray-700' : '[#A294F9]/20'
            }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               {data.map((item, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{
                        duration: 0.5,
                        delay: 0.1 * index,
                        ease: 'easeOut',
                     }}
                     className={`p-6 border rounded-xl transition-all duration-300 hover:shadow-xl ${
                        isDarkMode
                           ? 'border-gray-700 bg-gray-800/70 backdrop-blur-sm'
                           : 'border-[#A294F9]/30 bg-white/70 backdrop-blur-sm'
                     }`}>
                     <p
                        className={`font-bold text-xl mb-7 ${
                           isDarkMode ? 'text-white' : 'text-[#A294F9]'
                        }`}>
                        {item.name}
                     </p>
                     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
                        {item.skills.map((skill, skillIndex) => (
                           <div
                              key={skillIndex}
                              className="flex flex-col items-center">
                              {skill.image ? (
                                 <img
                                    src={skill.image}
                                    alt={skill.name}
                                    className="w-12 h-12 mb-2"
                                 />
                              ) : (
                                 <i
                                    className={`fa-brands fa-${skill.name} text-5xl mb-2`}
                                    style={{ color: getColor(skill.name) }}></i>
                              )}
                              <progress
                                 value={skill.progress}
                                 max={100}
                                 className={`w-24 h-2 rounded-full ${
                                    isDarkMode
                                       ? 'bg-gray-700 [&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:bg-[#D4C6FF]'
                                       : 'bg-gray-300 [&::-webkit-progress-bar]:bg-gray-300 [&::-webkit-progress-value]:bg-[#A294F9]'
                                 }`}></progress>
                           </div>
                        ))}
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
      </motion.section>
   );
};

const getColor = (brand) => {
   const colors = {
      html5: '#ff5225',
      'css3-alt': '#2d53e5',
      js: '#f7e025',
      react: '#81e0ff',
      'git-alt': '#e84d31',
      github: 'white',
      figma: '#9abf80',
      dribbble: '#f6a1df',
      jenkins: '#ee0536',
   };
   return colors[brand] || '#000';
};

export default Skills;
