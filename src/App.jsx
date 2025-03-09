import Header from './Components/Header';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import Profile from './Components/Profile';
import Projects from './Components/Projects';
import About from './Components/About';
import Skills from './Components/Skills';
import Contact from './Components/Contact';

const App = () => {
  
   return (
      <>
         <Header />
         <Profile />
         <About />
         <Skills />
         <Projects />
         <Contact />

         {/* <Routes>
               <Route path="/" element={<Header />} />
               <Route path="/" element={<Profile />} />
               <Route path="/about" element={<About />} />
               <Route path="/projects" element={<Skills />} />
               <Route path="/projects" element={<Projects />} />
               <Route path="/projects" element={<Contact />} />
            </Routes> */}
      </>
   );
};

export default App;
