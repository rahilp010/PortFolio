import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import { IoMenu, IoClose } from 'react-icons/io5'; // Import icons for mobile menu

const Header = () => {
   const [isSticky, setIsSticky] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 600) {
            setIsSticky(true);
         } else {
            setIsSticky(false);
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div
         className={`w-full top-0 left-0 transition-all duration-500 p-2 z-50 ${
            isSticky
               ? 'fixed transform translate-y-0 bg-[#f6f6f6] opacity-90 scale-100 shadow-md'
               : 'relative opacity-90 scale-95'
         }`}>
         <div className="flex justify-between items-center sm:mx-10 px-5 rounded-full font-bold transition-all duration-500">
            
            {/* Logo */}
            <img
               src={Logo}
               alt="Logo"
               className="w-20 h-14 mix-blend-hard-light transition-all duration-500 transform hover:scale-110"
            />

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
                        href={`#contact`}
                        className="p-2.5 px-8 rounded-4xl transition-all duration-300 transform hover:scale-110 bg-[#493D9E] text-white">
                        Contact
                     </a>
                  </li>
               </ul>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
               {menuOpen ? <IoClose /> : <IoMenu />}
            </button>
         </div>

         {/* Mobile Navigation Menu */}
         {menuOpen && (
            <div className="md:hidden bg-[#f6f6f6] p-4 absolute w-full left-0 top-[4.5rem] shadow-md">
               <ul className="flex flex-col items-center gap-4 text-lg font-bold">
                  {['About', 'Skills', 'Projects', 'Contact'].map((tab, index) => (
                     <li key={index}>
                        <a
                           href={`#${tab.toLowerCase()}`}
                           className="p-2 rounded-md block transition-all duration-300 hover:text-[#5b50a8]"
                           onClick={() => setMenuOpen(false)}>
                           {tab}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default Header;
