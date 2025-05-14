import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'motion/react';
import {skills} from '../data';

const Skills = () => {
   const { isDarkMode } = useDarkMode();

   const data = [
      {
         name: 'Responsive Web Design',
         skills: skills.filter((skill) =>
            ['html5', 'css3-alt', 'js', 'react', 'tailwind'].includes(
               skill.name
            )
         ),
      },
      {
         name: 'UI/UX Design',
         skills: skills.filter((skill) =>
            ['css3-alt', 'figma', 'dribbble', 'tailwind'].includes(skill.name)
         ),
      },
      {
         name: 'Native Apps',
         skills: skills.filter((skill) => ['js', 'react'].includes(skill.name)),
      },
      {
         name: 'CI/CD',
         skills: skills.filter((skill) =>
            ['git-alt', 'github', 'jenkins'].includes(skill.name)
         ),
      },
   ];

   return (
      <motion.div
         initial={{ opacity: 0, rotateX: '70deg' }}
         whileInView={{ opacity: 1, rotateX: 0 }}
         transition={{
            duration: 1,
            type: 'spring',
            stiffness: 100,
            damping: 10,
         }}>
         <p
            className="font-bold text-3xl text-[#A294F9] text-center underline mt-10"
            id="skills">
            Skills
         </p>
         <div className="mx-4 sm:mx-22 my-5 sm:my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               {data.map((data, index) => (
                  <div
                     key={index}
                     className={`p-5 border-2 rounded-lg
                  ${
                     isDarkMode
                        ? 'shadow-[0px_4px_25px_rgba(0,0,0,1)] border-[#212121] bg-[#212121] '
                        : 'shadow-xl border-[#eeeff2]'
                  }`}>
                     <p
                        className={`font-bold text-xl mb-7 ${
                           isDarkMode ? 'text-[#ffff]' : 'text-[#A294F9]'
                        }`}>
                        {data.name}
                     </p>
                     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-center">
                        {data.skills.map((skill, index) => (
                           <div
                              key={index}
                              className="flex flex-col items-center">
                              {skill.image ? (
                                 <img
                                    src={skill.image}
                                    alt={skill.name}
                                    className="w-10 h-10"
                                 />
                              ) : (
                                 <i
                                    className={`fa-brands fa-${skill.name} text-4xl`}
                                    style={{ color: getColor(skill.name) }}></i>
                              )}
                              <progress
                                 value={skill.progress}
                                 max={100}
                                 className="w-20 h-2 mt-2 rounded-lg bg-gray-300 [&::-webkit-progress-bar]:bg-gray-300 [&::-webkit-progress-value]:bg-[#A294F9]"></progress>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </motion.div>
   );
};

const getColor = (brand) => {
   const colors = {
      html5: '#ff5225',
      'css3-alt': '#2d53e5',
      js: '#f7e025',
      react: '#81e0ff',
      'git-alt': '#e84d31',
      github: '#111',
      figma: '#9abf80',
      dribbble: '#f6a1df',
      jenkins: '#ee0536',
   };
   return colors[brand] || '#000';
};

export default Skills;
