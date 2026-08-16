import ApiError from "../../api-error";
import DonorServices from "../services/donor.service";
import { isPositiveNumber, isValidBloodType } from "../utils/validators";

exports.getId = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await DonorServices.getId(req.params.id);

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
    const result = await DonorServices.getAll();
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

exports.getDonorSalient = async (req, res, next) => {
  try {
    const result = await DonorServices.getDonorSalient();
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
  const { weight, height, bloodTypeName } = req.body;

  if (!weight || !height || !bloodTypeName) {
    return next(new ApiError(400, "Not enough required fields"));
  }
  if (!isPositiveNumber(Number(weight)) || !isPositiveNumber(Number(height))) {
    return next(new ApiError(400, "Weight and height must be positive numbers"));
  }
  if (!isValidBloodType(bloodTypeName)) {
    return next(new ApiError(400, "Invalid blood type — must be one of A+, A-, B+, B-, AB+, AB-, O+, O-"));
  }

  const userId = req.session.userId;

  try {
    const result = await DonorServices.add(userId, req.body);
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
  const { weight, height, bloodTypeName } = req.body;

  if (!weight || !height || !bloodTypeName) {
    return next(new ApiError(400, "Not enough required fields"));
  }
  if (!isPositiveNumber(Number(weight)) || !isPositiveNumber(Number(height))) {
    return next(new ApiError(400, "Weight and height must be positive numbers"));
  }
  if (!isValidBloodType(bloodTypeName)) {
    return next(new ApiError(400, "Invalid blood type — must be one of A+, A-, B+, B-, AB+, AB-, O+, O-"));
  }

  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await DonorServices.update(req.params.id, req.body);
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
    const result = await DonorServices.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({
        errcode: 1,
        message: "Can not found donor",
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