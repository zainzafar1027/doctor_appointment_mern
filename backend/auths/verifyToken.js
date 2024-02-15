import jwt from "jsonwebtoken";
import { Doctor } from '../models/DoctorSchema.js';
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;

  console.log(req.headers.authorization)
  
  // check if token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    // console.log("No token found");
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });

  }

  try {
    const token = authToken.split("Bearer ")[1].trim(); // Updated line

    const jwtSecretKey =
      "7e5ZgeApNxu+kl7BuC49bmbz4yjufpcHjh5+Tq0kbLIiXJU94LStKdiLMPrKl4AWcN5JMN3MBM2QV4eK84SeiMjyCYblp1t5ofuunmspzrbVeLLp65ZNjghBXn00tuBCox1gAhpZM8wpARoEIMXVtfiHwnGcsp1+/5CLfza/sor4osvdfVUFz2ZJN+B7KWtmsJrGB7ahW5Y40cM13kGvD7T6x7FO8KyVOJ7NJbtkNzFsu7bu0NDzWORhxjzye/IKTY7yhNHUzKRFaUrPSOfl3zSTaGFY+IO0EqUtUi61Z5ATnn9KysXxyd2ApvrF5c832CjF6uF7fuplTqsIfMi/GQ=="; // Replace with your actual secret key

    // verify token
    const decoded = jwt.verify(token, jwtSecretKey);

    console.log("Decoded token:", decoded);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    console.error("Authentication error:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  next();
};

