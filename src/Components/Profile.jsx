import React from 'react';
import mine from '../assets/mine1-Photoroom.png';
import cv from '../assets/CV.png';
import projects from '../assets/Projects.png';
import contact from '../assets/contact.png';
import aboutMe from '../assets/aboutMe.png';
import skills from '../assets/skills.png';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'framer-motion'; // Corrected to framer-motion for better compatibility

const Profile = () => {
   const { isDarkMode } = useDarkMode();

   const webLinks = (platform) => {
      const links = {
         linkedin: 'https://www.linkedin.com/in/rahil-patel-846800210/',
         github: 'https://github.com/rahilp010',
         instagram:
            'https://www.instagram.com/rahil_patel_010?igsh=MXFtenNyNHVyMmtwMw==',
         cv: 'https://github.com/rahilp010',
      };

      if (links[platform]) {
         window.open(links[platform], '_blank');
      }

      if (['about', 'skills', 'projects', 'contact'].includes(platform)) {
         const section = document.getElementById(platform);
         if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
         }
      }
   };

   const labels = [
      'Download CV',
      'About Me',
      'Skills',
      'My Projects',
      'Contact Me',
   ];

   const buttonLinks = ['cv', 'about', 'skills', 'projects', 'contact'];

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
         id="profile">
         {/* Premium background gradient for depth */}
         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(162,148,249,0.05)] to-transparent pointer-events-none" />

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="w-full transition-all duration-500">
            <div className="w-full py-5">
               <div
                  className={`flex flex-col md:flex-row justify-between items-center gap-8 bg-${
                     isDarkMode ? 'gray-900/50' : 'white/50'
                  } backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-${
                     isDarkMode ? 'gray-700' : '[#A294F9]/20'
                  } transition-all duration-300 hover:shadow-xl`}>
                  <div className="text-center md:text-left">
                     <p
                        className={`font-medium text-lg ${
                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Hello,
                     </p>
                     <p className="font-bold text-4xl sm:text-5xl mt-2">
                        I'm{' '}
                        <span
                           className={`${
                              isDarkMode ? 'text-[#D4C6FF]' : 'text-[#A294F9]'
                           }`}>
                           Rahil Patel
                        </span>
                     </p>
                     <p
                        className={`font-bold text-xl sm:text-3xl mt-3 ${
                           isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                        Web Developer & Tech Enthusiast
                     </p>

                     <ul className="flex text-2xl gap-6 mt-5 sm:mt-10 justify-center md:justify-start">
                        {['linkedin', 'github', 'instagram'].map(
                           (brand, index) => (
                              <li key={index}>
                                 <i
                                    className={`fa-brands fa-${brand} cursor-pointer transition-all duration-300 ${
                                       isDarkMode
                                          ? 'text-gray-300 hover:text-[#D4C6FF]'
                                          : 'text-gray-600 hover:text-[#A294F9]'
                                    }`}
                                    onClick={() => webLinks(brand)}></i>
                              </li>
                           ),
                        )}
                     </ul>
                  </div>

                  <motion.img
                     src={mine}
                     alt="Profile"
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                     className="hidden md:block w-[250px] h-[250px] lg:w-[360px] lg:h-[360px] bg-[#DAD2FF] rounded-tl-[300px] rounded-br-[300px] rounded-tr-[150px] rounded-bl-[150px] shadow-lg transition-transform duration-300 hover:scale-105"
                  />
               </div>
            </div>
            <motion.div
               className="flex justify-center"
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{
                  duration: 1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: 0.8,
               }}>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10 my-7 sm:my-16">
                  {[cv, aboutMe, skills, projects, contact].map(
                     (image, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{
                              duration: 0.5,
                              delay: 0.1 * index + 1,
                              ease: 'easeOut',
                           }}
                           className="relative w-28 h-28 sm:w-36 sm:h-36 group perspective cursor-pointer"
                           onClick={() => webLinks(buttonLinks[index])}>
                           <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                              <div
                                 className={`absolute inset-0 flex flex-col justify-center items-center border rounded-3xl p-3 backface-hidden transition-all duration-300 ${
                                    isDarkMode
                                       ? 'border-gray-700 bg-gray-800/70 backdrop-blur-sm shadow-xl hover:shadow-2xl'
                                       : 'border-[#A294F9]/30 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl'
                                 }`}>
                                 <img
                                    src={image}
                                    alt={`icon-${index}`}
                                    className="w-20 h-20 sm:w-24 sm:h-24"
                                 />
                              </div>

                              <div
                                 className={`absolute inset-0 flex justify-center items-center border rounded-3xl rotate-y-180 backface-hidden transition-all duration-300 ${
                                    isDarkMode
                                       ? 'border-[#D4C6FF]/50 bg-[#A294F9]/70 text-white shadow-xl'
                                       : 'border-[#A294F9]/50 bg-[#A294F9] text-white shadow-lg'
                                 }`}>
                                 <p className="font-bold text-base sm:text-lg text-center px-2">
                                    {labels[index]}
                                 </p>
                              </div>
                           </div>
                        </motion.div>
                     ),
                  )}
               </div>
            </motion.div>
         </motion.div>
      </motion.section>
   );
};

export default Profile;
