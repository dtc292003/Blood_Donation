import ApiError from "../../api-error";
import NotificationServices from "../services/notification.service";

exports.getId = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await NotificationServices.getId(req.params.id);
    if (result.length > 0) {
      res.status(200).json({ errcode: 0, message: "Get success", data: result });
    } else {
      res.status(404).json({ errcode: 1, message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await NotificationServices.getAll();
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.getByUser = async (req, res, next) => {
  if (!req.params.userId) return next(new ApiError(400, "UserId is require"));
  try {
    const result = await NotificationServices.getByUser(req.params.userId);
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.getUnreadByUser = async (req, res, next) => {
  if (!req.params.userId) return next(new ApiError(400, "UserId is require"));
  try {
    const result = await NotificationServices.getUnreadByUser(req.params.userId);
    res.status(200).json({ errcode: 0, message: "Get success", data: result, count: result.length });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.add = async (req, res, next) => {
  if (!req.body.userId || !req.body.title) {
    return next(new ApiError(400, "Not enough required fields"));
  }
  try {
    const result = await NotificationServices.add(req.body);
    res.status(200).json({ errcode: 0, message: "Add success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Add fail", error });
  }
};

exports.update = async (req, res, next) => {
  if (!req.body.title) return next(new ApiError(400, "Not enough required fields"));
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await NotificationServices.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "update success", data: result });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "update fail", error });
  }
};

exports.markAsRead = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await NotificationServices.markAsRead(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "Marked as read" });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "fail", error });
  }
};

exports.markAllAsRead = async (req, res, next) => {
  if (!req.params.userId) return next(new ApiError(400, "UserId is require"));
  try {
    const result = await NotificationServices.markAllAsRead(req.params.userId);
    res.status(200).json({ errcode: 0, message: `Marked ${result.affectedRows} notifications as read` });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "fail", error });
  }
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await NotificationServices.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Can not found notification" });
    } else {
      res.status(200).json({ errcode: 0, message: "delete success" });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "delete fail", error });
  }
};

module.exports = exports;