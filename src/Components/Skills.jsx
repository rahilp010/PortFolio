const Skills = () => {
   const skills = [
      { name: 'html5', progress: 90 },
      { name: 'css3-alt', progress: 85 },
      { name: 'js', progress: 80 },
      { name: 'react', progress: 70 },
      { name: 'figma', progress: 65 },
      { name: 'dribbble', progress: 55 },
      { name: 'git-alt', progress: 75 },
      { name: 'github', progress: 75 },
      { name: 'jenkins', progress: 60 },
   ];

   const data = [
      { name: 'Responsive Web Design', skills: skills.slice(0, 4) },
      {
         name: 'UI/UX Design',
         skills: skills.filter((skill) =>
            ['css3-alt', 'figma', 'dribbble'].includes(skill.name)
         ),
      },
      {
         name: 'Native Apps',
         skills: skills.filter((skill) => ['js', 'react'].includes(skill.name)),
      },
      {
         name: 'CI/CD',
         skills: skills.filter((skill) =>
            ['git-alt', 'github', 'jenkins'].includes(skill.name)
         ),
      },
   ];

   return (
      <>
         <p
            className="font-bold text-3xl text-[#A294F9] text-center underline mt-10"
            id="skills">
            Skills
         </p>
         <div className="mx-22 my-16 blocks">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-10">
               {data.map((data, index) => (
                  <div key={index} className="p-5 border-2 border-[#e5e7eb] shadow-lg rounded-lg">
                     <p className="font-bold text-xl mb-7 text-[#493D9E]">
                        {data.name}
                     </p>
                     <div className="flex flex-wrap gap-10 items-center">
                        {data.skills.map((skill, index) => (
                           <div
                              key={index}
                              className="flex flex-col items-center">
                              <i
                                 className={`fa-brands fa-${skill.name} text-4xl`}
                                 style={{ color: getColor(skill.name) }}></i>
                              <progress
                                 value={skill.progress}
                                 max={100}
                                 className="w-20 h-2 mt-2 rounded-lg bg-gray-300 [&::-webkit-progress-bar]:bg-gray-300 [&::-webkit-progress-value]:bg-[#A294F9]"></progress>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};

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

export default Skills;
