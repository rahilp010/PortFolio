import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'framer-motion';
import Carousel from '../Animations/Carousel';

const Projects = () => {
   const { isDarkMode } = useDarkMode();

   const webLinks = (url) => {
      window.open(url, '_blank');
   };

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
         id="projects">
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
            My Projects
         </motion.h2>

         {/* Carousel container with premium card-like styling */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className={`bg-${
               isDarkMode ? 'gray-900/50' : 'white/50'
            } backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-${
               isDarkMode ? 'gray-700' : '[#A294F9]/20'
            }`}>
            <Carousel />
         </motion.div>
      </motion.section>
   );
};

export default Projects;
