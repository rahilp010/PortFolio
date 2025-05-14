import { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import axios from 'axios';
import { data, skills } from '../data';
import { useDarkMode } from '../Components/DarkModeContext';

const itemsPerPage = 4;

const Carousel = () => {
   const [page, setPage] = useState(0);
   // const [repos, setRepos] = useState([]);
   // const [languages, setLanguages] = useState([]);
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
      };
      return colors[brand] || '#000';
   };

   return (
      <div className="relative w-full mx-auto p-4">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {currentRepos.map((data, id) => (
               <div
                  key={id}
                  className="relative overflow-hidden group h-72 glass-card group p-8 rounded-2xl backdrop-blur-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 shadow-2xl shadow-black/50 hover:scale-102 hover:cursor-pointer transition-transform duration-300">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-2 text-center">
                     {data.name}
                  </h2>
                  <p className="text-sm mb-2 text-center">{data.description}</p>
                  <div className="flex justify-center mt-4">
                     <div className="w-full h-1.5 absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                     <div className="w-full h-0.5 mx-20 bg-gray-50"></div>
                     <div className="absolute top-1/2">
                        {
                           <i
                              className={`fa-brands fa-github text-5xl z-10`}></i>
                        }
                     </div>
                     <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                        <div className="relative flex gap-4 items-center justify-center">
                           {skills.map(
                              (skill, index) =>
                                 data.languages.includes(skill.name) && (
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
                                             strokeDasharray={2 * Math.PI * 20}
                                             strokeDashoffset={
                                                2 *
                                                Math.PI *
                                                20 *
                                                (1 - skill.progress / 100)
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
                                 )
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {itemsPerPage >= 4 && (
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
