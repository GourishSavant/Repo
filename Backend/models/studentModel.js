import config from '../config.js';
const db = config.db;

// Create a new sibling in the database
export const createSibling = async (class_id, section_id, student_id) => {
    const [result] = await db.execute(
      'INSERT INTO siblings (class_id, section_id, student_id) VALUES (?, ?, ?)',
      [class_id, section_id, student_id]
    );
    return result.insertId; // Return the ID of the newly created class
};

//fetch sibling by id
export const getSiblingById = async (sibling_id) => {
    try {
        const query = `
        SELECT 
            sib.*, 
            c.class, 
            sec.section, 
            s.*
        FROM 
            siblings sib
        LEFT JOIN classes c ON sib.class_id = c.class_id
        LEFT JOIN sections sec ON sib.section_id = sec.section_id
        LEFT JOIN students s ON sib.student_id = s.student_id
        WHERE sib.sibling_id = ?;
        `;
        const [rows] = await db.execute(query, [sibling_id]);
        return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
    } catch (error) {
        console.error('Database Error (getSiblingById):', error.message); // Updated error log message
        throw error;
    }
};


//create student
export const createStudent = async (
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

) => {
    try {
        const query = `
        INSERT INTO students (
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
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.execute(query, [
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
        ]);
        return { success: true, insertId: result.insertId };
    } catch (error) {
        console.error('Error creating student:', error);
        return { success: false, error: error.message };
    }
};

//fetch all students
export const getAllStudents = async () => {
    try {
        const query = `
            SELECT 
                s.*, 
                sib.student_id AS sibling_student_id,  
                c.class, 
                sec.section, 
                cat.category, 
                sh.house_name, 
                fgt.*
            FROM 
                students s
            LEFT JOIN siblings sib ON s.sibling_id = sib.sibling_id
            LEFT JOIN classes c ON s.class_id = c.class_id
            LEFT JOIN sections sec ON s.section_id = sec.section_id
            LEFT JOIN categories cat ON s.category_id = cat.category_id
            LEFT JOIN school_houses sh ON s.school_house_id = sh.school_house_id
            LEFT JOIN fee_groups_feetype fgt ON s.fee_groups_feetype_id = fgt.fee_groups_feetype_id;
        `;

        const [rows] = await db.execute(query);
        return rows.length > 0 ? rows : null; // Return rows or null if empty
    } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

//fetch student by student_id
export const getStudentByStudentId = async (student_id) => {
    try {

    const query = `
            SELECT 
                s.*, 
                sib.student_id AS sibling_student_id, 
                c.class, 
                sec.section, 
                cat.category, 
                sh.house_name, 
                fgt.*
            FROM 
                students s
            LEFT JOIN siblings sib ON s.sibling_id = sib.sibling_id
            LEFT JOIN classes c ON s.class_id = c.class_id
            LEFT JOIN sections sec ON s.section_id = sec.section_id
            LEFT JOIN categories cat ON s.category_id = cat.category_id
            LEFT JOIN school_houses sh ON s.school_house_id = sh.school_house_id
            LEFT JOIN fee_groups_feetype fgt ON s.fee_groups_feetype_id = fgt.fee_groups_feetype_id
            WHERE 
                s.student_id = ?;
            `;
    
    const [rows] = await db.execute(query, [student_id]);
    return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
    } catch (error) {
    console.error('Database Error: ', error.message);
    throw error;
    }
};

//fetching staff by id
export const getStudentByAdmissionNo = async (admission_no) => {
    try {

        const query = `
                SELECT 
                s.*, 
                sib.student_id AS sibling_student_id, 
                c.class, 
                sec.section, 
                cat.category, 
                sh.house_name, 
                fgt.*
            FROM 
                students s
            LEFT JOIN siblings sib ON s.sibling_id = sib.sibling_id
            LEFT JOIN classes c ON s.class_id = c.class_id
            LEFT JOIN sections sec ON s.section_id = sec.section_id
            LEFT JOIN categories cat ON s.category_id = cat.category_id
            LEFT JOIN school_houses sh ON s.school_house_id = sh.school_house_id
            LEFT JOIN fee_groups_feetype fgt ON s.fee_groups_feetype_id = fgt.fee_groups_feetype_id
            WHERE 
                s.admission_no = ?;
                `;

        const [rows] = await db.execute(query, [admission_no]);
        return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
    } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

//fetching staff by name
export const getStudentByName = async (name) => {
    try {

        const query = `
                SELECT 
                s.*, 
                sib.student_id AS sibling_student_id,  
                c.class, 
                sec.section, 
                cat.category, 
                sh.house_name, 
                fgt.*
            FROM 
                students s
            LEFT JOIN siblings sib ON s.sibling_id = sib.sibling_id
            LEFT JOIN classes c ON s.class_id = c.class_id
            LEFT JOIN sections sec ON s.section_id = sec.section_id
            LEFT JOIN categories cat ON s.category_id = cat.category_id
            LEFT JOIN school_houses sh ON s.school_house_id = sh.school_house_id
            LEFT JOIN fee_groups_feetype fgt ON s.fee_groups_feetype_id = fgt.fee_groups_feetype_id
            WHERE 
                    s.firstname = ? OR s.lastname = ?;
                `;

        const [rows] = await db.execute( query, [name, name]);
        return rows.length > 0 ? rows : null; // Return all matching rows or null if none found
    } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

//fetch student by email
export const getStudentByEmail = async (email) => {
    try{
        const query = `
                SELECT 
                s.*, 
                sib.student_id AS sibling_student_id, 
                c.class, 
                sec.section, 
                cat.category, 
                sh.house_name, 
                fgt.*
            FROM 
                students s
            LEFT JOIN siblings sib ON s.sibling_id = sib.sibling_id
            LEFT JOIN classes c ON s.class_id = c.class_id
            LEFT JOIN sections sec ON s.section_id = sec.section_id
            LEFT JOIN categories cat ON s.category_id = cat.category_id
            LEFT JOIN school_houses sh ON s.school_house_id = sh.school_house_id
            LEFT JOIN fee_groups_feetype fgt ON s.fee_groups_feetype_id = fgt.fee_groups_feetype_id
            WHERE 
                    s.email = ?;
                `;

        const [rows] = await db.execute( query, [email]);
        return rows[0];
    }catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

//fetching student by classID
export const getStudentByclassID = async (class_id) => {
    try {

        const query = `
                SELECT 
                s.*, 
                sib.student_id AS sibling_student_id, 
                c.class, 
                sec.section, 
                cat.category, 
                sh.house_name, 
                fgt.*
            FROM 
                students s
            LEFT JOIN siblings sib ON s.sibling_id = sib.sibling_id
            LEFT JOIN classes c ON s.class_id = c.class_id
            LEFT JOIN sections sec ON s.section_id = sec.section_id
            LEFT JOIN categories cat ON s.category_id = cat.category_id
            LEFT JOIN school_houses sh ON s.school_house_id = sh.school_house_id
            LEFT JOIN fee_groups_feetype fgt ON s.fee_groups_feetype_id = fgt.fee_groups_feetype_id
            WHERE 
                    s.class_id = ?;
                `;

        const [rows] = await db.execute( query, [class_id]);
        return rows.length > 0 ? rows : null; // Return all matching rows or null if none found
    } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

//fetching student by classID and sectionID
export const getStudentByclassIdAnsSectionId = async (class_id, section_id) => {
    try {

        const query = `
                SELECT 
                s.*, 
                sib.student_id AS sibling_student_id, 
                c.class, 
                sec.section, 
                cat.category, 
                sh.house_name, 
                fgt.*
            FROM 
                students s
            LEFT JOIN siblings sib ON s.sibling_id = sib.sibling_id
            LEFT JOIN classes c ON s.class_id = c.class_id
            LEFT JOIN sections sec ON s.section_id = sec.section_id
            LEFT JOIN categories cat ON s.category_id = cat.category_id
            LEFT JOIN school_houses sh ON s.school_house_id = sh.school_house_id
            LEFT JOIN fee_groups_feetype fgt ON s.fee_groups_feetype_id = fgt.fee_groups_feetype_id
            WHERE 
                    s.class_id = ? AND s.section_id = ?;
                `;

        const [rows] = await db.execute( query, [class_id, section_id]);
        return rows.length > 0 ? rows : null; // Return all matching rows or null if none found
    } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

// Update Staff Details in Database
export const updateStudentDetails = async (
    student_id, admission_no, roll_no, admission_date, firstname, middlename, lastname, rte, student_photo, 
    mobileno, email, state, city, pincode, religion, cast, dob, gender, current_address, 
    permanent_address, blood_group, adhar_no, bank_account_no, bank_name, ifsc_code, guardian_is, 
    father_name, father_phone, father_occupation, mother_name, mother_phone, mother_occupation, 
    guardian_name, guardian_relation, guardian_phone, guardian_occupation, guardian_address, 
    guardian_email, father_pic, mother_pic, guardian_pic, is_active, previous_school, height, 
    weight, measurement_date, dis_reason, note, samagra_id, parent_id, sibling_id, 
    class_id, section_id, category_id, school_house_id, 
    fee_groups_feetype_id, dis_note, app_key, parent_app_key, disable_at, updated_at, national_identification_number, 
    local_identification_number, guardian_address_is_current_address, permanent_address_is_current_address, doc1, doc2, doc3, doc4
    ) => {
    try {
        const query = `
        UPDATE students SET
            admission_no = ?, roll_no = ?, admission_date = ?, firstname = ?, middlename = ?, lastname = ?, rte = ?, student_photo = ?, 
            mobileno = ?, email = ?, state = ?, city = ?, pincode = ?, religion = ?, cast = ?, dob = ?, gender = ?, current_address = ?, 
            permanent_address = ?, blood_group = ?, adhar_no = ?, bank_account_no = ?, bank_name = ?, ifsc_code = ?, guardian_is = ?, 
            father_name = ?, father_phone = ?, father_occupation = ?, mother_name = ?, mother_phone = ?, mother_occupation = ?, 
            guardian_name = ?, guardian_relation = ?, guardian_phone = ?, guardian_occupation = ?, guardian_address = ?, 
            guardian_email = ?, father_pic = ?, mother_pic = ?, guardian_pic = ?, is_active = ?, previous_school = ?, height = ?, 
            weight = ?, measurement_date = ?, dis_reason = ?, note = ?, samagra_id = ?, parent_id = ?, sibling_id = ?, 
            class_id = ?, section_id = ?, category_id = ?, school_house_id = ?, 
            fee_groups_feetype_id = ?, dis_note = ?, app_key = ?, parent_app_key = ?, disable_at = ?, updated_at = ?, national_identification_number = ?, 
            local_identification_number = ?, guardian_address_is_current_address = ?, permanent_address_is_current_address = ?, doc1 = ?, doc2 = ?, doc3 = ?, doc4 = ?
            WHERE student_id = ?`;
        const [result] = await db.execute(query, [
            admission_no, roll_no, admission_date, firstname, middlename, lastname, rte, student_photo, 
            mobileno, email, state, city, pincode, religion, cast, dob, gender, current_address, 
            permanent_address, blood_group, adhar_no, bank_account_no, bank_name, ifsc_code, guardian_is, 
            father_name, father_phone, father_occupation, mother_name, mother_phone, mother_occupation, 
            guardian_name, guardian_relation, guardian_phone, guardian_occupation, guardian_address, 
            guardian_email, father_pic, mother_pic, guardian_pic, is_active, previous_school, height, 
            weight, measurement_date, dis_reason, note, samagra_id, parent_id, sibling_id, 
            class_id, section_id, category_id, school_house_id, 
            fee_groups_feetype_id, dis_note, app_key, parent_app_key, disable_at, updated_at, national_identification_number, 
            local_identification_number, guardian_address_is_current_address, permanent_address_is_current_address, doc1, doc2, doc3, doc4, student_id
        ]);
        return result.affectedRows > 0; // Return true if rows were updated
    } catch (error) {
        console.error('Error updating student:', error);
        throw error; // Throw error to be handled by the calling function
    }
};

// Delete student by id
export const deleteStaff = async (student_id) => {
    try {
        const [result] = await db.execute('DELETE FROM students WHERE student_id = ?', [student_id]);
        return result.affectedRows > 0; // Return true if rows were affected, otherwise false
    } catch (error) {
        console.error('Database Error:', error.message);
        throw error;
    }
};

// add students_credentials to the student database
export const addStudentCredentials = async (std_username, std_password, parent_username, parent_password, student_id) => {
    const [result] = await db.execute('INSERT INTO students_credentials (std_username, std_password, parent_username, parent_password, student_id) VALUES (?, ?, ?, ?, ?)', [std_username, std_password, parent_username, parent_password, student_id]);
    return result.insertId; // Return the ID of the newly created role
};

// get students_credentials by Students_credential_id from database
export const getStudentCredentialsById = async (Students_credential_id) => {
    const [rows] = await db.execute('SELECT * FROM students_credentials WHERE Students_credential_id = ?', [Students_credential_id]);
    return rows.length > 0 ? rows[0] : null; // Return the ID of the newly created role
};

// get students_credentials by student_id from database
export const getStudentCredentialsByStudentId = async (student_id) => {
    const [rows] = await db.execute('SELECT * FROM students_credentials WHERE student_id = ?', [student_id]);
    return rows.length > 0 ? rows[0] : null; // Return the ID of the newly created role
};

// get students_credentials by Students_credential_id from database
export const getStudentCredentialsByUsername = async (std_username) => {
    const [rows] = await db.execute('SELECT * FROM students_credentials WHERE std_username = ?', [std_username]);
    return rows.length > 0 ? rows[0] : null; // Return the ID of the newly created role
};

// Create school_houses in the database
export const createSchoolHouses = async (house_name, description, is_active) => {
    const [result] = await db.execute('INSERT INTO school_houses (house_name, description, is_active) VALUES (?, ?, ?)', [house_name, description, is_active]);
    return result.insertId; // Return the ID of the newly created role
};

// Get school_house_id by house_name
export const getIdByHouseName = async (house_name) => {
    try {
        const [rows] = await db.execute('SELECT school_house_id FROM school_houses WHERE house_name = ?', [house_name]);
        return rows.length > 0 ? rows[0].school_house_id : null; // Return the designation_id or null if not found
    } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

// Get school_houses by house_name
export const getAllSchoolHouses = async () => {
    try {
    const [rows] = await db.execute('SELECT * FROM school_houses');
    return rows.length > 0 ? rows : null; // Return the first result or null if not found
    } catch (error) {
    console.error('Database Error (getAllSchoolHouses):', error.message);
    throw error;
    }
};