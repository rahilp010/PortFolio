import Variants from '../Animations/Variants';
import mine from '../assets/mine1.jpg';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'framer-motion'; // Corrected to framer-motion for better compatibility

const About = () => {
   const { isDarkMode } = useDarkMode();

   return (
      <motion.section
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{
            duration: 1.2,
            ease: 'easeOut',
         }}
         viewport={{ once: true }}
         className="relative px-4 sm:px-8 lg:px-20 py-16 overflow-hidden"
         id="about">
         {/* Premium background gradient for depth */}
         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(162,148,249,0.05)] to-transparent pointer-events-none" />

         {/* Enhanced title with subtle glow and better typography */}
         <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className={`font-extrabold text-4xl md:text-5xl ${
               isDarkMode ? 'text-[#D4C6FF]' : 'text-[#A294F9]'
            } text-center underline decoration-wavy underline-offset-8 mb-12 tracking-wide drop-shadow-md`}>
            About Me
         </motion.h2>

         {/* Content container with premium card-like styling */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className={`bg-${
               isDarkMode ? 'gray-900/50' : 'white/50'
            } backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-${
               isDarkMode ? 'gray-700' : '[#A294F9]/20'
            } transition-all duration-300 hover:shadow-xl`}>
            <div className="flex flex-col md:flex-row items-center gap-10">
               {/* Image with animation */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  className="w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                  <img
                     src={mine}
                     alt="Rahil"
                     className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
               </motion.div>

               {/* Text content with animation */}
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                  className="flex-1 text-center md:text-left">
                  <h3
                     className={`font-bold text-3xl mb-4 ${
                        isDarkMode ? 'text-[#D4C6FF]' : 'text-[#A294F9]'
                     }`}>
                     I'm Rahil
                  </h3>
                  <p
                     className={`leading-relaxed ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                     }`}>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Impedit, earum blanditiis tempora quaerat ex at nobis
                     pariatur voluptatibus doloremque expedita amet ipsa maiores
                     architecto odio quo nisi enim reiciendis magni.
                  </p>
               </motion.div>
            </div>
         </motion.div>
      </motion.section>
   );
};

export default About;
