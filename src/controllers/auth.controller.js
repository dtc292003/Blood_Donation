import ApiError from "../../api-error";
import AuthServices from "../services/auth.service";
import { isValidEmail, isValidPhone } from "../utils/validators";

exports.register = async (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email || !req.body.phonenumber || !req.body.cccd) {
    return next(new ApiError(400, "Not enough required fields"));
  }

  if (!/^\d{12}$/.test(req.body.cccd)) {
    return res.status(400).json({ errcode: 1, message: "CCCD must be exactly 12 digits" });
  }

  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ errcode: 1, message: "Invalid email format" });
  }

  if (!isValidPhone(req.body.phonenumber)) {
    return res.status(400).json({ errcode: 1, message: "Invalid phone number format" });
  }

  if (req.body.password.length < 6) {
    return res.status(400).json({ errcode: 1, message: "Password must be at least 6 characters" });
  }

  try {
    const existEmail = await AuthServices.findByEmail(req.body.email);
    if (existEmail.length > 0) {
      return res.status(400).json({ errcode: 1, message: "Email already exists" });
    }

    const existUsername = await AuthServices.findByUsername(req.body.username);
    if (existUsername.length > 0) {
      return res.status(400).json({ errcode: 1, message: "Username already exists" });
    }

    const existCccd = await AuthServices.findByCccd(req.body.cccd);
    if (existCccd.length > 0) {
      return res.status(400).json({ errcode: 1, message: "CCCD already registered" });
    }

    const result = await AuthServices.register(req.body);
    const newUserId = result.insertId;

    const roleName = "Donor";
    const roles = await AuthServices.findRoleByName(roleName);

    if (roles.length === 0) {
      return res.status(400).json({ errcode: 1, message: `Role '${roleName}' does not exist` });
    }

    await AuthServices.assignRole(newUserId, roles[0].ROLEID);

    res.status(200).json({
      errcode: 0,
      message: "Register success",
      data: { userId: newUserId, role: roleName },
    });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Register fail", error });
  }
};

exports.login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new ApiError(400, "Email and password are require"));
  }

  try {
    const users = await AuthServices.findByEmail(req.body.email);
    if (users.length === 0) {
      return res.status(404).json({ errcode: 1, message: "Email not found" });
    }

    const user = users[0];

    const isMatch = AuthServices.comparePassword(req.body.password, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ errcode: 1, message: "Wrong password" });
    }

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ errcode: 1, message: "Login fail", error: err });
      }

      req.session.userId = user.USERID;
      req.session.email = user.EMAIL;

      delete user.PASSWORD;

      res.status(200).json({ errcode: 0, message: "Login success", data: { user } });
    });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Login fail", error });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const users = await AuthServices.getUserById(req.session.userId);
    if (users.length === 0) {
      return res.status(404).json({ errcode: 1, message: "User not found" });
    }
    const user = users[0];
    delete user.PASSWORD;
    res.status(200).json({ errcode: 0, message: "Get success", data: user });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.changePassword = async (req, res, next) => {
  if (!req.body.oldPassword || !req.body.newPassword) {
    return next(new ApiError(400, "Not enough required fields"));
  }

  if (req.body.newPassword.length < 6) {
    return res.status(400).json({ errcode: 1, message: "New password must be at least 6 characters" });
  }

  try {
    const users = await AuthServices.getUserById(req.session.userId);
    if (users.length === 0) {
      return res.status(404).json({ errcode: 1, message: "User not found" });
    }

    const user = users[0];
    const isMatch = AuthServices.comparePassword(req.body.oldPassword, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ errcode: 1, message: "Old password is incorrect" });
    }

    await AuthServices.updatePassword(req.session.userId, req.body.newPassword);
    res.status(200).json({ errcode: 0, message: "Change password success" });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Change password fail", error });
  }
};

exports.logout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ errcode: 1, message: "Logout fail" });
    }
    res.clearCookie("blood_donation_sid");
    res.status(200).json({ errcode: 0, message: "Logout success" });
  });
};

module.exports = exports;