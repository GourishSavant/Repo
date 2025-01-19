import config from '../config.js';

const db = config.db;

// Create a new class in the database
export const createClass = async (className, is_active) => {
    const [result] = await db.execute(
      'INSERT INTO classes (class, is_active) VALUES (?, ?)',
      [className, is_active]
    );
    return result.insertId; // Return the ID of the newly created class
  };
  
  export const getClassById = async (class_id) => {
    try {
      const [rows] = await db.execute('SELECT * FROM classes WHERE class_id = ?', [class_id]);
      return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
    } catch (error) {
      console.error('Database Error (getClassById):', error.message);
      throw error;
    }
  };

    // Get class_id by class
    export const getIdByClassName = async (className) => {
      try {
          const [rows] = await db.execute('SELECT class_id FROM classes WHERE class = ?', [className]);
          return rows.length > 0 ? rows[0].class_id : null; // Return the designation_id or null if not found
      } catch (error) {
          console.error('Database Error: ', error.message);
          throw error;
      }
  };

  export const getAllClasses = async () => {
    try {
      const [rows] = await db.execute('SELECT * FROM classes');
      return rows.length > 0 ? rows : null; // Return the first result or null if not found
    } catch (error) {
      console.error('Database Error (getAllClasses):', error.message);
      throw error;
    }
  };

  // Update Role by id
  export const updateClass = async (class_id, className, is_active) => {
    const [result] = await db.execute(
      'UPDATE classes SET className = ?, is_active = ? WHERE class_id = ?',
      [className, is_active, class_id]
    );
    return result.affectedRows > 0;
  };

  //delete class by class id
  export const deleteClassById = async (class_id) => {
    const [result] = await db.execute('DELETE FROM classes WHERE class_id = ?', [class_id]);
    return result.affectedRows > 0;
  };



// Create a new section in the database
export const createSection = async (section, is_active) => {
  const [result] = await db.execute(
    'INSERT INTO sections (section, is_active) VALUES (?, ?)',
    [section, is_active]
  );
  return result.insertId; // Return the ID of the newly created class
};

  // Get section_id by sections
  export const getIdBysection = async (section) => {
    try {
        const [rows] = await db.execute('SELECT section_id FROM sections WHERE section = ?', [section]);
        return rows.length > 0 ? rows[0].section_id : null; // Return the designation_id or null if not found
    } catch (error) {
        console.error('Database Error: ', error.message);
        throw error;
    }
};

export const getSectionById = async (section_id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM sections WHERE section_id = ?', [section_id]);
    return rows.length > 0 ? rows[0] : null; // Return the first result or null if not found
  } catch (error) {
    console.error('Database Error (getSectionById):', error.message);
    throw error;
  }
};

export const getAllSections = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM sections');
    return rows.length > 0 ? rows : null; // Return the first result or null if not found
  } catch (error) {
    console.error('Database Error (getAllSections):', error.message);
    throw error;
  }
};

export const updateSection = async (section_id, section, is_active) => {
  const [result] = await db.execute(
    'UPDATE sections SET section = ?, is_active = ? WHERE section_id = ?',
    [section, is_active, section_id]
  );
  return result.affectedRows > 0;
};

//delete class by class id
export const deleteSectionById = async (section_id) => {
  const [result] = await db.execute('DELETE FROM sections WHERE section_id = ?', [section_id]);
  return result.affectedRows > 0;
};