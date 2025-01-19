import * as AcademicsModel from '../models/academicsModel.js';
import * as StudentsModel from '../models/studentModel.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = config.jwtSecret;


export const userLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log("req.body", req.body);
  // Validate Input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  try {
    let number = null;
    if (username.toLowerCase().includes("std" || "parent")) {
      // Extract digits using a regular expression
      const digits = username.match(/\d+/);
      number = digits ? parseInt(digits[0], 10) : null;
      if (!number) {
        return res.status(400).json({ error: 'Invalid username.' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid username.' });
    }
    // Fetch student details by ID
    const student = await StudentsModel.getStudentByStudentId(number);
    if (!student) {
      return res.status(404).json({ error: `No student found..` });
    }
    // Fetch student credentials
    const stdCredential = await StudentsModel.getStudentCredentialsByUsername(username);
    if (!stdCredential) {
      return res.status(404).json({ error: `No credentials found for username: ${username}.` });
    }
    // Validate password
    const isPasswordValid = password === stdCredential.std_password;
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }
    // Generate Access and Refresh Tokens
    const accessToken = jwt.sign(
      { student_id: student.student_id, email: student.email },
      jwtSecret,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { student_id: student.student_id, email: student.email },
      jwtSecret,
      { expiresIn: '7d' }
    );
    // Set Refresh Token in Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // Return success response
    return res.status(200).json({
      message: 'Login successful!',
      accessToken,
      refreshToken,
      student: {
        student_id: student.student_id,
        email: student.email,
        admission_no: student.admission_no,
        firstname: student.firstname,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({
      error: 'An unexpected error occurred during login. Please try again later.',
      details: error.message,
    });
  }
};





//logout
export const userLogout = async (req, res) => {
  try{
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    });
    res.status(200).json({ message: 'Logout successful'});
  }
  catch (error) {
    res.status(500).json({ error: 'Logout failed', details: error.message });
  }
};

// Function to generate a random password of length 6
const generatePassword = () => {
    return crypto.randomBytes(3).toString('hex'); // Generates a 6-character random password
};

// Function to generate student and parent usernames and passwords
const generateStudentCredentials = async (studentId) => {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }
  
      // Generate usernames
      const studentUsername = `std${studentId}`;
      const parentUsername = `parent${studentId}`;
  
      // Generate passwords
      const studentPassword = generatePassword();
      const parentPassword = generatePassword();
  
      // Save credentials
      const response = await StudentsModel.addStudentCredentials(
        studentUsername,
        studentPassword,
        parentUsername,
        parentPassword,
        studentId
      );
  
      if (response) {
        return {
          success: true,
          message: "Student credentials created successfully",
          studentUsername,
          studentPassword,
          parentUsername,
          parentPassword,
        };
      } else {
        throw new Error("Failed to save credentials");
      }
    } catch (error) {
      console.error("Error generating credentials:", error.message);
      throw error;
    }
  };
  
  
  
  export const createStudent = async (req, res) => {
    try {
        const { admission_no, roll_no = null, admission_date, firstname, middlename = null, lastname = null, rte, student_photo,
            mobileno, email, state = null, city = null, pincode = null, religion, cast, dob, gender, current_address,
            permanent_address, blood_group, adhar_no = null, bank_account_no, bank_name, ifsc_code, guardian_is,
            father_name, father_phone, father_occupation, mother_name, mother_phone, mother_occupation,
            guardian_name, guardian_relation, guardian_phone, guardian_occupation, guardian_address,
            guardian_email, father_pic, mother_pic, guardian_pic, is_active = 'yes', previous_school, height,
            weight, measurement_date, dis_reason = null, note, samagra_id = null, parent_id = null, sibling_id,
            className, section, category_id = null, school_house,
            fee_groups_feetype_id = null, dis_note = null, app_key = null, parent_app_key = null, disable_at = null, updated_at = null, national_identification_number = null,
            local_identification_number = null, guardian_address_is_current_address = 0, permanent_address_is_current_address = 0, doc1, doc2, doc3, doc4
            } = req.body;
            console.log("body", req.body);
        if (!admission_no || !className || !section || !email  || !dob || !firstname || !gender || !guardian_is || !guardian_name || !guardian_phone) {
            return res.status(400).json({ error: 'admission_no, class, section, email, gender, firstname, guardian_is, guardian_name,guardian_phone and date of birth fields are required and should not be null' });
        }
            // Check if admission_no already exists
        const existingAdmissionNo = await StudentsModel.getStudentByAdmissionNo(admission_no);
        if (existingAdmissionNo) {
        return res.status(400).json({ error: 'Student already exists' });
        }
        // Check if email already exists
        const existingEmail = await StudentsModel.getStudentByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Fetch class ID, section ID, and school_house ID
        const class_id = await AcademicsModel.getIdByClassName(className);
        if (!class_id) {
        return res.status(400).json({ error: 'Invalid class' });
        }
        const section_id = await AcademicsModel.getIdBysection(section);
        if (!section_id) {
        return res.status(400).json({ error: 'Invalid section' });
        }
        let school_house_id = null;
        if(school_house){
           school_house_id = await StudentsModel.getIdByHouseName(school_house);
        if (!school_house_id) {
        return res.status(400).json({ error: 'Invalid school_house' });
        }
        }
        // Create role in the database
        const student = await StudentsModel.createStudent(
            admission_no, roll_no, admission_date, firstname, middlename, lastname, rte, student_photo,
            mobileno, email, state, city, pincode, religion, cast, dob, gender, current_address,
            permanent_address, blood_group, adhar_no, bank_account_no, bank_name, ifsc_code, guardian_is,
            father_name, father_phone, father_occupation, mother_name, mother_phone, mother_occupation,
            guardian_name, guardian_relation, guardian_phone, guardian_occupation, guardian_address,
            guardian_email, father_pic, mother_pic, guardian_pic, is_active, previous_school, height,
            weight, measurement_date, dis_reason, note, samagra_id, parent_id, sibling_id,
            class_id, section_id, category_id, school_house_id,
            fee_groups_feetype_id, dis_note, app_key, parent_app_key, disable_at, updated_at, national_identification_number,
            local_identification_number, guardian_address_is_current_address, permanent_address_is_current_address, doc1, doc2, doc3, doc4
            );
    // Generate student credentials
    const studentId = student.insertId;
    const std = await generateStudentCredentials(studentId);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
      credentials: std,
    });
  } catch (error) {
    console.error("Student Creation Error:", error);
    res.status(500).json({ error: "Student creation failed", details: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
      const student = await StudentsModel.getAllStudents();
      if (student) {
          return res.json(student); // Return user data as JSON response
      } else {
          return res.status(404).json({ error: 'student not found' });
      }
  } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({error: 'Error fetching student', details: error.message});
  }
};

