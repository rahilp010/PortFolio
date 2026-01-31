import { useFormik } from 'formik';
import * as Yup from 'yup';
import contactMe from '../assets/contact-me.png';
import { useDarkMode } from './DarkModeContext';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { motion } from 'framer-motion'; // Corrected to framer-motion for better compatibility
import Variants from '../Animations/Variants';

const Contact = () => {
   const { isDarkMode } = useDarkMode();

   const form = useRef();

   const sendEmailData = () => {
      emailjs
         .sendForm('service_4s38iv9', 'template_2v7885e', form.current, {
            publicKey: 'evFGMjV-pRn7X55dU',
         })
         .then(
            () => {
               console.log('SUCCESS!');
            },
            (error) => {
               console.log('FAILED...', error.text);
            },
         );
   };

   const initialValues = {
      firstName: '',
      lastName: '',
      mobileNo: '',
      email: '',
      message: '',
   };

   const validationSchema = Yup.object({
      firstName: Yup.string()
         .min(1)
         .max(25)
         .required('Please enter your First Name'),
      lastName: Yup.string()
         .min(1)
         .max(25)
         .required('Please enter your Last Name'),
      mobileNo: Yup.string()
         .matches(/^\d{10,11}$/, 'Please Enter Valid Number')
         .max(11)
         .required('Please enter your Mobile No'),
      email: Yup.string().email().required('Please enter your Email'),
      message: Yup.string().min(5).required('Please enter your Message'),
   });

   const {
      values,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      touched,
      handleReset,
   } = useFormik({
      initialValues,
      validationSchema: validationSchema,
      onSubmit: (value, action) => {
         console.log(value);
         sendEmailData();
         action.resetForm();
      },
   });

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
         id="contact">
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
            Contact Me
         </motion.h2>

         {/* Form container with premium card-like styling */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-${
               isDarkMode ? 'gray-900/50' : 'white/50'
            } backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-${
               isDarkMode ? 'gray-700' : '[#A294F9]/20'
            } transition-all duration-300 hover:shadow-xl`}>
            {/* Image with animation */}
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
               className="flex justify-center">
               <img
                  src={contactMe}
                  alt="Contact Me"
                  className={`hidden md:block w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg ${
                     isDarkMode
                        ? 'drop-shadow-[0_4px_25px_rgba(0,0,0,1)]'
                        : 'drop-shadow-xl'
                  } transition-transform duration-300 hover:scale-105`}
               />
            </motion.div>

            {/* Form */}
            <motion.form
               ref={form}
               onSubmit={handleSubmit}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
               className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                     <label
                        className={`block text-sm font-medium ${
                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        First name *
                     </label>
                     <input
                        type="text"
                        name="firstName"
                        autoComplete="off"
                        placeholder="First name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A294F9] transition-all duration-300 ${
                           isDarkMode
                              ? 'bg-gray-800 text-white border-gray-600 placeholder:text-gray-500'
                              : 'bg-white text-black border-gray-300 placeholder:text-gray-400'
                        }`}
                     />
                     {errors.firstName && touched.firstName ? (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                           {errors.firstName}
                        </p>
                     ) : null}
                  </div>

                  <div>
                     <label
                        className={`block text-sm font-medium ${
                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Last name *
                     </label>
                     <input
                        type="text"
                        name="lastName"
                        autoComplete="off"
                        placeholder="Last name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A294F9] transition-all duration-300 ${
                           isDarkMode
                              ? 'bg-gray-800 text-white border-gray-600 placeholder:text-gray-500'
                              : 'bg-white text-black border-gray-300 placeholder:text-gray-400'
                        }`}
                     />
                     {errors.lastName && touched.lastName ? (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                           {errors.lastName}
                        </p>
                     ) : null}
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                     <label
                        className={`block text-sm font-medium ${
                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Mobile No *
                     </label>
                     <input
                        type="text"
                        name="mobileNo"
                        autoComplete="off"
                        placeholder="Mobile No"
                        value={values.mobileNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A294F9] transition-all duration-300 ${
                           isDarkMode
                              ? 'bg-gray-800 text-white border-gray-600 placeholder:text-gray-500'
                              : 'bg-white text-black border-gray-300 placeholder:text-gray-400'
                        }`}
                     />
                     {errors.mobileNo && touched.mobileNo ? (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                           {errors.mobileNo}
                        </p>
                     ) : null}
                  </div>

                  <div>
                     <label
                        className={`block text-sm font-medium ${
                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        E-mail *
                     </label>
                     <input
                        type="text"
                        name="email"
                        autoComplete="off"
                        placeholder="E-mail"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A294F9] transition-all duration-300 ${
                           isDarkMode
                              ? 'bg-gray-800 text-white border-gray-600 placeholder:text-gray-500'
                              : 'bg-white text-black border-gray-300 placeholder:text-gray-400'
                        }`}
                     />
                     {errors.email && touched.email ? (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                           {errors.email}
                        </p>
                     ) : null}
                  </div>
               </div>

               <div>
                  <label
                     className={`block text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                     }`}>
                     Message *
                  </label>
                  <textarea
                     name="message"
                     value={values.message}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     placeholder="Message"
                     className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A294F9] transition-all duration-300 h-32 resize-none ${
                        isDarkMode
                           ? 'bg-gray-800 text-white border-gray-600 placeholder:text-gray-500'
                           : 'bg-white text-black border-gray-300 placeholder:text-gray-400'
                     }`}
                  />
                  {errors.message && touched.message ? (
                     <p className="text-red-500 font-semibold text-sm mt-1">
                        {errors.message}
                     </p>
                  ) : null}
               </div>

               <div className="flex justify-end gap-4">
                  <button
                     type="button"
                     onClick={handleReset}
                     className={`py-2 px-6 rounded-lg font-bold transition-all duration-300 ${
                        isDarkMode
                           ? 'bg-red-700 text-white hover:bg-red-800'
                           : 'bg-red-600 text-white hover:bg-red-700'
                     }`}>
                     Clear
                  </button>
                  <button
                     type="submit"
                     className={`py-2 px-6 rounded-lg font-bold transition-all duration-300 ${
                        isDarkMode
                           ? 'bg-blue-700 text-white hover:bg-blue-800'
                           : 'bg-blue-600 text-white hover:bg-blue-700'
                     }`}>
                     Submit
                  </button>
               </div>
            </motion.form>
         </motion.div>
      </motion.section>
   );
};

export default Contact;
