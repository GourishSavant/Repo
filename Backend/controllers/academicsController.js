import * as AcademicsModel from '../models/academicsModel.js';


export const createSection = async (req, res) => {
  try {
    const { section, is_active = 'yes' } = req.body;
    
    if (!section) {
      return res.status(400).json({ success: false, message: 'section is required' });
    }
    
    const section_id = await AcademicsModel.createSection(section, is_active);
    // :white_check_mark: Success Response
    res.status(201).json({
      success: true,
      message: 'section created successfully',
      section_id,
    });
  } catch (error) {
    console.error('section Creation Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create section', error: error.message });
  }
};

export const getAllSections = async (req, res) => {
  try {
      const Classes = await AcademicsModel.getAllSections();

      res.status(200).json({
          success: true,
          message: 'Section retrieved successfully',
          data: Classes
      });
  } catch (error) {
      console.error('Error fetching Section:', error.message);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch Section',
          error: error.message
      });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { section_id } = req.params; // Extract role_id from URL params
    const { section, is_active = 'yes' } = req.body;

    if (!section_id) {
      return res.status(400).json({ error: 'section ID is required' });
    }
    if (!section) {
      return res.status(400).json({ error: 'section is required' });
    }

    const updated = await AcademicsModel.updateSection( section_id, section, is_active);
    if (updated) {
      return res.status(200).json({ success: true, message: 'section updated successfully' });
    } else {
      return res.status(404).json({ error: 'section not found or not updated' });
    }
  } catch (err) {
    console.error('section Update Error:', err);
    res.status(500).json({ error: 'section updation failed', details: err.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const { section_id } = req.body; // Extract role_id from URL params

    if (!section_id) {
      return res.status(400).json({ error: 'section ID is required' });
    }

    const deleted = await AcademicsModel.deleteSectionById(section_id);

    if (deleted) {
      return res.status(200).json({ success: true, message: `section with ID '${section_id}' deleted successfully` });
    } else {
      return res.status(404).json({ error: `section with ID '${section_id}' not found or already deleted` });
    }
  } catch (err) {
    console.error('section Deletion Error:', err);
    res.status(500).json({ error: 'section deletion failed', details: err.message });
  }
};

export const createClass = async (req, res) => {
  try {
    const { className, is_active = 'yes' } = req.body;
    
    if (!className) {
      return res.status(400).json({ success: false, message: 'class name is required' });
    }
    
    const class_id = await AcademicsModel.createClass(className, is_active);
    // :white_check_mark: Success Response
    res.status(201).json({
      success: true,
      message: 'class created successfully',
      class_id,
    });
  } catch (error) {
    console.error('class Creation Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create class', error: error.message });
  }
};

export const getAllClasses = async (req, res) => {
  try {
      const Classes = await AcademicsModel.getAllClasses();

      res.status(200).json({
          success: true,
          message: 'Classes retrieved successfully',
          data: Classes
      });
  } catch (error) {
      console.error('Error fetching Classes:', error.message);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch Classes',
          error: error.message
      });
  }
};