export const getStudentCredentialsByStudentId = async (req, res) => {
  try {
    const { student_id } = req.body;

      const student = await StudentsModel.getStudentCredentialsByStudentId(student_id);
      if (student) {
          return res.json(student); // Return user data as JSON response
      } else {
          return res.status(404).json({ error: 'Student Credentials not found' });
      }
  } catch (error) {
      console.error('Error fetching Student Credentials:', error);
      res.status(500).json({error: 'Error fetching Student Credentials', details: error.message});
  }
};

export const getStudentByFilter = async (req, res) => {
    try {
      const { keyword } = req.body;
      
      if (!keyword || keyword === '') {
        return res.status(400).json({ error: 'Keyword is required' });
      }
      let student = null;
      // Check if the keyword matches a student email
      student = await StudentsModel.getStudentByEmail(keyword);
      if (student) {
        return res.json({ success: true, student });
      }
      // Check if the keyword matches a name (first or last)
      student = await StudentsModel.getStudentByName(keyword);
      if (student) {
        return res.json({ success: true, student });
      }
      // Check if the keyword matches student AdmissionNo 
      student = await StudentsModel.getStudentByAdmissionNo(keyword);
      if (student) {
        return res.json({ success: true, student });
      }

      // If no match is found
      return res.status(404).json({ error: 'student not found' });
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ error: 'An error occurred while fetching student', details: error.message });
    }
  };

  export const getStudentByClassAndSection = async (req, res) => {
    try {
      const { class_id, section_id } = req.body;

      let student = null;
      
      if (!class_id && !section_id ) {
        return res.status(400).json({ error: 'class is required' });
      }
      else if(class_id && !section_id){

        student = await StudentsModel.getStudentByclassID(class_id);
        if (student) {
          return res.json({ success: true, student });
        }

      }
      else if(class_id && section_id){

        student = await StudentsModel.getStudentByclassIdAnsSectionId(class_id, section_id);
        if (student) {
          return res.json({ success: true, student });
        }
        
      }

      // If no match is found
      return res.status(404).json({ error: 'student not found' });
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ error: 'An error occurred while fetching student', details: error.message });
    }
  };

  