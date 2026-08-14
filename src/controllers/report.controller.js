import ApiError from "../../api-error";
import ReportServices from "../services/report.serice";

exports.getId = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await ReportServices.getId(req.params.id);
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
    const result = await ReportServices.getAll();
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.getByUser = async (req, res, next) => {
  if (!req.params.userId) return next(new ApiError(400, "UserId is require"));
  try {
    const result = await ReportServices.getByUser(req.params.userId);
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.add = async (req, res, next) => {
  if (!req.body.userId || !req.body.reportType || !req.body.fromDate || !req.body.toDate) {
    return next(new ApiError(400, "Not enough required fields"));
  }
  try {
    const result = await ReportServices.add(req.body);
    res.status(200).json({ errcode: 0, message: "Add success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Add fail", error });
  }
};

exports.update = async (req, res, next) => {
  if (!req.body.reportType || !req.body.fromDate || !req.body.toDate) {
    return next(new ApiError(400, "Not enough required fields"));
  }
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await ReportServices.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Not found" });
    } else {
      res.status(200).json({ errcode: 0, message: "update success", data: result });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "update fail", error });
  }
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) return next(new ApiError(400, "Id is require"));
  try {
    const result = await ReportServices.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ errcode: 1, message: "Can not found report" });
    } else {
      res.status(200).json({ errcode: 0, message: "delete success" });
    }
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "delete fail", error });
  }
};

// ===== NÂNG CAO =====

exports.getDonationStats = async (req, res, next) => {
  const { fromDate, toDate } = req.query;
  if (!fromDate || !toDate) {
    return next(new ApiError(400, "fromDate and toDate are require (query params)"));
  }
  try {
    const result = await ReportServices.getDonationStats(fromDate, toDate);
    res.status(200).json({ errcode: 0, message: "Get success", data: result[0] });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.getBloodTypeDistribution = async (req, res, next) => {
  try {
    const result = await ReportServices.getBloodTypeDistribution();
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.getRequestStatusStats = async (req, res, next) => {
  try {
    const result = await ReportServices.getRequestStatusStats();
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.getTopDonors = async (req, res, next) => {
  const limit = req.query.limit || 5;
  try {
    const result = await ReportServices.getTopDonors(limit);
    res.status(200).json({ errcode: 0, message: "Get success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "get fail", error });
  }
};

exports.generateReport = async (req, res, next) => {
  if (!req.body.userId || !req.body.reportType || !req.body.fromDate || !req.body.toDate) {
    return next(new ApiError(400, "Not enough required fields"));
  }
  try {
    const result = await ReportServices.generateReport(
      req.body.userId, req.body.reportType, req.body.fromDate, req.body.toDate
    );
    res.status(200).json({ errcode: 0, message: "Generate report success", data: result });
  } catch (error) {
    res.status(500).json({ errcode: 1, message: "Generate report fail", error });
  }
};

module.exports = exports;