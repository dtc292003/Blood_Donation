import ApiError from "../../api-error";
import UserRoleServices from "../services/userRole.service";

exports.getAll = async (req, res, next) => {
  try {
    const result = await UserRoleServices.getAll();
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

// Xem role của 1 user cụ thể
exports.getRolesByUser = async (req, res, next) => {
  if (!req.params.userId) return next(new ApiError(400, "UserId is require"));
  try {
    const result = await UserRoleServices.getRolesByUser(req.params.userId);
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

// Xem user nào đang có role cụ thể
exports.getUsersByRole = async (req, res, next) => {
  if (!req.params.roleId) return next(new ApiError(400, "RoleId is require"));
  try {
    const result = await UserRoleServices.getUsersByRole(req.params.roleId);
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

// Gán role cho user
exports.assignRole = async (req, res, next) => {
  if (!req.body.userId || !req.body.roleId) {
    return next(new ApiError(400, "Not enough required fields"));
  }

  try {
    const exist = await UserRoleServices.checkExist(req.body.userId, req.body.roleId);
    if (exist.length > 0) {
      return res.status(400).json({ errcode: 1, message: "User already has this role" });
    }

    const result = await UserRoleServices.assignRole(req.body.userId, req.body.roleId);
    res.status(200).json({ errcode: 0, message: "Assign role success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Assign role fail", error });
  }
};

// Gỡ role khỏi user
exports.removeRole = async (req, res, next) => {
  if (!req.body.userId || !req.body.roleId) {
    return next(new ApiError(400, "Not enough required fields"));
  }

  try {
    const result = await UserRoleServices.removeRole(req.body.userId, req.body.roleId);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Assignment not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "Remove role success" });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Remove role fail", error });
  }
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await UserRoleServices.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Can not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "delete success" });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "delete fail", error });
  }
};

module.exports = exports;