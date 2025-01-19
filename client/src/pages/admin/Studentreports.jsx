
import React, { useState ,useEffect} from 'react';
import 'tailwindcss/tailwind.css';
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaCopy,
  FaPrint,
  FaEye,
  FaColumns,
} from "react-icons/fa";

const StudentInformationReport = () => {
  const [selectedReport, setSelectedReport] = useState('Student Report');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedClassSection, setSelectedClassSection] = useState('');
  const handleClassSectionChange = (event) => {
    setSelectedClassSection(event.target.value);
    // You can add code here to filter or fetch gender data based on the selected class/section
  }; const classSectionOptions = [
    'Class 8 (Section A)',
    'Class 1 (Section B)',
    'Class 5 (Section C)',
  ];

  const [recordsPerPage, setRecordsPerPage] = useState(10); // State for records per page
  const [criteria, setCriteria] = useState({
    class: '',
    section: '',
    gender: '',
    rte: '',
  });
  const classData = [
    { class: "Class 8", students: "20" },
    { class: "Class 9", students: "25" },
  ];


  useEffect(() => {
    // Simulating API call
    setClassOptions(['Class 1', 'Class 2', 'Class 3']);
    setSectionOptions(['A', 'B', 'C']);
  }, []);
  const studentData = {
    "Class 8": [
      {
        admissionNo: "11",
        studentName: "Gourish",
        classSection: "Class 8 (Section B)",
        fatherName: "Richard",
        dob: "12/17/2024",
        gender: "Male",
        mobile: "01234567890",
      },
      {
        admissionNo: "17",
        studentName: "Aman",
        classSection: "Class 8 (Section B)",
        fatherName: "Yash",
        dob: "12/18/2024",
        gender: "Male",
        mobile: "09876543210",
      },
    ],
    "Class 9": [
      {
        admissionNo: "21",
        studentName: "Sara",
        classSection: "Class 9 (Section A)",
        fatherName: "Michael",
        dob: "03/25/2024",
        gender: "Female",
        mobile: "09876543212",
      },
    ],
  };
  const handleViewStudents = (className) => {
    setSelectedClass(selectedClass === className ? null : className);
  };

  const [data, setData] = useState([]);

  const allData = [
    {
      section: 'A',
      admissionNo: '123',
      studentName: 'John Doe',
      fatherName: 'Richard Doe',
      dob: '2005-08-15',
      gender: 'Male',
      mobile: '1234567890',
      localId: 'LOC123',
      nationalId: 'NAT123',
      rte: 'Yes',
    },
    {
      section: 'B',
      admissionNo: '124',
      studentName: 'Jane Smith',
      fatherName: 'Robert Smith',
      dob: '2006-05-20',
      gender: 'Female',
      mobile: '9876543210',
      localId: 'LOC124',
      nationalId: 'NAT124',
      rte: 'No',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10; // Number of rows per page
const totalPages = Math.ceil(data.length / itemsPerPage);
const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
const handlePageChange = (direction) => {
  if (direction === 'next' && currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  } else if (direction === 'prev' && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  const handleSearch = () => {
    const filteredData = allData.filter((item) => {
      return (
        (criteria.class ? item.class === criteria.class : true) &&
        (criteria.section ? item.section === criteria.section : true) &&
        (criteria.gender ? item.gender === criteria.gender : true) &&
        (criteria.rte ? item.rte === criteria.rte : true)
      );
    });
    setData(filteredData);
  };
  const handleClearFilters = () => {
    setCriteria({
      class: "",
      section: "",
      gender: "",
      rte: "",
    });
    setData(allData); // Reset data to all data
  };
  const genderReportData = [
    {
      classSection: "Class 8 (Section A)",
      totalBoys: 3,
      totalGirls: 0,
      totalStudents: 3,
      ratio: "1:0"
    },
    {
      classSection: "Class 1 (Section B)",
      totalBoys: 2,
      totalGirls: 0,
      totalStudents: 2,
      ratio: "1:0"
    },
    {
      classSection: "Class 5 (Section C)",
      totalBoys: 5,
      totalGirls: 0,
      totalStudents: 5,
      ratio: "1:0"
    }
  ];
  

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'Student Report':
        const displayedData = data.slice(0, recordsPerPage); // Paginate data

        return (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label htmlFor="class" className="block text-gray-700 mb-2">Class</label>
                <select
                  id="class"
                  name="class"
                  value={criteria.class}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Class 8">Class 8</option>
                </select>
              </div>

              <div>
                <label htmlFor="section" className="block text-gray-700 mb-2">Section</label>
                <select
                  id="section"
                  name="section"
                  value={criteria.section}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>

              <div>
                <label htmlFor="gender" className="block text-gray-700 mb-2">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={criteria.gender}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="rte" className="block text-gray-700 mb-2">RTE</label>
                <select
                  id="rte"
                  name="rte"
                  value={criteria.rte}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>
            <h2 className="text-xl mt-6 font-semibold mb-4">Student Report</h2>

            <div className="flex items-center mb-4 justify-between">
              
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 w-1/2 rounded-md border focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mr-4">
                <label htmlFor="recordsPerPage" className="mr-2 text-gray-700"></label>
                <select
                  id="recordsPerPage"
                  className="p-2 rounded-md border focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              
              <div className="flex space-x-3">
                <FaFilePdf className="cursor-pointer text-red-600" size={24} />
                <FaFileWord className="cursor-pointer text-blue-600" size={24} />
                <FaFileExcel className="cursor-pointer text-green-600" size={24} />
                <FaCopy className="cursor-pointer text-gray-600" size={24} />
                <FaPrint className="cursor-pointer text-black" size={24} />
              </div>
              </div>
            </div>

            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Section</th>
                  <th className="border border-gray-300 px-4 py-2">Admission No</th>
                  <th className="border border-gray-300 px-4 py-2">Student Name</th>
                  <th className="border border-gray-300 px-4 py-2">Father Name</th>
                  <th className="border border-gray-300 px-4 py-2">Date Of Birth</th>
                  <th className="border border-gray-300 px-4 py-2">Gender</th>
                  <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
                  <th className="border border-gray-300 px-4 py-2">Local ID</th>
                  <th className="border border-gray-300 px-4 py-2">National ID</th>
                  <th className="border border-gray-300 px-4 py-2">RTE</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{item.section}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.admissionNo}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.studentName}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.fatherName}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.dob}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.mobile}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.localId}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.nationalId}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.rte}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-4 text-gray-500">No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
        case 'Class & Section Report':
        return (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Class & Section Report</h2>

            {/* Search input for Class & Section Report */}
            <div className="flex items-center mb-4 justify-between">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 w-1/2 rounded-md border focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-3">
                <FaFilePdf className="cursor-pointer text-red-600" size={24} />
                <FaFileWord className="cursor-pointer text-blue-600" size={24} />
                <FaFileExcel className="cursor-pointer text-green-600" size={24} />
                <FaCopy className="cursor-pointer text-gray-600" size={24} />
                <FaPrint className="cursor-pointer text-gray-600" size={24} />
                <FaColumns className="cursor-pointer text-black" size={24} />
              </div>
            </div>

            {/* Class & Section Report Table */}
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">S.No.</th>
                  <th className="border border-gray-300 px-4 py-2">Class</th>
                  <th className="border border-gray-300 px-4 py-2">Students</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { class: 'Class 8', students: '20', action: 'View' },
                  { class: 'Class 9', students: '25', action: 'View' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.class}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.students}</td>
                    <td className="border border-gray-300 px-4 py-2">
                    <button
                  onClick={() => handleViewStudents(item.class)}
                  className="flex items-center justify-center w-full text-blue-500 hover:text-blue-700"
                >
                  <FaEye className="inline-block text-lg" />
                </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

      {/* Student List Table */}
      {isModalOpen && (
                <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Student List for {selectedClass}
          </h2>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Admission No</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Class</th>
                <th className="border border-gray-300 px-4 py-2">Father Name</th>
                <th className="border border-gray-300 px-4 py-2">DOB</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {studentData[selectedClass]?.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.admissionNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.studentName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.classSection}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.fatherName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{student.dob}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.gender}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.mobile}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      )}
          </div>
        );


    case 'Guardian Report':
      return (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="class" className="block text-gray-700 mb-2">Class *</label>
              <select
                id="class"
                name="class"
                value={criteria.class}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
              </select>
            </div>

            <div>
              <label htmlFor="section" className="block text-gray-700 mb-2">Section *</label>
              <select
                id="section"
                name="section"
                value={criteria.section}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>

          <h2 className="text-xl mt-6 font-semibold mb-4">Guardian Report</h2>
          <div className="flex items-center mb-4 justify-between">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-1/2 rounded-md border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Class (Section)</th>
                <th className="border border-gray-300 px-4 py-2">Admission No</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
                <th className="border border-gray-300 px-4 py-2">Guardian Name</th>
                <th className="border border-gray-300 px-4 py-2">Guardian Relation</th>
                <th className="border border-gray-300 px-4 py-2">Guardian Phone</th>
                <th className="border border-gray-300 px-4 py-2">Father Name</th>
                <th className="border border-gray-300 px-4 py-2">Father Phone</th>
                <th className="border border-gray-300 px-4 py-2">Mother Name</th>
                <th className="border border-gray-300 px-4 py-2">Mother Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.classSection}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.admissionNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.studentName}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.mobile}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.guardianName}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.guardianRelation}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.guardianPhone}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.fatherName}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.fatherPhone}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.motherName}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.motherPhone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-4 text-gray-500">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
      case 'Student History':
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="class" className="block text-gray-700 mb-2">Class</label>
          <select
            id="class"
            name="class"
            value={criteria.class}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
          </select>
        </div>

        <div>
          <label htmlFor="admissionYear" className="block text-gray-700 mb-2">Admission Year</label>
          <select
            id="admissionYear"
            name="admissionYear"
            value={criteria.admissionYear}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Clear Filters
        </button>
      </div>

      <h2 className="text-xl mt-6 font-semibold mb-4">Student History</h2>

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Admission No</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Admission Date</th>
            <th className="border border-gray-300 px-4 py-2">Class (Start - End)</th>
            <th className="border border-gray-300 px-4 py-2">Session (Start - End)</th>
            <th className="border border-gray-300 px-4 py-2">Years</th>
            <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
            <th className="border border-gray-300 px-4 py-2">Guardian Name</th>
            <th className="border border-gray-300 px-4 py-2">Guardian Phone</th>
          </tr>
        </thead>
        <tbody>
        {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{item.admissionNo}</td>
                <td className="border border-gray-300 px-4 py-2">{item.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.admissionDate}</td>
                <td className="border border-gray-300 px-4 py-2">{item.classStartEnd}</td>
                <td className="border border-gray-300 px-4 py-2">{item.sessionStartEnd}</td>
                <td className="border border-gray-300 px-4 py-2">{item.years}</td>
                <td className="border border-gray-300 px-4 py-2">{item.mobile}</td>
                <td className="border border-gray-300 px-4 py-2">{item.guardianName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.guardianPhone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>
       {/* Pagination */}
       <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>

        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
  case 'Student Login Credential':
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="class" className="block text-gray-700 mb-2">Class</label>
          <select
            id="class"
            name="class"
            value={criteria.class}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
          </select>
        </div>

        <div>
          <label htmlFor="section" className="block text-gray-700 mb-2">Section</label>
          <select
            id="section"
            name="section"
            value={criteria.section}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Clear Filters
        </button>
      </div>

      {/* Report Table */}
      <h2 className="text-xl mt-6 font-semibold mb-4">Student Login Credential Report</h2>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Admission No</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Password</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{item.admissionNo}</td>
                <td className="border border-gray-300 px-4 py-2">{item.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.username}</td>
                <td className="border border-gray-300 px-4 py-2">{item.password}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>

        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
  case 'Parent Login Credential':
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="class" className="block text-gray-700 mb-2">Class</label>
          <select
            id="class"
            name="class"
            value={criteria.class}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
          </select>
        </div>

        <div>
          <label htmlFor="section" className="block text-gray-700 mb-2">Section</label>
          <select
            id="section"
            name="section"
            value={criteria.section}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Clear Filters
        </button>
      </div>

      {/* Report Table */}
      <h2 className="text-xl mt-6 font-semibold mb-4">Parent Login Credential Report</h2>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Admission No</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Parent Username</th>
            <th className="border border-gray-300 px-4 py-2">Parent Password</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{item.admissionNo}</td>
                <td className="border border-gray-300 px-4 py-2">{item.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.parentUsername}</td>
                <td className="border border-gray-300 px-4 py-2">{item.parentPassword}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>

        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );


  case 'Class Subject Report':
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
  
        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="class" className="block text-gray-700 mb-2">Class</label>
            <select
              id="class"
              name="class"
              value={criteria.class}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="section" className="block text-gray-700 mb-2">Section</label>
            <select
              id="section"
              name="section"
              value={criteria.section}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>
  
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded ml-2 hover:bg-blue-600"
          >
            Search
          </button>
        </div>
  
        {/* Report Table */}
        <h2 className="text-xl mt-6 font-semibold mb-4">Class Subject Report</h2>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Class</th>
              <th className="border border-gray-300 px-4 py-2">Section</th>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Teacher</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Room No.</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.class}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.section}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.teacher}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.time}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.roomNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
  
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
  
          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
  
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    );
    case 'Admission Report':
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="searchType" className="block text-gray-700 mb-2">Search Type</label>
          <select
            id="searchType"
            name="searchType"
            value={criteria.searchType}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="By Class">By Class</option>
            <option value="By Date">By Date</option>
            <option value="By Gender">By Gender</option>
          </select>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Report Table */}
      <h2 className="text-xl mt-6 font-semibold mb-4">Admission Report</h2>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Admission No</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Class</th>
            <th className="border border-gray-300 px-4 py-2">Father Name</th>
            <th className="border border-gray-300 px-4 py-2">Date Of Birth</th>
            <th className="border border-gray-300 px-4 py-2">Admission Date</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{item.admissionNo}</td>
                <td className="border border-gray-300 px-4 py-2">{item.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.class}</td>
                <td className="border border-gray-300 px-4 py-2">{item.fatherName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.dateOfBirth}</td>
                <td className="border border-gray-300 px-4 py-2">{item.admissionDate}</td>
                <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{item.mobileNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>

        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
  case 'Sibling Report':
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
  
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="class" className="block text-gray-700 mb-2">Class</label>
            <select
              id="class"
              name="class"
              value={criteria.class}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="section" className="block text-gray-700 mb-2">Section</label>
            <select
              id="section"
              name="section"
              value={criteria.section}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>
  
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded ml-2 hover:bg-blue-600"
          >
            Search
          </button>
        </div>
  
        {/* Report Table */}
        <h2 className="text-xl mt-6 font-semibold mb-4">Sibling Report</h2>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Father Name</th>
              <th className="border border-gray-300 px-4 py-2">Mother Name</th>
              <th className="border border-gray-300 px-4 py-2">Guardian Name</th>
              <th className="border border-gray-300 px-4 py-2">Guardian Phone</th>
              <th className="border border-gray-300 px-4 py-2">Student Name (Sibling)</th>
              <th className="border border-gray-300 px-4 py-2">Class</th>
              <th className="border border-gray-300 px-4 py-2">Admission Date</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.fatherName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.motherName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.guardianName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.guardianPhone}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.studentNameSibling}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.class}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.admissionDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
  
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
  
          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
  
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    );
    
    case 'Student Profile':
      return (
        <div className="bg-white p-4 rounded shadow overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
    
          {/* Filters */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="admissionDate" className="block text-gray-700 mb-2">Search By Admission Date</label>
              <select
                id="admissionDate"
                name="admissionDate"
                value={criteria.admissionDate}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                {/* Add dynamic options */}
              </select>
            </div>
    
            <div>
              <label htmlFor="class" className="block text-gray-700 mb-2">Class <span className="text-red-500">*</span></label>
              <select
                id="class"
                name="class"
                value={criteria.class}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                {classOptions.map((classOption) => (
                  <option key={classOption} value={classOption}>{classOption}</option>
                ))}
              </select>
            </div>
    
            <div>
              <label htmlFor="section" className="block text-gray-700 mb-2">Section <span className="text-red-500">*</span></label>
              <select
                id="section"
                name="section"
                value={criteria.section}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                {sectionOptions.map((sectionOption) => (
                  <option key={sectionOption} value={sectionOption}>{sectionOption}</option>
                ))}
              </select>
            </div>
          </div>
    
          {/* Table */}
          <h2 className="text-xl mt-6 font-semibold mb-4">Student Profile</h2>
    
          {/* Wrapper for the table with only horizontal scroll */}
          <div className="overflow-x-auto bg-white shadow-md rounded-md">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {/* Table headers */}
                  {[
                    'Admission No', 'Roll No.', 'First Name', 'Middle Name', 'Last Name', 'Gender *', 'Date of Birth *', 'Category',
                    'Religion', 'Caste', 'Mobile No.', 'Email', 'Admission Date', 'Blood Group', 'House', 'Height', 'Measurement Date',
                    'Father Name', 'Father Phone', 'Father Occupation', 'Mother Name', 'Mother Phone', 'Mother Occupation',
                    'Guardian Is *', 'Guardian Name *', 'Guardian Relation', 'Guardian Email', 'Guardian Phone *', 'Guardian Occupation',
                    'Guardian Address', 'Current Address', 'Permanent Address', 'Bank Account No', 'Bank Name', 'IFSC Code',
                    'National Identification No', 'Local Identification No', 'RTE', 'Previous School Details', 'Note'
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentData.length > 0 ? (
                  studentData.map((student, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{student.admissionNo}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{student.rollNo}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{student.firstName}</td>
                      {/* Add other fields as necessary */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={40} className="text-center py-4 text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Previous
            </button>
    
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
    
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Next
            </button>
          </div>
        </div>
      );
    
      case 'Student Gender Ratio Report':
        return (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Student Gender Ratio Report</h2>
      
            {/* Search Filter */}
            <div className="mb-6">
              <label htmlFor="classSection" className="block text-gray-700 mb-2">Class (Section)</label>
              <select
                id="classSection"
                name="classSection"
                value={selectedClassSection}
                onChange={handleClassSectionChange}
                className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Class (Section)</option>
                {classSectionOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
      
            {/* Table */}
            <h3 className="text-lg font-semibold mb-4">Gender Ratio Report</h3>
            <div className="overflow-x-auto bg-white shadow-md rounded-md">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Class (Section)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total Boys</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total Girls</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total Students</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Boys - Girls Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {genderReportData.length > 0 ? (
                    genderReportData.map((report, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{report.classSection}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{report.totalBoys}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{report.totalGirls}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{report.totalStudents}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{report.ratio}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      
  
      // Other case conditions for other reports...
      default:
        return <div>Select a report to display its content.</div>;
    }
    
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Student Information Report</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Reports</h2>

        <div className="flex flex-wrap gap-4">
          {[
          
              'Student Report',
              'Class & Section Report',
              'Guardian Report',
              'Student History',
              'Student Login Credential',
              'Parent Login Credential',
              'Class Subject Report',
              'Admission Report',
              'Sibling Report',
              'Student Profile',
              'Student Gender Ratio Report',
              'Student Teacher Ratio Report',
              'Online Admission Report',
  
          ].map((report) => (
            <button
              key={report}
              onClick={() => setSelectedReport(report)}
              className={`px-4 py-2 rounded border ${
                selectedReport === report
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {report}
            </button>
          ))}
        </div>
      </div>

      {renderReportContent()}
    </div>
  );
};

export default StudentInformationReport;
