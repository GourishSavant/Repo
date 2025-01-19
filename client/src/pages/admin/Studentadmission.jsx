
// import React, { useState } from "react";
// import { FiUpload } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const StudentAdmission = () => {
//   const [formData, setFormData] = useState({
//     admissionNo: "",
//     rollNumber: "",
//     class: "",
//     section: "",
//     firstName: "",
//     lastName: "",
//     gender: "",
//     dateOfBirth: "",
//     category: "",
//     religion: "",
//     caste: "",
//     mobileNumber: "",
//     email: "",
//     admissionDate: new Date().toISOString().split("T")[0],
//     studentPhoto: null,
//     bloodGroup: "",
//     house: "",
//     height: "",
//     weight: "",
//     measurementDate: new Date().toISOString().split("T")[0],
//     routeList: "",
//     pickupPoint: "",
//     feesMonth: "",
//     fatherName: "",
//     fatherPhone: "",
//     fatherOccupation: "",
//     fatherPhoto: null,
//     motherName: "",
//     motherPhone: "",
//     motherOccupation: "",
//     motherPhoto: null,
//     guardianType: "",
//     guardianName: "",
//     guardianRelation: "",
//     guardianPhone: "",
//     guardianOccupation: "",
//     guardianEmail: "",
//     guardianPhoto: null,
//     guardianAddress: "",
//   });

//   const [isSiblingModalOpen, setSiblingModalOpen] = useState(false);
//   const [siblingData, setSiblingData] = useState({ class: "", section: "", student: "" });
//   const [currentStep, setCurrentStep] = useState(1); // Track current step in the form

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files[0],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//   };

//   const handleImportClick = () => {
//     navigate("/admin/import");
//   };

//   const openSiblingModal = () => {
//     setSiblingModalOpen(true);
//   };

//   const closeSiblingModal = () => {
//     setSiblingModalOpen(false);
//   };

//   const handleSiblingChange = (e) => {
//     const { name, value } = e.target;
//     setSiblingData({
//       ...siblingData,
//       [name]: value,
//     });
//   };

