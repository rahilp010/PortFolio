import { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { data, skills } from '../data';

const Carousel = () => {
   const [page, setPage] = useState(0);
   const [isSmall, setIsSmall] = useState(false);

   useEffect(() => {
      const resize = () => setIsSmall(window.innerWidth < 640);
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
   }, []);

   const itemsPerPage = isSmall ? 1 : 3; // ✅ 3-column grid
   const totalPages = Math.ceil(data.length / itemsPerPage);

   const items = data.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage,
   );

   return (
      <div className="relative w-full p-6">
         {/* GRID */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
               <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative h-80 rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)]
            transition-all duration-300">
                  {/* CARD CONTENT */}
                  <div className="p-6 h-full flex flex-col">
                     {/* TITLE */}
                     <h2
                        className="text-xl font-bold text-center
              bg-gradient-to-r from-indigo-400 to-purple-500
              text-transparent bg-clip-text">
                        {item.name}
                     </h2>

                     {/* SHORT DESCRIPTION */}
                     <p className="text-sm text-gray-300 text-center mt-2 line-clamp-2">
                        {item.descriptionOneLiner}
                     </p>

                     {/* TECH STACK */}
                     <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {skills.map((skill, idx) => {
                           const used = item.languages.find(
                              (l) =>
                                 l.language.toLowerCase() ===
                                 skill.name.toLowerCase(),
                           );
                           if (!used) return null;

                           return (
                              <div
                                 key={idx}
                                 className="px-3 py-1 rounded-full text-xs
                      bg-white/10 border border-white/10
                      text-gray-200">
                                 {skill.name}
                              </div>
                           );
                        })}
                     </div>

                     {/* LONG DESCRIPTION */}
                     <p className="text-sm text-gray-300 mt-6 line-clamp-3">
                        {item.description}
                     </p>

                     {/* ACTIONS */}
                     <div className="mt-auto flex justify-center gap-4">
                        <a
                           href={item.link}
                           target="_blank"
                           rel="noreferrer"
                           className="px-4 py-2 rounded-lg
                  bg-gradient-to-r from-indigo-500 to-purple-500
                  text-white text-sm hover:scale-105 transition">
                           GitHub
                        </a>

                        {item.demo && (
                           <a
                              href={item.demo}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 rounded-lg
                    bg-white/10 text-white text-sm
                    hover:bg-white/20 transition">
                              Live Demo
                           </a>
                        )}
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* NAVIGATION */}
         {!isSmall && (
            <>
               <button
                  onClick={() =>
                     setPage((p) => (p - 1 + totalPages) % totalPages)
                  }
                  className="absolute -left-5 top-1/2 -translate-y-1/2
            text-3xl text-white/80 hover:scale-125 transition">
                  <FaArrowAltCircleLeft />
               </button>

               <button
                  onClick={() => setPage((p) => (p + 1) % totalPages)}
                  className="absolute -right-5 top-1/2 -translate-y-1/2
            text-3xl text-white/80 hover:scale-125 transition">
                  <FaArrowAltCircleRight />
               </button>
            </>
         )}
      </div>
   );
};

export default Carousel;
