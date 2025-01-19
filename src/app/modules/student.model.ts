import { model, Schema } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

// Sub-schema for userName
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    maxLength: [20, 'Name can not be more than 20 characters'],
    /* validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: '{VALUE} is not in capitalize format',
    }, */
  },
  //   if (value !== firstNameStr) {
  //     return false;
  //   }
  //   return true;
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required.'],
    /* validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid last name',
    }, */
    /* validate: {
      validator: function (value: string) {
        // Check if lastName starts with the same letter as firstName
        return value.charAt(0) === this.firstName.charAt(0);
      },
      message: '{VALUE} must start with the same letter as first name.',
    }, */
  },
});

// Sub-schema for guardian
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required.'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required.'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required.'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required.'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required.'],
  },
});

// Sub-schema for localGuardian
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local guardian name is required.'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
  },
});

// Main student schema
const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender.',
    },
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group.',
    },
    required: [true, 'Blood group is required.'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian details are required.'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid status.',
    },
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
