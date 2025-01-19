import express from 'express';
import {createStudent, getAllStudents,userLogout, getStudentCredentialsByStudentId, userLogin, getStudentByFilter,
    getStudentByClassAndSection
} from '../controllers/studentController.js'

const router = express.Router();

router.post('/createStudent', createStudent);

router.get('/getAllStudents', getAllStudents);

router.get('/getStudentCredentialsByStudentId', getStudentCredentialsByStudentId);

router.post('/userLogin', userLogin);

router.get('/userLogout', userLogout);

router.get('/getStudentByFilter', getStudentByFilter);

router.get('/getStudentByClassAndSection', getStudentByClassAndSection);

export default router;