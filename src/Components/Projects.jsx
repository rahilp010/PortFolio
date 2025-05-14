import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'motion/react';
import Variants from '../Animations/Variants';
import Carousel from '../Animations/Carousel';

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

const Projects = () => {
   const { isDarkMode } = useDarkMode();

   const webLinks = (url) => {
      window.open(url, '_blank');
   };

   return (
      // <motion.div
      //    variants={Variants('left', 0.2)}
      //    initial="hidden"
      //    whileInView={'show'}>
      //    <div
      //       className="font-bold text-3xl text-[#A294F9] text-center underline mt-24"
      //       id="projects">
      //       Projects
      //    </div>
      //    <div className="">
      //       <div
      //          className={`grid grid-cols-1 sm:grid-cols-2 items-center text-center mx-4 sm:mx-20 border-2 my-8 sm:my-16
      //             ${
      //                isDarkMode
      //                   ? 'border-[#212121] bg-[#212121] shadow-[0px_4px_25px_rgba(0,0,0,1)]'
      //                   : 'border-[#e5e7eb] shadow-2xl'
      //             }`}
      //          id="dark-mode">
      //          <div className="p-12 bg-[#493D9E] text-white">
      //             <i
      //                className="fa-brands fa-github text-[200px] cursor-pointer hover:text-[#111] transition-all duration-300"
      //                onClick={() =>
      //                   webLinks('https://github.com/rahilp010')
      //                }></i>
      //          </div>
      //          <div className="bg-[#11111127] h-full flex flex-col items-center justify-center my-7 sm:my-15">
      //             <p className="font-bold text-4xl tracking-wide">
      //                Click On GitHub
      //             </p>
      //             <p className="font-thin">(Get access to My projects)</p>

      //             <div className="flex gap-3 mt-2 bg-[#493D9E] p-1 px-3 rounded-full">
      //                {['html5', 'css3-alt', 'js', 'react'].map(
      //                   (brand, index) => (
      //                      <i
      //                         key={index}
      //                         className={`fa-brands fa-${brand} text-2xl`}
      //                         style={{ color: getColor(brand) }}></i>
      //                   )
      //                )}
      //             </div>
      //          </div>
      //       </div>
      //    </div>
      // </motion.div>

      // <div className="flex items-center justify-center space-x-4 my-10">

      //    <div className="items-center">
      //       <div className="w-40 h-40 bg-violet-500 rounded-full"></div>
      //    </div>

      //    <div className="border-t-2 border-dotted border-violet-400 w-16"></div>

      //    <div>
      //       <div className="w-40 h-40 bg-violet-500 rounded-full"></div>
      //    </div>

      //    <div className="border-t-2 border-dotted border-violet-400 w-16"></div>

      //    <div>
      //       <div className="w-40 h-40 bg-violet-500 rounded-full"></div>
      //    </div>
      // </div>

      <motion.div
         initial={{ opacity: 0, rotateX: '70deg' }}
         whileInView={{ opacity: 1, rotateX: 0 }}
         transition={{
            duration: 2,
            type: 'spring',
            stiffness: 100,
            damping: 10,
         }}
         className="px-20">
         <div
            className="font-bold text-3xl text-[#A294F9] text-center underline mt-24"
            id="projects">
            My Projects
         </div>
         <div className="my-10">
            <Carousel />
         </div>
      </motion.div>
   );
};

export default Projects;
