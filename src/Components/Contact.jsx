import { useFormik } from 'formik';
import * as Yup from 'yup';
import contactMe from '../assets/contact-me.png';
import { useDarkMode } from './DarkModeContext';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { motion } from 'motion/react';
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
            }
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
      <motion.div
         initial={{ opacity: 0, rotateX: '70deg' }}
         whileInView={{ opacity: 1, rotateX: 0 }}
         transition={{
            duration: 2,
            type: 'spring',
            stiffness: 100,
            damping: 10,
         }}
         className="px-5">
         <div>
            <div
               className="font-bold text-3xl text-[#A294F9] text-center underline mt-24"
               id="contact">
               Contact Me
            </div>

            <div
               className={`grid grid-cols-1 sm:grid-cols-2 items-center mx-1 sm:mx-20 my-8 sm:my-10 glass-card relative group p-8 rounded-2xl backdrop-blur-lg bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/30 shadow-2xl shadow-black/50
            ${
               isDarkMode
                  ? 'shadow-[0px_4px_25px_rgba(0,0,0,1)] border-[#212121] bg-[#212121]'
                  : 'shadow-xl border-[#eeeff2]'
            }`}>
               <div className="flex justify-center">
                  <img
                     src={contactMe}
                     alt=""
                     className={`w-0 h-0 sm:w-50 sm:h-50 md:w-80 md:h-80 ${
                        isDarkMode
                           ? 'drop-shadow-[0px_4px_25px_rgba(0,0,0,1)]'
                           : 'drop-shadow-xl'
                     }`}
                  />
               </div>

               <div>
                  <form ref={form} onSubmit={handleSubmit}>
                     <div>
                        <div
                           className="p-0 sm:p-6 h-full w-full rounded-md "
                           style={{
                              backgroundImage: `url(${isDarkMode ? '' : ''})`,
                           }}>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                 <label className="block text-sm font-medium  ">
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
                                    className={`w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md placeholder:text-[#8f949c] text-black`}
                                 />
                                 {errors.firstName && touched.firstName ? (
                                    <p className="text-red-700 font-semibold">
                                       {errors.firstName}
                                    </p>
                                 ) : (
                                    ''
                                 )}
                              </div>

                              <div>
                                 <label className="block text-sm font-medium">
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
                                    className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md placeholder:text-[#8f949c] text-black"
                                 />{' '}
                                 {errors.lastName && touched.lastName ? (
                                    <p className="text-red-700 font-semibold">
                                       {errors.lastName}
                                    </p>
                                 ) : (
                                    ''
                                 )}
                              </div>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                              <div>
                                 <label className="block text-sm font-medium">
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
                                    className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md placeholder:text-[#8f949c] text-black"
                                 />
                                 {errors.mobileNo && touched.mobileNo ? (
                                    <p className="text-red-700 font-semibold">
                                       {errors.mobileNo}
                                    </p>
                                 ) : (
                                    ''
                                 )}
                              </div>

                              <div>
                                 <label className="block text-sm font-medium">
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
                                    className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md placeholder:text-[#8f949c] text-black"
                                 />
                                 {errors.email && touched.email ? (
                                    <p className="text-red-700 font-semibold">
                                       {errors.email}
                                    </p>
                                 ) : (
                                    ''
                                 )}
                              </div>
                           </div>

                           <div className="mt-4">
                              <label className="block text-sm font-medium">
                                 Message *
                              </label>
                              <textarea
                                 type="text"
                                 name="message"
                                 value={values.message}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 placeholder="Message"
                                 className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md placeholder:text-[#8f949c] text-black"
                              />
                              {errors.message && touched.message ? (
                                 <p className="text-red-700 font-semibold">
                                    {errors.message}
                                 </p>
                              ) : (
                                 ''
                              )}
                           </div>

                           <div className="mt-6 flex justify-end gap-5">
                              <button
                                 type="button"
                                 onClick={handleReset}
                                 className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 hover:cursor-pointer font-bold">
                                 Clear
                              </button>
                              <button
                                 type="submit"
                                 className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 hover:cursor-pointer font-bold">
                                 Submit
                              </button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default Contact;
