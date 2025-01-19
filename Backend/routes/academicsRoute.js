import express from 'express';
import {createClass, getAllClasses, createSection, getAllSections, updateSection, deleteSection} from '../controllers/academicsController.js';

const router = express.Router();

router.post('/createClass', createClass);

router.get('/getAllClasses', getAllClasses);

router.post('/createSection', createSection);

router.get('/getAllSections', getAllSections);

router.put('/updateSection/:section_id', updateSection);

router.delete('/deleteSection', deleteSection);

export default router;