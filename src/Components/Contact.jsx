import { useFormik } from 'formik';
import * as Yup from 'yup';
import contactMe from '../assets/contact-me.png';
const Contact = () => {
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
         action.resetForm();
      },
   });

   return (
      <>
         <div>
            <div
               className="font-bold text-3xl text-[#A294F9] text-center underline mt-24"
               id="contact">
               Contact Me
            </div>

            <div className="blocks grid grid-cols-2 items-center mx-20 border-2 border-[#e5e7eb] shadow-xl my-10">
               <div className="flex justify-center">
                  <img src={contactMe} alt="" className="w-80 h-80" />
               </div>
               <div>
                  <form onSubmit={handleSubmit}>
                     <div className=" mx-auto p-6 bg-gradient-to-r from-[#9eaffd] to-[#d7e8f2]
 shadow-lg">
                        <div className="grid grid-cols-2 gap-4">
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
                                 className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md"
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
                                 className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md placeholder:text-[#8f949c]"
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

                        <div className="grid grid-cols-2 gap-4 mt-4">
                           <div>
                              <label className="block text-sm font-medium">
                                 Mobile No
                              </label>
                              <input
                                 type="text"
                                 name="mobileNo"
                                 autoComplete="off"
                                 placeholder="Mobile No"
                                 value={values.mobileNo}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md"
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
                                 className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md"
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
                              className="w-full mt-1 p-2 bg-white  border border-gray-600 rounded-md"
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
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default Contact;
