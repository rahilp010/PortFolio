import React from 'react';
import mine from '../assets/mine1-Photoroom.png';
import cv from '../assets/CV.png';
import projects from '../assets/Projects.png';
import contact from '../assets/contact.png';
import aboutMe from '../assets/aboutMe.png';
import skills from '../assets/skills.png';

const Profile = () => {
   const webLinks = (platform) => {
      const links = {
         linkedin: 'https://www.linkedin.com/in/rahil-patel',
         github: 'https://github.com/rahilp010',
         instagram: 'https://www.instagram.com/your_instagram',
      };

      if (links[platform]) {
         window.open(links[platform], '_blank');
      }
   };

   const labels = [
      'Download CV',
      'About Me',
      'Skills',
      'My Projects',
      'Contact Me',
   ];

   return (
      <div className="w-full px-5 sm:px-10 lg:px-20 sm:mt-10">
         <div className="w-full py-5">
            <div className="flex justify-between px-5 sm:px-10 lg:px-20 items-center relative rounded-2xl shadow-2xl border-2 p-10 md:p-14 h-auto md:h-96 fade-in">
               <div>
                  <p className="font-medium text-lg">Hello,</p>
                  <p className="font-bold text-4xl sm:text-5xl mt-2">
                     I'm <span className="text-[#A294F9]">Rahil Patel</span>
                  </p>
                  <p className="font-bold text-xl sm:text-3xl mt-3">
                     Web Developer & Tech Enthusiast
                  </p>

                  <ul className="flex text-2xl gap-6 mt-10 ml-1">
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
                     className="relative w-28 h-28 sm:w-36 sm:h-36 group perspective cursor-pointer">
                     <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                        <div className="absolute inset-0 flex flex-col justify-center items-center border-2 shadow-xl border-[#e5e7eb] p-3 rounded-3xl bg-white backface-hidden">
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
