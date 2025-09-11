import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select('-password');
    if (!users.length) return res.status(404).json({ error: "No users found" });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "server error" });
  }
}

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    const userData = await userModel.findById(newUser._id).select("-password");

    res.status(201).json({ message: "User created", user: userData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "server error" });
  }
}

export const updateUser = async (req, res) => {
  try {
    const updates = req.body;

  
    const user = await userModel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "server error" });
  }
};