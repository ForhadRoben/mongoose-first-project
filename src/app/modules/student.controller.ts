import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body; //destructure (req.body.student) name alias

    const { error, value } = studentValidationSchema.validate(studentData);
    console.log({ error }, { value });
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    }

    const result = await StudentServices.createStudentIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'student create successfully',
      data: result,
    });
  } catch (err) {
    // console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'get all students',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'get student successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
