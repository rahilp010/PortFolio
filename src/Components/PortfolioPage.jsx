import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
   ArrowUpRight,
   Code2,
   Database,
   Github,
   Layout,
   Linkedin,
   Mail,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import mine from '../assets/mine.jpg';
import PortfolioEditor from './PortfolioEditor';
import { normalizePortfolioContent } from '../data/portfolioContent';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const Motion = motion;

const iconMap = {
   arrow: ArrowUpRight,
   code: Code2,
   database: Database,
   layout: Layout,
};

const socialIcons = {
   email: Mail,
   github: Github,
   linkedin: Linkedin,
};

const Section = ({ children, className = '', ...props }) => (
   <section
      className={`px-6 py-20 md:px-20 md:py-32 max-w-[1600px] mx-auto ${className}`}
      {...props}>
      {children}
   </section>
);

const AnimatedText = ({ text, className = '' }) => (
   <Motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`font-serif text-stone-900 ${className}`}>
      {text}
   </Motion.h2>
);

function ProjectCard({ project, index }) {
   const isEven = index % 2 === 0;
   const content = (
      <div className="group relative flex h-[300px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-stone-300 bg-[#E5E3DE] p-6 transition-colors duration-700 hover:bg-stone-300 md:h-[400px]">
         <div className="absolute h-64 w-64 rounded-full bg-stone-400/10 blur-3xl transition-all duration-700 group-hover:bg-stone-400/20" />
         <span className="relative z-10 text-center font-['Mrs_Saint_Delafield'] text-8xl font-bold leading-tight text-stone-800 transition-transform duration-700 group-hover:scale-110 md:text-[130px]">
            {project.name}
         </span>
         <span className="absolute bottom-8 text-xs uppercase tracking-[0.2em] text-stone-800">
            View Project
         </span>
      </div>
   );

   return (
      <Motion.div
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: '-100px' }}
         transition={{ duration: 0.8 }}
         className={`relative flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
         <div className="absolute left-4 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#EBE9E4] bg-stone-900 md:left-1/2" />
         <div
            className={`w-full pl-12 md:w-1/2 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
            <span className="mb-2 block text-6xl font-serif font-bold text-stone-300">
               {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mb-2 text-3xl font-bold">{project.title}</h3>
            <p className="mb-4 text-stone-600">{project.tech}</p>
            <p className="leading-relaxed text-stone-500">{project.desc}</p>
         </div>
         <div
            className={`w-full pl-12 md:w-1/2 md:pl-0 ${isEven ? 'md:pl-20' : 'md:pr-20'}`}>
            {project.link ? (
               <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title}`}>
                  {content}
               </a>
            ) : (
               content
            )}
         </div>
      </Motion.div>
   );
}

function SocialLink({ label, url }) {
   const Icon =
      socialIcons[label?.toLowerCase()] || ArrowUpRight;
   return (
      <a
         href={url}
         target="_blank"
         rel="noreferrer"
         aria-label={label}
         className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 transition-all hover:bg-[#EBE9E4] hover:text-stone-900">
         <Icon />
      </a>
   );
}

export default function PortfolioPage() {
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
   });
   const contactRef = useRef(null);
   const workRef = useRef(null);
   const logoClicks = useRef([]);

   const [content, setContent] = useState(() =>
      normalizePortfolioContent(null),
   );
   const [isEditorOpen, setIsEditorOpen] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });
   const [errors, setErrors] = useState({});
   const [submitStatus, setSubmitStatus] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);

   useEffect(() => {
      if (!supabase) return;
      let isMounted = true;
      const loadContent = async () => {
         const { data, error } = await supabase
            .from('portfolio_content')
            .select('content')
            .eq('id', 'main')
            .maybeSingle();
         if (!isMounted) return;
         if (error) {
            console.error('Failed to load portfolio content:', error);
            return;
         }
         if (data?.content) setContent(normalizePortfolioContent(data.content));
      };
      loadContent();
      return () => {
         isMounted = false;
      };
   }, []);

   useEffect(() => {
      const openEditorWithShortcut = (event) => {
         if (
            event.key.toLowerCase() === 'e' &&
            event.shiftKey &&
            (event.ctrlKey || event.metaKey)
         ) {
            event.preventDefault();
            setIsEditorOpen(true);
         }
      };
      window.addEventListener('keydown', openEditorWithShortcut);
      return () => window.removeEventListener('keydown', openEditorWithShortcut);
   }, []);

   const handleLogoClick = () => {
      const now = Date.now();
      logoClicks.current = [...logoClicks.current, now].filter(
         (time) => now - time < 4000,
      );
      if (logoClicks.current.length >= 5) {
         logoClicks.current = [];
         setIsEditorOpen(true);
      }
   };

   const scrollTo = (ref) =>
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((current) => ({ ...current, [name]: value }));
      if (errors[name]) setErrors((current) => ({ ...current, [name]: null }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const nextErrors = {};
      if (!formData.name.trim()) nextErrors.name = 'Name is required';
      if (!formData.email.trim()) {
         nextErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         nextErrors.email = 'Please enter a valid email';
      }
      if (!formData.message.trim()) nextErrors.message = 'Message cannot be empty';
      if (Object.keys(nextErrors).length) {
         setErrors(nextErrors);
         return;
      }

      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
         await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formData,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
         );
         setSubmitStatus('success');
         setFormData({ name: '', email: '', message: '' });
      } catch (error) {
         console.error('EmailJS Error:', error);
         setSubmitStatus('error');
      } finally {
         setIsSubmitting(false);
         setTimeout(() => setSubmitStatus(null), 5000);
      }
   };

   const { profile, expertise, experience, projects, contact } = content;
   const profileImage = profile.imageUrl || mine;

   return (
      <div className="min-h-screen bg-[#EBE9E4] font-sans text-stone-800 selection:bg-stone-300">
         <Motion.div
            className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-stone-900"
            style={{ scaleX }}
         />

         <nav className="fixed top-0 z-40 flex w-full items-center justify-between p-6 text-stone-100 mix-blend-difference">
            <button
               type="button"
               aria-label="Portfolio logo"
               onClick={handleLogoClick}
               className="text-xl font-bold tracking-tighter font-serif">
               PORTFOLIO
            </button>
            <button
               className="rounded-full border border-stone-200 px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-stone-800 hover:text-[#EBE9E4]"
               onClick={() => scrollTo(contactRef)}>
               Let's Talk
            </button>
         </nav>

         <Section className="flex min-h-screen flex-col items-center justify-between md:flex-row">
            <div className="z-20 space-y-8 md:w-1/2">
               <Motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-light tracking-wide md:text-4xl">
                  {profile.greeting}{' '}
                  <span className="font-serif font-semibold leading-[1.2]">
                     <Motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="block">
                        {profile.name}
                     </Motion.span>
                  </span>
               </Motion.p>
               <h1 className="space-y-2 font-serif text-4xl leading-[0.9] md:text-7xl lg:text-[88px]">
                  <Motion.span
                     initial={{ y: 100, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 1 }}
                     className="block">
                     {profile.titleLine1}
                  </Motion.span>
                  <Motion.span
                     initial={{ y: 100, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 1, delay: 0.1 }}
                     className="block italic">
                     {profile.titleLine2}
                  </Motion.span>
               </h1>
               <Motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-md leading-relaxed text-stone-600">
                  {profile.intro}
               </Motion.p>
               <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}>
                  <button
                     className="flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-[#EBE9E4] transition-all hover:gap-4"
                     onClick={() => scrollTo(workRef)}>
                     View Work <ArrowUpRight size={18} />
                  </button>
               </Motion.div>
            </div>
            <Motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.2, ease: 'circOut' }}
               className="relative mt-12 md:mt-0 md:w-1/2">
               <div className="relative z-10 h-[500px] w-full overflow-hidden rounded-[3rem] bg-stone-300 md:h-[700px] md:rounded-b-[3rem] md:rounded-t-[10rem]">
                  <img
                     src={profileImage}
                     alt={`${profile.name} portrait`}
                     className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
               </div>
               <div className="absolute -bottom-10 -left-10 z-0 h-40 w-40 animate-spin-slow rounded-full border border-stone-400" />
            </Motion.div>
         </Section>

         <Section className="rounded-t-[4rem] bg-stone-200">
            <div className="flex flex-col gap-12 md:flex-row">
               <div className="md:w-1/3">
                  <AnimatedText
                     text={expertise.heading}
                     className="mb-6 text-5xl"
                  />
                  <p className="mb-8 text-stone-600">{expertise.intro}</p>
               </div>
               <div className="grid grid-cols-1 gap-8 md:w-2/3 md:grid-cols-2">
                  {expertise.items.map((item, index) => {
                     const Icon = iconMap[item.icon] || Code2;
                     return (
                        <Motion.div
                           key={`${item.title}-${index}`}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 }}
                           viewport={{ once: true }}
                           className="rounded-2xl border border-stone-300 bg-[#EBE9E4] p-8 transition-shadow hover:shadow-xl">
                           <div className="mb-4 flex items-start justify-between">
                              <span className="rounded-full bg-stone-900 p-3 text-white">
                                 <Icon size={20} />
                              </span>
                              <span className="font-serif text-4xl font-bold opacity-20">
                                 {item.level}%
                              </span>
                           </div>
                           <h3 className="mb-2 text-2xl font-bold uppercase tracking-wide">
                              {item.title}
                           </h3>
                           <p className="text-sm text-stone-600">{item.desc}</p>
                        </Motion.div>
                     );
                  })}
               </div>
            </div>
         </Section>

         {experience.items.length > 0 && (
            <Section className="bg-[#EBE9E4]">
               <AnimatedText
                  text={experience.heading}
                  className="mb-16 text-center text-5xl md:text-7xl"
               />
               <div className="mx-auto max-w-4xl space-y-8">
                  {experience.items.map((item, index) => (
                     <Motion.article
                        key={`${item.company}-${item.role}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-stone-300 bg-stone-200 p-6 md:p-8">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                           <div>
                              <h3 className="text-2xl font-bold">{item.role}</h3>
                              <p className="text-lg text-stone-600">
                                 {item.company}
                              </p>
                           </div>
                           <div className="text-sm text-stone-500 sm:text-right">
                              <p>{item.period}</p>
                              <p>{item.location}</p>
                           </div>
                        </div>
                        <p className="mt-4 leading-relaxed text-stone-600">
                           {item.description}
                        </p>
                        {item.link && (
                           <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline">
                              Learn more <ArrowUpRight size={16} />
                           </a>
                        )}
                     </Motion.article>
                  ))}
               </div>
            </Section>
         )}

         <Section ref={workRef}>
            <AnimatedText
               text={projects.heading}
               className="mb-20 text-center text-5xl md:text-7xl"
            />
            <div className="relative">
               <div className="absolute bottom-0 left-4 top-0 w-px bg-stone-400 md:left-1/2" />
               <div className="space-y-20 md:space-y-32">
                  {projects.items.map((project, index) => (
                     <ProjectCard
                        key={`${project.title}-${index}`}
                        project={project}
                        index={index}
                     />
                  ))}
               </div>
            </div>
         </Section>

         <Section
            className="rounded-t-[3rem] bg-stone-400 pb-2 text-[#2d2d2d]"
            ref={contactRef}>
            <AnimatedText
               text={contact.heading}
               className="mb-20 text-center text-4xl md:text-7xl"
            />
            <div className="grid gap-12 md:grid-cols-2" id="contact">
               <div>
                  <AnimatedText
                     text={contact.line1}
                     className="mb-4 text-4xl text-[#EBE9E4] md:text-7xl"
                  />
                  <AnimatedText
                     text={contact.line2}
                     className="mb-4 text-4xl text-[#EBE9E4] md:text-7xl"
                  />
                  <AnimatedText
                     text={contact.line3}
                     className="text-4xl italic text-[#EBE9E4] md:text-7xl"
                  />
                  <div className="mt-12 space-y-6 text-black">
                     <p className="text-xl">{contact.location}</p>
                     <a className="text-xl hover:underline" href={`mailto:${contact.email}`}>
                        {contact.email}
                     </a>
                     <div className="mt-8 flex gap-4">
                        {contact.socialLinks.map((item, index) => (
                           <SocialLink
                              key={`${item.label}-${index}`}
                              label={item.label}
                              url={item.url}
                           />
                        ))}
                     </div>
                  </div>
               </div>
               <form
                  className="mt-12 space-y-8 md:mt-0"
                  onSubmit={handleSubmit}
                  noValidate>
                  {[
                     { name: 'name', label: 'Your Name', placeholder: 'John Doe' },
                     {
                        name: 'email',
                        label: 'Your Email',
                        placeholder: 'john@example.com',
                        type: 'email',
                     },
                  ].map((field) => (
                     <div
                        key={field.name}
                        className="relative border-b border-stone-700 pb-4">
                        <label className="mb-2 block text-sm uppercase tracking-widest text-stone-700">
                           {field.label}
                        </label>
                        <input
                           type={field.type || 'text'}
                           name={field.name}
                           value={formData[field.name]}
                           onChange={handleInputChange}
                           className={`w-full bg-transparent text-2xl outline-none placeholder-stone-600 ${errors[field.name] ? 'border-red-500 text-red-900' : ''}`}
                           placeholder={field.placeholder}
                        />
                        {errors[field.name] && (
                           <span className="absolute -bottom-6 left-0 text-sm text-red-800">
                              {errors[field.name]}
                           </span>
                        )}
                     </div>
                  ))}
                  <div className="relative mt-8 border-b border-stone-700 pb-4">
                     <label className="mb-2 block text-sm uppercase tracking-widest text-stone-700">
                        Message
                     </label>
                     <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full resize-none bg-transparent text-2xl outline-none placeholder-stone-600 ${errors.message ? 'border-red-500 text-red-900' : ''}`}
                        placeholder="Tell me about your project..."
                     />
                     {errors.message && (
                        <span className="absolute -bottom-6 left-0 text-sm text-red-800">
                           {errors.message}
                        </span>
                     )}
                  </div>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="mt-8 w-full rounded-full bg-[#EBE9E4] py-6 text-xl font-bold text-stone-900 transition-colors hover:bg-stone-300 disabled:opacity-50">
                     {isSubmitting
                        ? 'Sending...'
                        : submitStatus === 'success'
                          ? 'Message Sent!'
                          : submitStatus === 'error'
                            ? 'Could Not Send'
                            : 'Send Message'}
                  </button>
               </form>
            </div>
         </Section>

         {isEditorOpen && (
            <PortfolioEditor
               content={content}
               onClose={() => setIsEditorOpen(false)}
               onSaved={setContent}
            />
         )}
         {!isSupabaseConfigured && (
            <span className="sr-only">
               The hidden portfolio editor requires Supabase configuration.
            </span>
         )}
      </div>
   );
}
