import User from '../models/UserSchema.js';
import { Doctor } from '../models/DoctorSchema.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
  return Jwt.sign({ id: user._id, role: user.role }, '7e5ZgeApNxu+kl7BuC49bmbz4yjufpcHjh5+Tq0kbLIiXJU94LStKdiLMPrKl4AWcN5JMN3MBM2QV4eK84SeiMjyCYblp1t5ofuunmspzrbVeLLp65ZNjghBXn00tuBCox1gAhpZM8wpARoEIMXVtfiHwnGcsp1+/5CLfza/sor4osvdfVUFz2ZJN+B7KWtmsJrGB7ahW5Y40cM13kGvD7T6x7FO8KyVOJ7NJbtkNzFsu7bu0NDzWORhxjzye/IKTY7yhNHUzKRFaUrPSOfl3zSTaGFY+IO0EqUtUi61Z5ATnn9KysXxyd2ApvrF5c832CjF6uF7fuplTqsIfMi/GQ==', {
    expiresIn: '15d',
  });
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let existingUser = null;

    if (role === 'patient') {
      existingUser = await User.findOne({ email });
    } else if (role === 'doctor') {
      existingUser = await Doctor.findOne({ email });
    }

    // check if user exists
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let newUser;

    if (role === 'patient') {
      newUser = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === 'doctor') {
      newUser = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await newUser.save();

    res.status(200).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error, try again' });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    // check if user exists or not
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: 'Invalid credentials' });
    }

    // get token
    const token = generateToken(user)

    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({ status: true, message: 'Successful login', token, data: { ...rest }, role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Failed to login' });
  }
};
