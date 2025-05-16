import { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import axios from 'axios';
import { data, skills } from '../data';
import { useDarkMode } from '../Components/DarkModeContext';
import { motion } from 'framer-motion';
import { IoDocumentText } from 'react-icons/io5';

const Carousel = () => {
   const [page, setPage] = useState(0);
   // const [repos, setRepos] = useState([]);
   // const [languages, setLanguages] = useState([]);
   const [isFlipped, setIsFlipped] = useState(false);
   const [isSmallScreen, setIsSmallScreen] = useState(false);
   const { isDarkMode } = useDarkMode();

   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const responseRepos = await axios.get(
   //             'https://api.github.com/users/rahilp010/repos'
   //          );
   //          setRepos(responseRepos.data);

   //          const languageResponse = responseRepos.data.map((repo) =>
   //             axios.get(
   //                `https://api.github.com/repos/rahilp010/${repo.name}/languages`
   //             )
   //          );
   //          const languages = [await Promise.all(languageResponse)]

   //          const languagesData = languages.map((language) => language.data);
   //          setLanguages(languagesData);
   //       } catch (err) {
   //          console.error('Error fetching repos:', err);
   //       }
   //    };
   //    fetchData();
   // }, []);

   useEffect(() => {
      const checkScreenSize = () => {
         setIsSmallScreen(window.innerWidth < 640); // Tailwind "sm" is 640px
      };

      checkScreenSize(); // Run on mount

      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
   }, []);

   const itemsPerPage = isSmallScreen ? 10 : 4;

   const totalPages = Math.ceil(data.length / itemsPerPage);

   const handleNext = () => {
      setPage((prev) => (prev + 1) % totalPages);
   };

   const handlePrev = () => {
      setPage((prev) => (prev - 1 + totalPages) % totalPages);
   };

   // const currentRepos = repos.slice(
   const currentRepos = data.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage
   );

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
         php: '#4979fc',
      };
      return colors[brand] || '#000';
   };

   return (
      <div className="relative w-full mx-auto p-4">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {currentRepos.map((data, id) => (
               <div
                  key={id}
                  className="relative overflow-hidden group h-72 glass-card group rounded-2xl backdrop-blur-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 shadow-2xl shadow-black/50 hover:scale-102 hover:cursor-pointer transition-transform duration-300"
                  style={{ perspective: '500px' }}
                  onClick={() =>
                     setIsFlipped((prev) => ({
                        ...prev,
                        [data.id]: !prev[data.id],
                     }))
                  }>
                  <motion.div
                     className="relative w-full h-full duration-100"
                     animate={{ rotateY: isFlipped[data.id] ? 180 : 0 }}
                     style={{ transformStyle: 'preserve-3d' }}
                     inherit={{ scale: 0, opacity: 0 }}
                     whileInView={{
                        scale: 1,
                        opacity: 1,
                        delay: 0.5,
                     }}
                     whileHover={{
                        cursor: 'pointer',
                     }}
                     transition={{ type: 'spring', stiffness: 50 }}>
                     {/* Front */}
                     <div
                        className="absolute w-full h-full p-5"
                        style={{ backfaceVisibility: 'hidden' }}>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-2 text-center">
                           {data.name}
                        </h2>
                        <p className="text-sm mb-2 text-center">
                           {data.descriptionOneLiner}
                        </p>
                        <div className="flex justify-center mt-4">
                           <div className="w-full h-1.5 absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                           <div className="w-full h-0.5 mx-20 bg-gray-50"></div>
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-10 text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                              Tap to view
                           </div>
                           <div
                              className="absolute top-1/2"
                              onClick={(e) => e.stopPropagation()}>
                              {
                                 <i
                                    className={`fa-brands fa-github text-5xl z-10`}
                                    onClick={() =>
                                       window.open(data.link, '_blank')
                                    }></i>
                              }
                           </div>
                           <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                              <div className="relative flex gap-4 items-center justify-center">
                                 {skills.map((skill, index) => {
                                    const matchedLang = data.languages.find(
                                       (lang) =>
                                          lang.language.toLowerCase() ===
                                          skill.name.toLowerCase()
                                    );

                                    // If no match, skip rendering this skill
                                    if (!matchedLang) return null;

                                    return (
                                       <div
                                          key={index}
                                          className="flex flex-col items-center group relative w-10 h-10">
                                          <svg
                                             width="80"
                                             height="80"
                                             className="absolute z-0 rotate-[-90deg]">
                                             <circle
                                                cx="40"
                                                cy="40"
                                                r="20"
                                                stroke="#e5e7eb"
                                                strokeWidth="4"
                                                fill="none"
                                             />
                                             <circle
                                                cx="40"
                                                cy="40"
                                                r="20"
                                                stroke="#A294F9"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                fill="none"
                                                strokeDasharray={
                                                   2 * Math.PI * 20
                                                }
                                                strokeDashoffset={
                                                   2 *
                                                   Math.PI *
                                                   20 *
                                                   (1 -
                                                      matchedLang.progress /
                                                         100)
                                                }
                                                className="transition-all duration-500"
                                             />
                                          </svg>

                                          {skill.image ? (
                                             <img
                                                src={skill.image}
                                                alt={skill.name}
                                                className="w-7 h-7 top-0 mt-6.5 z-10 transition-transform duration-300"
                                             />
                                          ) : (
                                             <i
                                                className={`fa-brands fa-${skill.name} text-2xl z-10 mt-7`}
                                                style={{
                                                   color: getColor(skill.name),
                                                }}></i>
                                          )}
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div
                        className="absolute w-full h-full backface-hidden flex-1 flex-col items-center text-lg font-semibold rotate-y-180 glass-card group rounded-2xl backdrop-blur-lg bg-[#282828] border border-white/10 shadow-2xl shadow-black/50 hover:cursor-pointer transition-transform duration-300"
                        style={{ backfaceVisibility: 'hidden' }}>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-2 text-center">
                           <div className="w-full h-1.5 absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        </h2>

                        <div>
                           <div className="flex items-center gap-2">
                              {
                                 <i
                                    className={`fa-brands fa-github text-4xl p-4 z-10`}></i>
                              }
                              <p>{data.name}</p>
                           </div>
                           <div className="mx-12">
                              <p className="flex items-center gap-4 w-full border p-3 rounded-3xl bg-white/10 backdrop-blur-lg">
                                 <p className="text-[16px] line-clamp-6">
                                    {data.description}
                                 </p>
                              </p>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            ))}
         </div>

         {isSmallScreen || itemsPerPage >= 4 && ( 
            <div>
               <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:scale-125 p-2 rounded-full text-xl text-gray-800 shadow-lg z-10 hover:cursor-pointer transition-transform duration-300">
                  <FaArrowAltCircleLeft />
               </button>
               <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:scale-125 p-2 rounded-full text-xl text-gray-800 shadow-lg z-10 hover:cursor-pointer transition-transform duration-300">
                  <FaArrowAltCircleRight />
               </button>
            </div>
         )}

         <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
               <div
                  key={i}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                     i === page ? 'bg-gray-800' : 'bg-gray-400'
                  }`}
                  onClick={() => setPage(i)}
               />
            ))}
         </div>
      </div>
   );
};

export default Carousel;
