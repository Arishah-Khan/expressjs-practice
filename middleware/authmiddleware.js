import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // ✅ Token ko cookies se lo

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Token verify karo

    req.user = await User.findById(decoded.userId).select("-password"); // ✅ User ko DB se fetch karo (password exclude karke)

    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export default protect;
