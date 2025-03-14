import mine from '../assets/mine1.jpg';
import { useDarkMode } from './DarkModeContext';

const About = () => {

   const { isDarkMode } = useDarkMode();
   
   return (
      <div className="max-w-5xl mx-auto px-6 py-14 md:px-30 lg:px-10">
         <p
            className="font-bold text-3xl text-[#A294F9] text-center underline mb-10"
            id="about">
            About Me
         </p>

         <div className={`px-0 py-0 sm:py-5 sm:px-5 rounded-xl mt-18 blocks
            ${isDarkMode ? 'shadow-[0px_4px_25px_rgba(0,0,0,1)] ' : 'shadow-2xl bg-white'}`}>
            <div className="flex flex-col md:flex-row items-center gap-10 ">
               <div className="w-60 h-60 md:w-80 md:h-80 min-w-60 min-h-60 md:min-w-80 md:min-h-80 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                     src={mine}
                     alt="Mine"
                     className="w-full h-full object-cover shadow-lg"
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
      </div>
   );
};

export default About;
