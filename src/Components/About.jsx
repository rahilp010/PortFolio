import mine from '../assets/mine1.jpg';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'motion/react';

const About = () => {
   const { isDarkMode } = useDarkMode();

   return (
      <motion.div
         className="mx-auto py-14 md:px-30 lg:px-10 bg-[#101010]"
         initial={{ opacity: 0, translateX: '100%' }}
         whileInView={{ opacity: 1, translateX: 0 }}
         transition={{
            duration: 2,
            type: 'spring',
            stiffness: 100,
            damping: 10,
         }}>
         <p
            className="font-bold text-3xl text-[#A294F9] text-center underline mb-10"
            id="about">
            About Me
         </p>

         <div
            className={`mx-20 py-0 sm:py-5 sm:px-5 md:p-7 my-18 bg-black/40 backdrop-blur-2xl rounded-4xl shadow-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 
            ${
               isDarkMode
                  ? 'shadow-[0px_4px_25px_rgba(0,0,0,1)] '
                  : 'shadow-2xl bg-white'
            }`}>
            <div className="flex flex-col md:flex-row items-center gap-10 ">
               <div className="w-60 h-60 md:w-80 md:h-80 min-w-60 min-h-60 md:min-w-80 md:min-h-80 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                     src={mine}
                     alt="Mine"
                     className="h-full w-full rounded-4xl object-cover shadow-lg"
                  />
               </div>
               <div className="flex-1 text-center md:text-left">
                  <p className="font-bold text-2xl mb-4">I'm Rahil</p>
                  <p className="text-gray-400 leading-relaxed">
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Impedit, earum blanditiis tempora quaerat ex at nobis
                     pariatur voluptatibus doloremque expedita amet ipsa maiores
                     architecto odio quo nisi enim reiciendis magni.
                  </p>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default About;
