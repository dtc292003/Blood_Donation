import ApiError from "../../api-error";
import MatchServices from "../services/match.service";

exports.getId = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await MatchServices.getId(req.params.id);
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
    const result = await MatchServices.getAll();
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

// Recipient xem danh sách donor muốn hiến cho request của mình
exports.getByRequest = async (req, res, next) => {
  if (!req.params.requestId) return next(new ApiError(400, "RequestId is require"));
  try {
    const result = await MatchServices.getByRequest(req.params.requestId);
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

// Donor xem các request mình đã apply
exports.getByDonor = async (req, res, next) => {
  if (!req.params.donorId) return next(new ApiError(400, "DonorId is require"));
  try {
    const result = await MatchServices.getByDonor(req.params.donorId);
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

// Donor bấm "Tôi muốn hiến"
exports.apply = async (req, res, next) => {
  if (!req.body.userId || !req.body.requestId || !req.body.donorId) {
    return next(new ApiError(400, "Not enough required fields"));
  }
  try {
    const result = await MatchServices.apply(req.body.userId, req.body);
    res.status(200).json({ errcode: 0, message: "Apply success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Apply fail", error });
  }
};

exports.accept = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await MatchServices.accept(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "Accepted", data: result });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "accept fail", error });
  }
};

exports.reject = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await MatchServices.reject(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "Rejected", data: result });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "reject fail", error });
  }
};

exports.cancel = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await MatchServices.cancel(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Not found or already processed" });
    } else {
      res.status(200).json({ errcode: 0, message: "Cancelled", data: result });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "cancel fail", error });
  }
};

exports.complete = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await MatchServices.complete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "Completed", data: result });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "complete fail", error });
  }
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await MatchServices.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Can not found match" });
    } else {
      res.status(200).json({ errcode: 0, message: "delete success" });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "delete fail", error });
  }
};

module.exports = exports;