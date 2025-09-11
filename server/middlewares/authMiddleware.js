import jwt from "jsonwebtoken";
import customerModel from "../models/customerModel.js";
import userModel from "../models/userModel.js";

export const protect = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      let token;

    
       if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ error: "Not authorized, no token" });
      }

     
      const verified = jwt.verify(token,process.env.SECRET_KEY);

     
      let account;
      if (verified.role === "customer" ) {
        account = await customerModel.findById(verified.id).select("-password");
      } else {
        account = await userModel.findById(verified.id).select("-password");
      }

      if (!account) return res.status(401).json({ error: "Account not found" });

      req.user = { ...verified, data: account };

     
      if (allowedRoles.length && !allowedRoles.includes(verified.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next()
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};
