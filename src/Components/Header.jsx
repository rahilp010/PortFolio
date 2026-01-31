import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import Logo2 from '../assets/Logo2.png';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useDarkMode } from './DarkModeContext';
import { motion, useScroll } from 'framer-motion'; // Corrected to framer-motion for better compatibility

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
      <motion.header
         className={`w-full top-0 left-0 transition-all duration-500 ease-in-out p-2 z-50 ${
            isSticky
               ? `fixed transform translate-y-0 ${
                    isDarkMode
                       ? 'bg-gray-900/70 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
                       : 'bg-white/70 backdrop-blur-md shadow-2xl'
                 }`
               : 'relative'
         }`}
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.8, ease: 'easeOut' }}>
         {/* Scroll Progress Bar */}
         <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A294F9] to-[#D4C6FF] origin-left z-50"
            style={{ scaleX: scrollYProgress }}></motion.div>

         <div className="flex justify-between items-center mx-4 sm:mx-10 lg:mx-20 rounded-full font-bold transition-all duration-300">
            {/* Logo with Dark Mode Toggle */}
            <motion.button
               onDoubleClick={() => {
                  toggleDarkMode();
                  darkMode();
               }}
               className="focus:outline-none"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               transition={{ duration: 0.3 }}>
               <img
                  src={isDarkMode ? Logo2 : Logo}
                  alt="Logo"
                  className="w-20 h-14 mix-blend-hard-light transition-all duration-500"
               />
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
               <ul className="flex p-3 px-1 text-lg border border-gray-700/50 rounded-full bg-gray-800/30 backdrop-blur-sm shadow-inner">
                  {['About', 'Skills', 'Projects'].map((tab, index) => (
                     <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="font-bold">
                        <a
                           href={`#${tab.toLowerCase()}`}
                           className={`p-1.5 px-7 rounded-2xl transition-all duration-300 ${
                              isDarkMode
                                 ? 'hover:text-[#D4C6FF]'
                                 : 'hover:text-[#A294F9]'
                           } hover:bg-gray-700/50`}>
                           {tab}
                        </a>
                     </motion.li>
                  ))}
                  <motion.li
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.3 }}>
                     <a
                        href="#contact"
                        className={`p-2.5 px-8 rounded-full transition-all duration-300 ${
                           isDarkMode
                              ? 'bg-[#A294F9] text-white hover:bg-[#D4C6FF]'
                              : 'bg-[#A294F9] text-white hover:bg-[#8A7DE0]'
                        } hover:shadow-lg`}>
                        Contact
                     </a>
                  </motion.li>
               </ul>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
               className="md:hidden text-3xl"
               onClick={() => setMenuOpen(!menuOpen)}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}>
               {menuOpen ? <IoClose /> : <IoMenu />}
            </motion.button>
         </div>

         {/* Mobile Navigation Menu */}
         {menuOpen && (
            <motion.nav
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.5, ease: 'easeOut' }}
               className={`md:hidden p-4 absolute w-full left-0 top-full shadow-md rounded-b-2xl ${
                  isDarkMode
                     ? 'bg-gray-900/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
                     : 'bg-white/90 backdrop-blur-md shadow-2xl'
               }`}>
               <ul className="flex flex-col items-center gap-4 text-lg font-bold">
                  {['About', 'Skills', 'Projects', 'Contact'].map(
                     (tab, index) => (
                        <motion.li
                           key={index}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.3, delay: index * 0.1 }}>
                           <a
                              href={`#${tab.toLowerCase()}`}
                              className={`p-2 rounded-md block transition-all duration-300 ${
                                 isDarkMode
                                    ? 'hover:text-[#D4C6FF]'
                                    : 'hover:text-[#A294F9]'
                              } hover:bg-gray-700/50`}
                              onClick={() => setMenuOpen(false)}>
                              {tab}
                           </a>
                        </motion.li>
                     ),
                  )}
               </ul>
            </motion.nav>
         )}
      </motion.header>
   );
};

export default Header;
