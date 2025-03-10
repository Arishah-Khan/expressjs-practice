import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import signupSchema from "../validation/signupSchema.js";
import loginSchema from "../validation/loginSchema.js";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

res.cookie("jwt", token, {
  httpOnly: true,  
  secure: true,    
  sameSite: "strict", 
  maxAge: 7 * 24 * 60 * 60 * 1000, 
});


  return token; 
};

const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, name, email, password, address, country, city } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      country,
      city,
    });

    if (user) {
      const token = generateToken(res, user._id); 
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        address: user.address,
        country: user.country,
        city: user.city,
        token, 
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in Signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(res, user._id); 

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        address: user.address,
        country: user.country,
        city: user.city,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "User logged out" });
};

export { signup, login, logout };
