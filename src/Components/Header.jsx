import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import Logo2 from '../assets/Logo2.png';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useDarkMode } from './DarkModeContext';
import { motion, useScroll } from 'motion/react';

const Header = () => {
   const [isSticky, setIsSticky] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);
   const { isDarkMode, toggleDarkMode } = useDarkMode(); 

   const { scrollYProgress } = useScroll({});

   useEffect(() => {
      const handleScroll = () => {
         setIsSticky(window.scrollY > 600);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const darkMode = () => {
      document.body.classList.toggle('bg-[#101010]');
      document.body.classList.toggle('text-white');
   };

   return (
      <motion.div
         className={`w-full top-0 left-0 transition-all duration-300 p-2 z-50 ${
            isSticky
               ? `fixed transform translate-y-0 ${
                    isDarkMode
                       ? 'bg-black opacity-80 scale-100 shadow-[0px_4px_25px_rgba(0,0,0,1)]'
                       : 'bg-white opacity-80 scale-100 shadow-2xl'
                 }`
               : 'relative opacity-90 scale-95'
         }`}>
         <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-violet-500 origin-left"
            style={{ scaleX: scrollYProgress }}></motion.div>
         <div className="flex justify-between items-center mx-0 sm:mx-10 rounded-full font-bold transition-all duration-300">
            {/* Logo with Dark Mode Toggle */}
            <button
               onDoubleClick={() => {
                  toggleDarkMode();
                  darkMode();
               }}
               className="focus:outline-none">
               <img
                  src={`${isDarkMode ? Logo2 : Logo}`} // Change this if you have a separate dark mode logo
                  alt="Logo"
                  className="w-20 h-14 mix-blend-hard-light transition-all duration-500 transform hover:scale-110"
               />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
               <ul className="flex p-3 px-1 text-lg border rounded-4xl">
                  {['About', 'Skills', 'Projects'].map((tab, index) => (
                     <li key={index} className="font-bold">
                        <a
                           href={`#${tab.toLowerCase()}`}
                           className="p-1.5 px-7 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:text-[#5b50a8]">
                           {tab}
                        </a>
                     </li>
                  ))}
                  <li>
                     <a
                        href="#contact"
                        className="p-2.5 px-8 rounded-4xl transition-all duration-300 transform hover:scale-110 bg-[#493D9E] text-white">
                        Contact
                     </a>
                  </li>
               </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
               className="md:hidden text-3xl"
               onClick={() => setMenuOpen(!menuOpen)}>
               {menuOpen ? <IoClose /> : <IoMenu />}
            </button>
         </div>

         {/* Mobile Navigation Menu */}
         {menuOpen && (
            <div
               className={`md:hidden p-4 absolute w-full left-0 top-[4.5rem] shadow-md ${
                  isDarkMode
                     ? 'bg-black opacity-80 scale-100 shadow-[0px_4px_25px_rgba(0,0,0,1)]'
                     : 'bg-white opacity-80 scale-100 shadow-2xl'
               }`}>
               <ul className="flex flex-col items-center gap-4 text-lg font-bold">
                  {['About', 'Skills', 'Projects', 'Contact'].map(
                     (tab, index) => (
                        <li key={index}>
                           <a
                              href={`#${tab.toLowerCase()}`}
                              className="p-2 rounded-md block transition-all duration-300 hover:text-[#5b50a8]"
                              onClick={() => setMenuOpen(false)}>
                              {tab}
                           </a>
                        </li>
                     )
                  )}
               </ul>
            </div>
         )}
      </motion.div>
   );
};

export default Header;
