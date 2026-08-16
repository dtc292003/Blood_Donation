import ApiError from "../../api-error";
import RecipientServices from "../services/recipient.service";

exports.getId = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await RecipientServices.getId(req.params.id);

    if (result.length > 0) {
      res.status(200).json({
        errcode: 0,
        message: "Get success",
        data: result,
      });
    } else {
      res.status(404).json({
        errcode: 1,
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "get fail",
      error: error,
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await RecipientServices.getAll();
    res.status(200).json({
      errcode: 0,
      message: "Get success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "get fail",
      error: error,
    });
  }
};

exports.add = async (req, res, next) => {
  if (!req.body.reason || !req.body.bloodTypeName) {
    return next(new ApiError(400, "Not enough required fields"));
  }

  const userId = req.session.userId;

  try {
    const result = await RecipientServices.add(userId, req.body);
    res.status(200).json({
      errcode: 0,
      message: "Add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Add fail",
      error: error,
    });
  }
};

exports.update = async (req, res, next) => {
  if (!req.body.reason || !req.body.bloodTypeName) {
    return next(new ApiError(400, "Not enough required fields"));
  }

  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await RecipientServices.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      res.status(404).json({
        errcode: 1,
        message: "Not found",
      });
    } else {
      res.status(200).json({
        errcode: 0,
        message: "update success",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "update fail",
      error: error,
    });
  }
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await RecipientServices.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({
        errcode: 1,
        message: "Can not found recipient",
      });
    } else {
      res.status(200).json({
        errcode: 0,
        message: "delete success",
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "delete fail",
      error: error,
    });
  }
};

module.exports = exports;