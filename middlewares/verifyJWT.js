import jwt from "jsonwebtoken";
import User from "../models/userModel";
import Restaurant from "../models/restaurantModel";

/**
 * @desc   Verify JWT
 * @param {async} handler Async function with req and res
 * @param {string} accountType User or Restaurant
 */
const verifyJwt = (handler, accountType) => {
  return async (req, res) => {
    const authHeaders = req.headers.authorization || req.headers.authorization;

    if (!authHeaders?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Get token from headers
    const token = authHeaders.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      let targetRecord;
      if (accountType === "User") {
        targetRecord = await User.findById(decoded.id).exec();
      } else if (accountType === "Restaurant") {
        targetRecord = await Restaurant.findById(decoded.id).exec();
      } else {
        return res.status(400).json({
          message: "Invalid account type. Could not verify access token",
        });
      }

      if (!targetRecord) {
        return res.status(403).json({
          message: "Unauthenticated",
        });
      }

      req.id = targetRecord.id;

      return handler(req, res);
    } catch (error) {
      return res.status(403).json({
        message: "Token expired",
      });
    }
  };
};

export default verifyJwt;
