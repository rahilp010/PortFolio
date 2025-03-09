import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
   const [isSticky, setIsSticky] = useState(false);

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
               ? 'fixed transform translate-y-0 bg-[#f6f6f6] opacity-90 scale-100'
               : 'relative opacity-90 scale-95'
         }`}>
         <div
            className={`flex justify-between items-center mx-10 px-5 rounded-full font-bold transition-all duration-500 `}>
            <img
               src={Logo}
               alt="Logo"
               className={`w-20 h-14 mix-blend-hard-light transition-all duration-500 transform hover:scale-110`}
            />

            <div className="flex items-center">
               <ul className="flex p-3 px-1 text-lg border rounded-4xl">
                  {['About', 'Skills', 'Projects'].map((tab, index) => (
                     <li key={index} className="font-bold">
                        <a
                        href={`#${tab.toLocaleLowerCase()}`}
                           className={
                              `p-1.5 px-7 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:text-[#5b50a8]`}>
                           {tab}
                        </a>
                     </li>
                  ))}
                  <li>
                     <a
                        href={`#contact`}
                        className={`p-2.5 px-8 rounded-4xl transition-all duration-300 transform hover:scale-110 bg-[#493D9E] text-white`
                        }>
                        Contact
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Header;
