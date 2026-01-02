import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  // console.log("Auth Header:", req.headers.authorization);

  // console.log("RAW AUTH HEADER >>>", JSON.stringify(req.headers.authorization));


  if (token && token.startsWith("Bearer ")) {
    try {
      // console.log("TOKEN STRING:", token.split(" ")[1]);

      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Fetch full user (remove password)
      req.user = await User.findById(decoded.id).select("-password");
      // console.log("Decoded Token:", decoded);
      next();



    } catch (error) {
      console.error("JWT ERROR:", error.message);
      return res.status(401).json({
        message: "Not authorized",
        error: error.message
      });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
