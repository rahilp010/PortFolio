import React from 'react';
import mine from '../assets/mine1-Photoroom.png';
import cv from '../assets/CV.png';
import projects from '../assets/Projects.png';
import contact from '../assets/contact.png';
import aboutMe from '../assets/aboutMe.png';
import skills from '../assets/skills.png';
import { useDarkMode } from './DarkModeContext';

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
      <div className="w-full px-5 sm:px-10 lg:px-20 sm:mt-10 transition-all duration-500">
         <div className="w-full py-5">
            <div
               className={`flex justify-between px-5 sm:px-10 lg:px-20 items-center relative rounded-2xl border-2 p-10 md:p-14 h-auto md:h-96 fade-in transition-all duration-200 ${
                  isDarkMode
                     ? 'border-[#212121] bg-[#212121]  shadow-[0px_4px_25px_rgba(0,0,0,1)] '
                     : 'shadow-2xl bg-white'
               } `}>
               <div>
                  <p className="font-medium text-lg">Hello,</p>
                  <p className="font-bold text-4xl sm:text-5xl mt-2">
                     I'm <span className="text-[#A294F9]">Rahil Patel</span>
                  </p>
                  <p className="font-bold text-xl sm:text-3xl mt-3">
                     Web Developer & Tech Enthusiast
                  </p>

                  <ul className="flex text-2xl gap-6 mt-5 sm:mt-10 ml-1">
                     {['linkedin', 'github', 'instagram'].map(
                        (brand, index) => (
                           <li key={index}>
                              <i
                                 className={`fa-brands fa-${brand} cursor-pointer hover:text-[#A294F9] transition-all duration-300`}
                                 onClick={() => webLinks(brand)}></i>
                           </li>
                        )
                     )}
                  </ul>
               </div>

               <img
                  src={mine}
                  alt="Profile"
                  className="w-0 lg:w-[360px] lg:h-[360px] md:w-[250px] md:h-[250px] bg-[#DAD2FF] rounded-tl-[300px] rounded-br-[300px] rounded-tr-[150px] rounded-bl-[150px] shadow-xl"
               />
            </div>
         </div>

         <div className="flex justify-center blocks">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-10 my-7 sm:my-16">
               {[cv, aboutMe, skills, projects, contact].map((image, index) => (
                  <div
                     key={index}
                     className="relative w-28 h-28 sm:w-36 sm:h-36 group perspective cursor-pointer"
                     onClick={() => webLinks(buttonLinks[index])}>
                     <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 ">
                        <div
                           className={`absolute inset-0 flex flex-col justify-center items-center border-2 p-3 rounded-3xl border-b-[#a294f9] backface-hidden 
                           ${
                              isDarkMode
                                 ? 'shadow-[0px_4px_25px_rgba(0,0,0,1)] border-[#212121] bg-[#212121]'
                                 : 'border-[#eeeff2] shadow-2xl'
                           }`}>
                           <img
                              src={image}
                              alt={`icon-${index}`}
                              className="w-24 h-24"
                           />
                        </div>

                        <div className="absolute inset-0 flex justify-center items-center border-2 shadow-2xl rounded-3xl border-purple-900 bg-purple-700 rotate-y-180 backface-hidden">
                           <p className="text-white font-bold text-lg">
                              {labels[index]}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Profile;