//   const handleSiblingSubmit = () => {
//     console.log("Sibling Data:", siblingData);
//     closeSiblingModal();
//   };

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   return (
//     <div className="w-55 p-5 bg-gray-100 bg-white dark:text-white dark:bg-gray-800  shadow-lg rounded-md ml-5 max-h-fit mr-5 mt-5 mb-5 relative ">
//       <div className="flex justify-between items-center mb-6 dark:text-white dark:bg-gray-800">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white  ">Student Admission Form</h2>
//         <button
//           onClick={handleImportClick}
//           className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//         >
//           <FiUpload className="mr-2" size={20} /> Import Student
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6 dark:text-white">
//         {/* Step 1: General Information */}
//         {currentStep === 1 && (
//           <Section title=" ">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6   block font-medium ">
//               <InputField label="Admission No *" name="admissionNo" value={formData.admissionNo} onChange={handleChange} />
//               <InputField label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
//               <SelectField label="Class *" name="class" options={["1", "2", "3"]} value={formData.class} onChange={handleChange} />
//               <SelectField label="Section *" name="section" options={["A", "B", "C"]} value={formData.section} onChange={handleChange} />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
//               <InputField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} />
//               <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
//               <SelectField label="Gender *" name="gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={handleChange} />
//               <InputField label="Date Of Birth *" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
//               <InputField label="Category" name="category" value={formData.category} onChange={handleChange} />
//               <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
//               <InputField label="Caste" name="caste" value={formData.caste} onChange={handleChange} />
//               <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 block font-medium  ">
//               <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
//               <InputField label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} />
//               <FileField label="Student Photo" name="studentPhoto" onChange={handleFileChange} />
//               <div className="flex justify-center mt-6 ">
//                 <button
//                   onClick={openSiblingModal}
//                   className="btn btn-outline text-2xl font-bold"
//                 >
//                   + Add Sibling
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-end mt-6  dark:text-white">
//               <button
//                 onClick={nextStep}
//                 type="button"
//                 className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-700  block font-medium "
//               >
//                 Next
//               </button>
//             </div>
//           </Section>
//         )}

//         {/* Step 2: Transport Details */}
//         {currentStep === 2 && (
//           <Section title="Transport Details ">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium  block font-medium ">
//               <SelectField
//                 label="Route List"
//                 name="routeList"
//                 options={["Route 1", "Route 2", "Route 3"]}
//                 value={formData.routeList}
//                 onChange={handleChange}
//               />
//               <SelectField
//                 label="Pickup Point"
//                 name="pickupPoint"
//                 options={["Stop 1", "Stop 2", "Stop 3"]}
//                 value={formData.pickupPoint}
//                 onChange={handleChange}
//               />
//               <SelectField
//                 label="Fees Month"
//                 name="feesMonth"
//                 options={["January", "February", "March"]}
//                 value={formData.feesMonth}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex justify-between mt-6  block font-medium ">
//               <button
//                 onClick={prevStep}
//                 type="button"
//                 className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 "
//               >
//                 Back
//               </button>
//               <button
//                 onClick={nextStep}
//                 type="button"
//                 className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-700 "
//               >
//                 Next
//               </button>
//             </div>
//           </Section>
//         )}

//         {/* Step 3: Parent/Guardian Details */}
//         {currentStep === 3 && (
//           <Section title="Parent/Guardian Details ">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
//               <InputField label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
//               <InputField label="Father Phone" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} />
//               <InputField label="Father Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
//               <FileField label="Father Photo" name="fatherPhoto" onChange={handleFileChange} />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
//               <InputField label="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} />
//               <InputField label="Mother Phone" name="motherPhone" value={formData.motherPhone} onChange={handleChange} />
//               <InputField label="Mother Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
//               <FileField label="Mother Photo" name="motherPhoto" onChange={handleFileChange} />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
//               <SelectField label="If Guardian Is *" name="guardianType" options={["Father", "Mother", "Other"]} value={formData.guardianType} onChange={handleChange} />
//               <InputField label="Guardian Name *" name="guardianName" value={formData.guardianName} onChange={handleChange} />
//               <InputField label="Guardian Phone *" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} />
//               <InputField label="Guardian Occupation" name="guardianOccupation" value={formData.guardianOccupation} onChange={handleChange} />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
//               <InputField label="Guardian Email" name="guardianEmail" type="email" value={formData.guardianEmail} onChange={handleChange} />
//               <FileField label="Guardian Photo" name="guardianPhoto" onChange={handleFileChange} />
//               <InputField label="Guardian Address" name="guardianAddress" value={formData.guardianAddress} onChange={handleChange} />
//             </div>
//             <div className="flex justify-between mt-6  block font-medium ">
//               <button
//                 onClick={prevStep}
//                 type="button"
//                 className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
//               >
//                 Submit
//               </button>
//             </div>
//           </Section>
//         )}
//       </form>

//       {/* Modal for Sibling */}
//       {isSiblingModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-[40rem]">
//             <h3 className="text-xl font-semibold mb-4">Add Sibling</h3>
//             <div className="space-y-4  block font-medium ">
//               <SelectField
//                 label="Class"
//                 name="class"
//                 options={["1", "2", "3"]}
//                 value={siblingData.class}
//                 onChange={handleSiblingChange}
//               />
//               <SelectField
//                 label="Section"
//                 name="section"
//                 options={["A", "B", "C"]}
//                 value={siblingData.section}
//                 onChange={handleSiblingChange}
//               />
//               <SelectField
//                 label="Student"
//                 name="student"
//                 options={["Student 1", "Student 2", "Student 3"]}
//                 value={siblingData.student}
//                 onChange={handleSiblingChange}
//               />
//             </div>

//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handleSiblingSubmit}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700  block font-medium "
//               >
//                 Add Sibling
//               </button>
//               <button
//                 onClick={closeSiblingModal}
//                 className="bg-red-600 text-white px-6 py-2 rounded-md ml-4 hover:bg-red-700  block font-medium "
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Section component for grouping inputs
// const Section = ({ title, children }) => (
//   <div className="mb-8 dark:bg-gray-800 dark:text-white">
//     <h3 className="font-semibold text-lg mb-4">{title}</h3>
//     {children}
//   </div>
// );

// // Input Field Component
// const InputField = ({ label, name, type = "text", value, onChange }) => (
//   <div>
//     <label className="block text-gray-700 mb-1 dark:text-white">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white  block font-medium "
//     />
//   </div>
// );

// // Select Field Component
// const SelectField = ({ label, name, options, value, onChange }) => (
//   <div>
//     <label className="block text-gray-700 mb-1 dark:text-white  block font-medium ">{label}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white  block font-medium  "
//     >
//       <option value="">Select</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// // File Input Component
// const FileField = ({ label, name, onChange }) => (
//   <div>
//     <label className="block text-gray-700 mb-1 dark:text-white">{label}</label>
//     <input
//       type="file"
//       name={name}
//       onChange={onChange}
//       className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
//     />
//   </div>
// );

// export default StudentAdmission;



import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createStudent, resetStatus } from '../../redux/slices/studentSlice.jsx';
const StudentAdmission = () => {
  const [formData, setFormData] = useState({
    admission_no: "",
    roll_no: "",
    admission_date: new Date().toISOString().split('T')[0],
    firstname: "",
    middlename: "",
    lastname: "",
    rte: true,
    student_photo: null,
    mobileno: "",
    email: "",
    state: null,
    city: null,
    pincode: null,
    religion: "",
    cast: "",
    dob: "",
    gender: "",
    current_address: null,
    permanent_address: null,
    blood_group: null,
    adhar_no: null,
    bank_account_no: null,
    bank_name: null,
    ifsc_code: null,
    guardian_is: "",
    father_name: "",
    father_phone: "",
    father_occupation: "",
    mother_name: "",
    mother_phone: "",
    mother_occupation: "",
    guardian_name: "",
    guardian_relation: null,
    guardian_phone: "",
    guardian_occupation: "",
    guardian_address: "",
    guardian_email: "",
    father_pic: null,
    mother_pic: null,
    guardian_pic: null,
    is_active: true,
    previous_school: null,
    height: null,
    weight: null,
    measurement_date: new Date().toISOString().split("T")[0],
    dis_reason: null,
    note: null,
    samagra_id: null,
    parent_id: null,
    sibling_id: null,
    className: "",
    section: "",
    category_id: null,
    school_house: null,
    fee_groups_feetype_id: null,
    dis_note: null,
    app_key: null,
    parent_app_key: null,
    disable_at: null,
    updated_at: null,
    national_identification_number: null,
    local_identification_number: null,
    guardian_address_is_current_address: 0,
    permanent_address_is_current_address: 0,
    doc1: null,
    doc2: null,
    doc3: null,
    doc4: null
  });
  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector((state) => state.createStudent);
  const [isSiblingModalOpen, setSiblingModalOpen] = useState(false);
  const [siblingData, setSiblingData] = useState({ class: "", section: "", student: "" });
  const [currentStep, setCurrentStep] = useState(1); // Track current step in the form
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      admission_no: formData.admission_no,
      roll_no: formData.roll_no,
      admission_date: formData.admission_date,
      firstname: formData.firstname,
      lastname: formData.lastname,
      gender: formData.gender,
      dob: formData.dob,
      student_photo: formData.student_photo,
      className: formData.className,
      section: formData.section,
      category_id: formData.category_id,
      religion: formData.religion,
      cast: formData.cast,
      mobileno: formData.mobileno,
      email: formData.email,
      guardian_is: formData.guardian_is,
      father_name: formData.father_name,
      father_phone: formData.father_phone,
      father_occupation: formData.father_occupation,
      mother_name: formData.mother_name,
      mother_phone: formData.mother_phone,
      mother_occupation: formData.mother_occupation,
      guardian_name: formData.guardian_name,
      guardian_phone: formData.guardian_phone,
      guardian_occupation: formData.guardian_occupation,
      guardian_address: formData.guardian_address,
      guardian_email: formData.guardian_email,
      father_pic: formData.father_pic,
      mother_pic: formData.mother_pic,
      guardian_pic: formData.guardian_pic,
      rte: true,
      state: null,
      city: null,
      pincode: null,
      current_address: null,
      permanent_address: null,
      blood_group: null,
      adhar_no: null,
      bank_account_no: null,
      bank_name: null,
      ifsc_code: null,
      guardian_relation: null,
      is_active: true,
      previous_school: null,
      height: null,
      weight: null,
      measurement_date: new Date().toISOString().split("T")[0],
      dis_reason: null,
      note: null,
      samagra_id: null,
      parent_id: null,
      sibling_id: null,
      school_house: null,
      fee_groups_feetype_id: null,
      dis_note: null,
      app_key: null,
      parent_app_key: null,
      disable_at: null,
      updated_at: null,
      national_identification_number: null,
      local_identification_number: null,
      guardian_address_is_current_address: 0,
      permanent_address_is_current_address: 0,
      doc1: null,
      doc2: null,
      doc3: null,
      doc4: null,
    };
    dispatch(createStudent(payload));
  };
  const handleImportClick = () => {
    navigate("/admin/import");
  };
  const openSiblingModal = () => {
    setSiblingModalOpen(true);
  };
  const closeSiblingModal = () => {
    setSiblingModalOpen(false);
  };
  const handleSiblingChange = (e) => {
    const { name, value } = e.target;
    setSiblingData({
      ...siblingData,
      [name]: value,
    });
  };
  const handleSiblingSubmit = () => {
    console.log("Sibling Data:", siblingData);
    closeSiblingModal();
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  React.useEffect(() => {
    if (success) {
      alert('Student created successfully!');
      dispatch(resetStatus());
    }
  }, [success, dispatch]);


return (
    <div className="w-55 p-5 bg-gray-100 bg-white dark:text-white dark:bg-gray-800  shadow-lg rounded-md ml-5 max-h-fit mr-5 mt-5 mb-5 relative ">
      <div className="flex justify-between items-center mb-6 dark:text-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white  ">Student Admission Form</h2>
        <button
          onClick={handleImportClick}
          className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          <FiUpload className="mr-2" size={20} /> Import Student
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 dark:text-white">
        {/* Step 1: General Information */}
        {currentStep === 1 && (
          <Section title=" ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6   block font-medium ">
              <InputField label="Admission No *" name="admission_no" value={formData.admission_no} onChange={handleChange} />
              <InputField label="Roll Number" name="roll_no" value={formData.roll_no} onChange={handleChange} />
              <SelectField label="Class *" name="className" options={["class 1", "class 2", "class 3"]} value={formData.className} onChange={handleChange} />
              <SelectField label="Section *" name="section" options={["A", "B", "C"]} value={formData.section} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
              <InputField label="First Name *" name="firstname" value={formData.firstname} onChange={handleChange} />
              <InputField label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
              <SelectField label="Gender *" name="gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={handleChange} />
              <InputField label="Date Of Birth *" name="dob" type="date" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
              <InputField label="Category" name="category_id" value={formData.category_id} onChange={handleChange} />
              <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
              <InputField label="Caste" name="cast" value={formData.cast} onChange={handleChange} />
              <InputField label="Mobile Number" name="mobileno" value={formData.mobileno} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 block font-medium  ">
              <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
              <InputField label="Admission Date" name="admission_date" type="date" value={formData.admission_date} onChange={handleChange} />
              <FileField label="Student Photo" name="student_photo" onChange={handleFileChange} />
              <div className="flex justify-center mt-6 ">
                <button
                  onClick={openSiblingModal}
                  className="btn btn-outline text-2xl font-bold"
                >
                  + Add Sibling
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-6  dark:text-white">
              <button
                onClick={nextStep}
                type="button"
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-700  block font-medium "
              >
                Next
              </button>
            </div>
          </Section>
        )}
        {/* Step 2: Transport Details */}
        {/* {currentStep === 2 && (
          <Section title="Transport Details ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium  block font-medium ">
              <SelectField
                label="Route List"
                name="routeList"
                options={["Route 1", "Route 2", "Route 3"]}
                value={formData.routeList}
                onChange={handleChange}
              />
              <SelectField
                label="Pickup Point"
                name="pickupPoint"
                options={["Stop 1", "Stop 2", "Stop 3"]}
                value={formData.pickupPoint}
                onChange={handleChange}
              />
              <SelectField
                label="Fees Month"
                name="feesMonth"
                options={["January", "February", "March"]}
                value={formData.feesMonth}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between mt-6  block font-medium ">
              <button
                onClick={prevStep}
                type="button"
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 "
              >
                Back
              </button>
              <button
                onClick={nextStep}
                type="button"
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-700 "
              >
                Next
              </button>
            </div>
          </Section>
        )} */}
        {/* Step 3: Parent/Guardian Details */}
        {currentStep === 2 && (
          <Section title="Parent/Guardian Details ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
              <InputField label="Father Name" name="father_name" value={formData.father_name} onChange={handleChange} />
              <InputField label="Father Phone" name="father_phone" value={formData.father_phone} onChange={handleChange} />
              <InputField label="Father Occupation" name="father_occupation" value={formData.father_occupation} onChange={handleChange} />
              <FileField label="Father Photo" name="father_pic" onChange={handleFileChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
              <InputField label="Mother Name" name="mother_name" value={formData.mother_name} onChange={handleChange} />
              <InputField label="Mother Phone" name="mother_phone" value={formData.mother_phone} onChange={handleChange} />
              <InputField label="Mother Occupation" name="mother_occupation" value={formData.mother_occupation} onChange={handleChange} />
              <FileField label="Mother Photo" name="mother_pic" onChange={handleFileChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
              <SelectField label="If Guardian Is *" name="guardian_is" options={["Father", "Mother", "Other"]} value={formData.guardian_is} onChange={handleChange} />
              <InputField label="Guardian Name *" name="guardian_name" value={formData.guardian_name} onChange={handleChange} />
              <InputField label="Guardian Phone *" name="guardian_phone" value={formData.guardian_phone} onChange={handleChange} />
              <InputField label="Guardian Occupation" name="guardian_occupation" value={formData.guardian_occupation} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  block font-medium ">
              <InputField label="Guardian Email" name="guardian_email" type="email" value={formData.guardian_email} onChange={handleChange} />
              <FileField label="Guardian Photo" name="guardian_pic" onChange={handleFileChange} />
              <InputField label="Guardian Address" name="guardian_address" value={formData.guardian_address} onChange={handleChange} />
            </div>
            <div className="flex justify-between mt-6  block font-medium ">
              <button
                onClick={prevStep}
                type="button"
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Submit
              </button>
            </div>
          </Section>
        )}
      </form>
      {/* Modal for Sibling */}
      {isSiblingModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[40rem]">
            <h3 className="text-xl font-semibold mb-4">Add Sibling</h3>
            <div className="space-y-4  block font-medium ">
              <SelectField
                label="Class"
                name="class"
                options={["class 1", "class 2", "class 3"]}
                value={siblingData.class}
                onChange={handleSiblingChange}
              />
              <SelectField
                label="Section"
                name="section"
                options={["A", "B", "C"]}
                value={siblingData.section}
                onChange={handleSiblingChange}
              />
              <SelectField
                label="Student"
                name="student"
                options={["Student 1", "Student 2", "Student 3"]}
                value={siblingData.student}
                onChange={handleSiblingChange}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSiblingSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700  block font-medium "
              >
                Add Sibling
              </button>
              <button
                onClick={closeSiblingModal}
                className="bg-red-600 text-white px-6 py-2 rounded-md ml-4 hover:bg-red-700  block font-medium "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// Section component for grouping inputs
const Section = ({ title, children }) => (
  <div className="mb-8 dark:bg-gray-800 dark:text-white">
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    {children}
  </div>
);
// Input Field Component
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-1 dark:text-white">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white  block font-medium "
    />
  </div>
);
// Select Field Component
const SelectField = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-1 dark:text-white  block font-medium ">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white  block font-medium  "
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
// File Input Component
const FileField = ({ label, name, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-1 dark:text-white">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
    />
  </div>
);
export default StudentAdmission;